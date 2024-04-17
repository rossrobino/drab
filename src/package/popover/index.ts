import { Animate, type AnimateAttributes } from "../animate/index.js";
import type { Attributes } from "../types/index.js";

export type PopoverAttributes = Attributes<Popover> & AnimateAttributes;

/**
 * Provides animations for the Popover API.
 *
 * This component can be deprecated once it can be animated with CSS only,
 * currently [only available in Chrome](https://developer.chrome.com/blog/introducing-popover-api#interactive_entry_and_exit).
 */
export class Popover extends Animate {
	constructor() {
		super();
	}

	/**
	 * Whether the popover is open or closed. This doesn't get set
	 * automatically on the element like with the `HTMLDialogElement`.
	 */
	get open() {
		return this.hasAttribute("open");
	}

	set open(value) {
		if (value) {
			this.setAttribute("open", "");
		} else {
			this.removeAttribute("open");
		}
	}

	/** `HTMLElement.showPopover()` with animation. */
	async show() {
		// @ts-ignore - not supported in FF
		this.getContent().showPopover();
		await this.animateElement();
	}

	/** `HTMLElement.hidePopover()` with animation. */
	async hide() {
		await this.animateElement({
			options: {
				direction: "reverse",
			},
		});
		// @ts-ignore - not supported in FF
		this.getContent().hidePopover();
	}

	/** `show` or `hide` depending on the current state. */
	async toggle() {
		if (this.open) this.hide();
		else this.show();
	}

	mount() {
		this.triggerListener((e) => {
			e.preventDefault();
			this.toggle();
		});

		this.getContent().addEventListener("toggle", (e) => {
			//@ts-expect-error - not supported in FF as of 1/23/24
			if (e.newState === "open") {
				this.open = true;
			} else {
				this.open = false;
			}
		});

		this.safeListener("keydown", (e) => {
			if (e.key === "Escape" && this.open) {
				// to execute animation
				e.preventDefault();
				this.hide();
			}
		});
	}
}
