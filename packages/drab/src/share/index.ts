import {
	Announce,
	Content,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
	type ContentAttributes,
} from "../base/index.js";

export interface ShareAttributes extends TriggerAttributes, ContentAttributes {
	value: string;
}

/**
 * Uses the
 * [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
 * to share a the value if it starts with `"http"` and `navigator.share` is supported.
 * Otherwise uses the
 * [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * to copy the value.
 *
 * ### Attributes
 *
 * `value`
 *
 * Text to share.
 */
export class Share extends Lifecycle(Trigger(Content(Announce()))) {
	constructor() {
		super();
	}
	/**
	 * The value to copy.
	 *
	 * @default ""
	 */
	get #value() {
		return this.getAttribute("value") ?? "";
	}

	/**
	 * Shares or copies the `value`.
	 */
	#share(value = this.#value) {
		if (
			value.startsWith("http") &&
			navigator.canShare &&
			navigator.canShare({ url: value })
		) {
			return navigator.share({ url: value });
		}

		// fallback to copy
		this.announce("copied text to clipboard");
		this.swap();
		return navigator.clipboard.writeText(value);
	}

	override mount() {
		this.listener(() => this.#share());
	}
}
