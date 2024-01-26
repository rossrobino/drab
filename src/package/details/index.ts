import { Animate } from "../animate/index.ts";

/**
 * This element provides a progressive enhancement on top of the `HTMLDetailsElement` to
 * animate it with the Web Animations API.
 *
 * The best way I've found to animate the details element is using CSS grid from this
 * [Kevin Powell video](https://youtu.be/B_n4YONte5A?t=116). The example demonstrates
 * this animation. If you know the exact height of the content, you could animate `height`
 * instead.
 */
export class Details extends Animate {
	constructor() {
		super();
	}

	get details() {
		const details = this.getContent(HTMLElement).parentElement;
		if (!(details instanceof HTMLDetailsElement))
			throw new Error("Details: HTMLDetailsElement not found.");
		return details;
	}

	async open() {
		this.details.open = true;
		await this.animateElement();
	}

	/** Closes details with animation. */
	async close() {
		await this.animateElement({
			options: { direction: "reverse" },
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

	mount() {
		this.triggerListener((e) => {
			e.preventDefault();
			this.toggle();
		});
	}
}
