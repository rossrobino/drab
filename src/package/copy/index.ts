import { Base } from "../base/index.ts";

/**
 * Uses the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * to copy text.
 */
export class Copy extends Base {
	constructor() {
		super();
	}

	/**
	 * The `text` to copy.
	 *
	 * @default "" the empty string
	 */
	get text() {
		return this.getAttribute("text") ?? "";
	}

	set text(value) {
		this.setAttribute("text", value);
	}

	/**
	 * Optional text to display when copy is complete.
	 */
	get complete() {
		return this.getAttribute("complete") ?? "";
	}

	set complete(value) {
		this.setAttribute("complete", value);
	}

	/**
	 * Copies the `text`.
	 * @param text The `text` to share
	 */
	async copy(text: string = this.text) {
		await navigator.clipboard.writeText(text);
	}

	connectedCallback() {
		for (const trigger of this.trigger()) {
			trigger.addEventListener(this.triggerEvent, async () => {
				await this.copy();
				if (this.complete) {
					const originalText = this.content().textContent;
					this.content().textContent = this.complete;
					setTimeout(() => (this.content().textContent = originalText), 800);
				}
			});
		}
	}
}
