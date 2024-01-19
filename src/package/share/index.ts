import { BaseCopy } from "../base/copy/index.ts";

/**
 * Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
 * to share a `url`.
 */
export class Share extends BaseCopy {
	constructor() {
		super();
	}

	/**
	 * Shares or copies the `value`.
	 * @param url The `url` to share, defaults to `this.value`
	 * @returns An object containing a `result` - whether the `url` was copied or shared
	 * depending on browser support.
	 */
	async share(url: string = this.value) {
		if (navigator.canShare && navigator.canShare({ url })) {
			try {
				await navigator.share({ url });
			} catch (error: any) {
				if (error?.name !== "AbortError") {
					console.error(error);
				}
			}
		} else {
			// progressively enhance, copy the link
			this.copy();
		}
	}

	connectedCallback() {
		for (const trigger of this.trigger()) {
			trigger.addEventListener(
				this.triggerEvent,
				async () => await this.share(),
			);
		}
	}
}
