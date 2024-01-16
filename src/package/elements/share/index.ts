import { Base } from "../base/index.ts";

/**
 * # Share
 *
 * Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) to share a link.
 *
 * ## Attributes
 *
 * - `url` - url to share
 */
export class Share extends Base {
	constructor() {
		super();
	}

	connectedCallback() {
		const event = this.getAttribute("event") || "click";

		const url = this.getAttribute("url") || window.location.href;
		console.log(url);
		const shareData: ShareData = { url };

		console.log(shareData);

		for (const trigger of this.trigger) {
			trigger.addEventListener(event, async () => {
				const originalText = trigger.textContent;
				if (navigator.canShare && navigator.canShare(shareData)) {
					try {
						await navigator.share(shareData);
					} catch (error: any) {
						if (error?.name !== "AbortError") {
							console.error(error);
						}
					}
				} else {
					// progressively enhance, copy the link
					try {
						await navigator.clipboard.writeText(url);
						trigger.textContent = "Copied";
						setTimeout(() => (trigger.textContent = originalText), 800);
					} catch (error) {
						console.error(error);
					}
				}
			});
		}
	}
}
