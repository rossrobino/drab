import { BaseCopy, type BaseCopyAttributes } from "../base/copy/index.js";

export type CopyAttributes = BaseCopyAttributes;

/**
 * Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * to copy text.
 */
export class Copy extends BaseCopy {
	constructor() {
		super();
	}

	override mount() {
		this.triggerListener(async () => await this.copy());
	}
}
