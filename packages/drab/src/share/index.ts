import { Copy, type CopyAttributes } from "../copy/index.js";

export type ShareAttributes = CopyAttributes;

/**
 * Uses the
 * [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
 * to share a url. If `share` is not supported, falls back to copy the text instead.
 *
 * ### Attributes
 *
 * `value`
 *
 * Text to share.
 */
export class Share extends Copy {
	constructor() {
		super();
	}

	/**
	 * Shares or copies the `value`.
	 * @param url The `url` to share, defaults to `this.value`
	 */
	share(url = this.value) {
		if (navigator.canShare && navigator.canShare({ url })) {
			return navigator.share({ url });
		} else {
			// progressively enhance, copy the link
			return this.copy();
		}
	}

	override mount() {
		this.triggerListener(() => this.share());
	}
}
