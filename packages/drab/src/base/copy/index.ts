import { Base, type BaseAttributes } from "../index.js";

export type BaseCopyAttributes = BaseAttributes & { value: string };

export class BaseCopy extends Base {
	constructor() {
		super();
	}

	/**
	 * The value to copy or share.
	 *
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
		this.announce(`copied ${text} to clipboard`);

		await navigator.clipboard.writeText(text);

		this.swapContent();
	}
}
