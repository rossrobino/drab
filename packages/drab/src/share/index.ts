import {
	Announce,
	Content,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
	type ContentAttributes,
} from "../base/index.js";

export type ShareAttributes = TriggerAttributes &
	ContentAttributes &
	(
		| {
				/** Share URL */
				url: string;

				/** `ShareData` text (only supported on some targets) */
				text?: string;

				/** Share title */
				"share-title"?: string;
		  }
		| {
				/** Text to copy */
				text: string;
		  }
	);

/**
 * Uses the
 * [Navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
 * to share the `url` if `navigator.share` is supported.
 *
 * Otherwise uses the
 * [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)
 * to copy the `url` or `text` provided.
 *
 * ### Attributes
 *
 * `url`
 *
 * URL to share.
 *
 * `text`
 *
 * Text to copy, or the `ShareData` text if `url` is set (only supported on some targets).
 *
 * `share-title`
 *
 * `ShareData` title (only supported on some targets).
 */
export class Share extends Lifecycle(Trigger(Content(Announce()))) {
	constructor() {
		super();
	}

	// helper since ShareData expects undefined instead of null
	#attrOrUndefined(name: string) {
		return this.getAttribute(name) ?? undefined;
	}

	get #title() {
		return this.#attrOrUndefined("share-title");
	}

	get #text() {
		return this.#attrOrUndefined("text");
	}

	get #url() {
		return this.#attrOrUndefined("url");
	}

	override mount() {
		this.listener(() => {
			const data: ShareData = {
				title: this.#title,
				text: this.#text,
				url: this.#url,
			};

			if (data.url && navigator.canShare && navigator.canShare(data)) {
				return navigator.share(data).catch((e) => {
					// catch abort errors when user cancels the share
					if (!(e instanceof Error) || e.name !== "AbortError") throw e;
				});
			}

			const copy = data.url || data.text;

			if (copy) {
				return navigator.clipboard.writeText(copy).then(() => {
					this.announce("copied to clipboard");
					this.swap();
				});
			}
		});
	}
}
