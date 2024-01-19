import { BaseCopy } from "../base/copy/index.ts";

/**
 * Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * to copy text.
 */
export class Copy extends BaseCopy {
	constructor() {
		super();
	}

	connectedCallback() {
		for (const trigger of this.trigger()) {
			trigger.addEventListener(
				this.triggerEvent,
				async () => await this.copy(),
			);
		}
	}
}
