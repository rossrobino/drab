import { BaseCopy } from "../base/copy/index.ts";
import type { Attributes } from "../types/index.ts";

export type CopyAttributes = Attributes<Copy, "value">;

/**
 * Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * to copy text.
 */
export class Copy extends BaseCopy {
	constructor() {
		super();
	}

	mount() {
		this.triggerListener(async () => await this.copy());
	}
}
