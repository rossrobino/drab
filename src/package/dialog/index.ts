import { Animate } from "../animate/index.ts";

/**
 * Provides triggers and animations for the `HTMLDialogElement`.
 */
export class Dialog extends Animate {
	constructor() {
		super();
	}

	get dialog() {
		return this.content(HTMLDialogElement);
	}

	async showModal() {
		this.dialog.showModal();
		await this.animateElement(this.dialog);
	}

	async close() {
		await this.animateElement(this.dialog, {
			direction: "reverse",
		});
		this.dialog.close();
	}

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
