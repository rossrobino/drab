import { Base } from "../index.ts";

export class BaseCopy extends Base {
	constructor() {
		super();
	}

	/**
	 * @default "" the empty string
	 */
	get value() {
		return this.getAttribute("value") ?? "";
	}

	set value(value) {
		this.setAttribute("value", value);
	}

	/**
	 * Optional text to display when copy is complete.
	 */
	get complete() {
		return this.getAttribute("complete") ?? "";
	}

	set complete(value) {
		this.setAttribute("complete", value);
	}

	/**
	 * Copies the `text`.
	 * @param text The `text` to share
	 */
	async copy(text: string = this.value) {
		await navigator.clipboard.writeText(text);
		if (this.complete) {
			const originalText = this.content().textContent;
			this.content().textContent = this.complete;
			setTimeout(() => (this.content().textContent = originalText), 800);
		}
	}
}
