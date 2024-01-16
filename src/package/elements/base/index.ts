export class Base extends HTMLElement {
	constructor() {
		super();
	}

	/**
	 * @returns All of the elements that match the `trigger` selector.
	 * @default `this.querySelectorAll("[data-trigger]")`
	 */
	get trigger() {
		const trigger = this.getAttribute("trigger");
		let el: NodeListOf<HTMLElement>;
		if (trigger) el = this.querySelectorAll(trigger);
		else el = this.querySelectorAll("[data-trigger]");
		if (!el.length) throw new Error("Trigger not found");
		return el;
	}

	/**
	 * @returns The element that matches the `content` selector.
	 * @default `this.querySelector("[data-content]")`
	 */
	get content() {
		const content = this.getAttribute("content");
		let element: HTMLElement | null;
		if (content) element = this.querySelector(content);
		else element = this.querySelector("[data-content]");
		if (element instanceof HTMLElement) return element;
		throw new Error("Content not found");
	}
}
