import { Base, type BaseAttributes } from "../base/index.js";

export type CopyAttributes = BaseAttributes & { value: string };

/**
 * Uses the
 * [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * to copy text.
 *
 * ### Attributes
 *
 * `value`
 *
 * Text to copy.
 */
export class Copy extends Base {
	constructor() {
		super();
	}

	/**
	 * The value to copy.
	 *
	 * @default ""
	 */
	get value() {
		return this.getAttribute("value") ?? "";
	}

	set value(value) {
		this.setAttribute("value", value);
	}

	/**
	 * @param value The `value` to copy
	 */
	copy(value = this.value) {
		this.announce("copied text to clipboard");
		this.swapContent();

		return navigator.clipboard.writeText(value);
	}

	override mount() {
		this.triggerListener(() => this.copy());
	}
}
