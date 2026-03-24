import {
	Content,
	type ContentAttributes,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
} from "../base/index.js";

export interface FullscreenAttributes
	extends TriggerAttributes, ContentAttributes {}

/**
 * Toggles the `documentElement` or `content` element to fullscreen mode.
 *
 * Disables the `trigger` if fullscreen is not supported.
 */
export class Fullscreen extends Lifecycle(Trigger(Content())) {
	constructor() {
		super();
	}

	/** Enables or disables fullscreen mode based on the current state. */
	toggle() {
		if (document.fullscreenElement !== null) {
			document.exitFullscreen();
		} else {
			try {
				this.content(HTMLElement).requestFullscreen();
			} catch {
				document.documentElement.requestFullscreen();
			}
		}
	}

	override mount() {
		this.listener(() => this.toggle());

		for (const trigger of this.triggers()) {
			if (
				!("requestFullscreen" in document.documentElement) &&
				"disabled" in trigger
			) {
				trigger.disabled = true;
			}
		}
	}
}
