import {
	Announce,
	Content,
	type ContentAttributes,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
} from "../base/index.js";

export interface WakeLockAttributes
	extends TriggerAttributes,
		ContentAttributes {
	/** Auto request wakelock when user returns to inactive tab. */
	"auto-lock"?: boolean;

	/** Set to request wakelock immediately when the element has connected. */
	locked?: boolean;
}

/**
 * `WakeLock` uses the
 * [WakeLock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
 * to ensure the screen does not turn off when viewing the page on supported devices.
 * Use your best judgement for when this is necessary, for example, if you have a timer
 * that needs to stay on, or you are displaying a QR code.
 *
 * - Use `content` and `swap` elements to adjust the UI based on the current state.
 * - `trigger` is disabled if not supported.
 * - WakeLock is released when the element is removed from the DOM.
 *
 * ### Attributes
 *
 * `auto-lock`
 *
 * By default, the WakeLock will be released when the tab is not active. Use the
 * `auto-lock` attribute to automatically request the WakeLock when the user views
 * the tab again.
 *
 * `locked`
 *
 * WakeLock can be toggled with a `trigger`, or will be requested if the element has
 * a `locked` attribute when connected.
 */
export class WakeLock extends Lifecycle(Trigger(Content(Announce()))) {
	#wakeLock: WakeLockSentinel | null = null;

	constructor() {
		super();
	}

	/** If the WakeLock API is supported on the user's device. */
	#wakeLockSupported() {
		return "wakeLock" in navigator;
	}

	/**
	 * the `auto-lock` attribute controls whether an active WakeLock should be restored when navigating back to
	 *  the page.
	 */
	get #autoLock() {
		return this.hasAttribute("auto-lock");
	}

	/** Requests WakeLock on the current page. */
	async request() {
		if (this.#wakeLockSupported() && document.visibilityState === "visible") {
			this.#wakeLock = await navigator.wakeLock.request("screen");
			this.setAttribute("locked", "");
			this.announce("screen wake lock activated");
			this.swap(false);

			this.#wakeLock.addEventListener("release", () => {
				this.removeAttribute("locked");
				this.announce("screen wake lock deactivated");
				this.swap(false);

				if (!this.#autoLock) {
					// set to null is required, used to determine if screen should be
					// locked again, see visibilitychange listener
					this.#wakeLock = null;
				}
			});
		}
	}

	/** Releases the WakeLock, sets `this.wakeLock` to null. */
	async release() {
		await this.#wakeLock?.release();
		this.#wakeLock = null;
	}

	override mount() {
		// lock on mount if the `locked` attribute is present
		if (this.hasAttribute("locked")) {
			this.request();
		}

		this.listener(() => {
			// toggle
			if (this.#wakeLock) {
				this.release();
			} else {
				this.request();
			}
		});

		for (const trigger of this.triggers()) {
			if (!this.#wakeLockSupported() && "disabled" in trigger) {
				// disable `trigger` if not supported
				trigger.disabled = true;
			}
		}

		if (this.#autoLock) {
			this.safeListener(
				"visibilitychange",
				() => {
					// When the tab is not visible, the wakeLock is automatically released.
					// This requests it back if it exists, if it is `null`, that
					// means it was removed. In which case, it shouldn't be requested again.
					if (this.#wakeLock) {
						this.request();
					}
				},
				document,
			);
		}
	}

	override destroy() {
		this.release();
	}
}
