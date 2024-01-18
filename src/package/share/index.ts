import { Base } from "../base/index.ts";

/**
 * Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
 * to share a `url`.
 */
export class Share extends Base {
	constructor() {
		super();
	}

	/**
	 * The `url` to share.
	 *
	 * @default window.location.href
	 */
	get url() {
		return this.getAttribute("url") ?? window.location.href;
	}

	set url(value) {
		this.setAttribute("url", value);
	}

	/**
	 * Shares or copies the `url`.
	 * @param url The `url` to share
	 * @returns An object containing a `result` - whether the `url` was copied or shared
	 * depending on browser support.
	 */
	async share(url: string = this.url): Promise<{ result: "share" | "copy" }> {
		if (navigator.canShare && navigator.canShare({ url })) {
			await navigator.share({ url });
			return { result: "share" };
		} else {
			// progressively enhance, copy the link
			await navigator.clipboard.writeText(url);
			return { result: "copy" };
		}
	}

	connectedCallback() {
		for (const trigger of this.trigger()) {
			trigger.addEventListener(this.triggerEvent, async () => {
				try {
					const { result } = await this.share();
					if (result === "copy") {
						const originalText = trigger.textContent;
						trigger.textContent = "Copied";
						setTimeout(() => (trigger.textContent = originalText), 800);
					}
				} catch (error: any) {
					if (error?.name !== "AbortError") {
						console.error(error);
					}
				}
			});
		}
	}
}
