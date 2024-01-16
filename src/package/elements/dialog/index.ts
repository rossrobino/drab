import { Animate } from "../base/animate/index.ts";

/**
 * Test
 */
export class Dialog extends Animate {
	constructor() {
		super();
	}

	get dialog() {
		if (this.content instanceof HTMLDialogElement) return this.content;
		throw new Error("dialog not found.");
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
		for (const trigger of this.trigger) {
			trigger.addEventListener("click", () => this.toggle());

			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape" && this.dialog.open) {
					// to execute animation
					e.preventDefault();
					this.close();
				}
			});
		}
	}
}
