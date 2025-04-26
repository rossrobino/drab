import {
	Content,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
	type ContentAttributes,
} from "../base/index.js";

export interface FullscreenAttributes
	extends TriggerAttributes,
		ContentAttributes {}

/**
 * Toggles the `documentElement` or `content` element to fullscreen mode.
 *
 * Disables the `trigger` if fullscreen is not supported.
 */
export class Fullscreen extends Lifecycle(Trigger(Content())) {
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
	#fullscreenSupported() {
		return Boolean(document.documentElement.requestFullscreen);
	}

	/** Enables or disables fullscreen mode based on the current state. */
	toggle() {
		if (this.isFullscreen()) {
			document.exitFullscreen();
		} else {
			try {
				this.getContent(HTMLElement).requestFullscreen();
			} catch {
				document.documentElement.requestFullscreen();
			}
		}
	}

	override mount() {
		this.triggerListener(() => this.toggle());

		for (const trigger of this.getTrigger()) {
			if (!this.#fullscreenSupported() && "disabled" in trigger) {
				trigger.disabled = true;
			}
		}
	}
}
