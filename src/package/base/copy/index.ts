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
	 * Copies the `text`.
	 * @param text The `text` to share
	 */
	async copy(text: string = this.value) {
		await navigator.clipboard.writeText(text);
		this.swap();
	}
}
