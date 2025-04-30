import {
	Announce,
	Content,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
	type ContentAttributes,
} from "../base/index.js";

export interface CopyAttributes extends TriggerAttributes, ContentAttributes {
	value: string;
}

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
export class Copy extends Lifecycle(Trigger(Content(Announce()))) {
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
		this.swap();

		return navigator.clipboard.writeText(value);
	}

	override mount() {
		this.listener(() => this.copy());
	}
}
