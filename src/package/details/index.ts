import { Animate } from "../animate/index.ts";

export class Details extends Animate {
	constructor() {
		super();
	}

	get details() {
		const details = this.content(HTMLElement).parentElement;
		if (!(details instanceof HTMLDetailsElement))
			throw new Error("Details: HTMLDetailsElement not found.");
		return details;
	}

	async open() {
		this.details.open = true;
		await this.animateElement(this.content(HTMLElement));
	}

	/** Closes details with animation. */
	async close() {
		await this.animateElement(this.content(HTMLElement), {
			direction: "reverse",
		});
		this.details.open = false;
	}

	toggle() {
		if (this.details.open) {
			this.close();
		} else {
			this.open();
		}
	}

	connectedCallback() {
		for (const trigger of this.trigger()) {
			trigger.addEventListener("click", (e) => {
				e.preventDefault();
				this.toggle();
			});
		}
	}
}
