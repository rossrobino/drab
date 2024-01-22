import { Base } from "../base/index.ts";

/**
 * Toggles the `documentElement` or `content` element to fullscreen mode.
 *
 * Disables the `trigger` if fullscreen is not supported.
 */
export class Fullscreen extends Base {
	constructor() {
		super();
	}

	/**
	 * @returns `true` if fullscreen is currently enabled.
	 */
	isFullscreen() {
		return document.fullscreenElement !== null;
	}

	/**
	 * @returns `true` if fullscreen is supported.
	 */
	fullscreenSupported() {
		return Boolean(document.documentElement.requestFullscreen);
	}

	/** Enables or disables fullscreen mode based on the current state. */
	toggle() {
		if (this.isFullscreen()) {
			document.exitFullscreen();
		} else {
			try {
				this.content(HTMLElement).requestFullscreen();
			} catch {
				document.documentElement.requestFullscreen();
			}
		}
	}

	connectedCallback() {
		this.triggerListener(() => this.toggle());

		for (const trigger of this.trigger()) {
			if (!this.fullscreenSupported() && "disabled" in trigger) {
				trigger.disabled = true;
			}
		}
	}
}
