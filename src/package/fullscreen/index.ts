import { Base } from "../base/index.js";
import type { Attributes } from "../types/index.js";

export type FullscreenAttributes = Attributes<Fullscreen>;

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
		// BREAKING TODO: make private like in WakeLock
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

	mount() {
		this.triggerListener(() => this.toggle());

		for (const trigger of this.getTrigger()) {
			if (!this.fullscreenSupported() && "disabled" in trigger) {
				trigger.disabled = true;
			}
		}
	}
}
