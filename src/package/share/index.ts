import { Base } from "../base/index.ts";

/**
 * Uses the [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
 * to share a url.
 */
export class Share extends Base {
	constructor() {
		super();
	}

	get url() {
		return this.getAttribute("url") ?? window.location.href;
	}

	set url(value) {
		this.setAttribute("url", value);
	}

	async share(url: string): Promise<{ result: "share" | "copy" }> {
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
					const { result } = await this.share(this.url);
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
