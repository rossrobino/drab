import { Animate } from "../animate/index.ts";

/**
 * Provides triggers and animations for the `HTMLDialogElement`.
 */
export class Dialog extends Animate {
	constructor() {
		super();
	}

	/** The `HTMLDialogElement` within the element. */
	get dialog() {
		return this.content(HTMLDialogElement);
	}

	/** `HTMLDialogElement.showModal()` with animation. */
	async showModal() {
		this.dialog.showModal();
		await this.animateElement(this.dialog);
	}

	/** `HTMLDialogElement.close()` with animation. */
	async close() {
		await this.animateElement(this.dialog, {
			direction: "reverse",
		});
		this.dialog.close();
	}

	/** `showModal` or `close` depending on the dialog's `open` attribute. */
	async toggle() {
		if (this.dialog.open) this.close();
		else this.showModal();
	}

	connectedCallback() {
		for (const trigger of this.trigger()) {
			trigger.addEventListener(this.triggerEvent, () => this.toggle());
		}

		this.safeAddEventListener("keydown", (e) => {
			if (e.key === "Escape" && this.dialog.open) {
				// to execute animation
				e.preventDefault();
				this.close();
			}
		});
	}
}
