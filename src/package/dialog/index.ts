import { Animate, type AnimateAttributes } from "../animate/index.js";
import type { Attributes } from "../types/index.js";

export type DialogAttributes = Attributes<Dialog> & AnimateAttributes;

/**
 * Provides triggers and animations for the `HTMLDialogElement`.
 *
 * `click-outside-close`
 *
 * By default, the `HTMLDialogElement` doesn't close if the user clicks outside of it.
 * Add a `click-outside-close` attribute to close when the user clicks outside.
 */
export class Dialog extends Animate {
	constructor() {
		super();
	}

	/** The `HTMLDialogElement` within the element. */
	get dialog() {
		return this.getContent(HTMLDialogElement);
	}

	/** `HTMLDialogElement.showModal()` with animation. */
	async show() {
		this.dialog.showModal();
		await this.animateElement();
	}

	/** `HTMLDialogElement.close()` with animation. */
	async close() {
		await this.animateElement({
			options: {
				direction: "reverse",
			},
		});
		this.dialog.close();
	}

	/** `show` or `close` depending on the dialog's `open` attribute. */
	async toggle() {
		if (this.dialog.open) this.close();
		else this.show();
	}

	mount() {
		this.triggerListener(() => this.toggle());

		this.safeListener("keydown", (e) => {
			if (e.key === "Escape" && this.dialog.open) {
				// to execute animation
				e.preventDefault();
				this.close();
			}
		});

		if (this.hasAttribute("click-outside-close")) {
			// https://blog.webdevsimplified.com/2023-04/html-dialog/#close-on-outside-click
			this.dialog.addEventListener("click", (e) => {
				const rect = this.dialog.getBoundingClientRect();

				if (
					e.clientX < rect.left ||
					e.clientX > rect.right ||
					e.clientY < rect.top ||
					e.clientY > rect.bottom
				) {
					this.close();
				}
			});
		}
	}
}
