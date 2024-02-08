import { Base } from "../base/index.js";
import type { Attributes } from "../types/index.js";

type Strategy = "hover" | "load" | "visible";

export type PrefetchAttributes = Attributes<Prefetch> &
	Partial<{ strategy: Strategy; prerender: boolean }>;

type SpeculationRules = {
	prerender?: {
		source?: string;
		urls?: string[];
	}[];
};

/**
 * The `Prefetch` element can prefetch a url, or enhance the `HTMLAnchorElement` by loading
 * the HTML for a page before it is navigated to. This element speeds up the navigation for
 * multi-page applications (MPAs).
 *
 * If you are using a framework that already has a prefetch feature or uses a client side router,
 * it is best to use the framework's feature instead of this element to prefetching is working in
 * accordance with the router.
 *
 * `strategy`
 *
 * Set the `strategy` attribute to specify the when the prefetch will take place.
 *
 * - `"hover"` - (default) After `mouseover`, `focus`, or `touchstart` for > 200ms
 * - `"visible"` - Uses an intersection observer to prefetch when the anchor is within the viewport.
 * - `"load"` - Immediately prefetches when the element is loaded, use carefully.
 *
 * `prerender`
 *
 * Use the `prerender` attribute to use the experimental Speculation Rules API when supported to
 * prerender on the client. This allows you to run client side JavaScript in advance instead of
 * only fetching the HTML.
 *
 * Browsers that do not support will still use `<link rel="prefetch">` instead.
 *
 * [Speculation Rules Reference](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)
 *
 * `url`
 *
 * Add a `url` attribute to immediately prefetch a url without having to provide
 * (or in addition to) `trigger` anchor elements.
 */
export class Prefetch extends Base {
	constructor() {
		super();
	}

	/** When to prefetch the url. */
	get #strategy() {
		return (this.getAttribute("strategy") ?? "hover") as Strategy;
	}

	/** Use the speculation rules API. */
	get #prerender() {
		return this.hasAttribute("prerender");
	}

	/** `url` to append to the head on `mount`.  */
	get #url() {
		return this.getAttribute("url");
	}

	/**
	 * Adds a `<link rel="prefetch">` or a `<script type="speculationrules">` to the
	 * head of the document.
	 *
	 * @param options Configuration options.
	 */
	appendTag(options: {
		/** `url` to prefetch. */
		url: string;

		/**
		 * Uses the experimental Speculation Rules API when supported
		 * to prerender on the client, defaults to `false`.
		 */
		prerender?: boolean;
	}) {
		const { url, prerender } = options;

		// if not the current page
		if (!(url === window.location.href)) {
			// minifies
			const speculationrules = "speculationrules";

			/** If the tag for this `url` already been added to the head. */
			const alreadyAdded = (url: string) => {
				// is there a link?
				if (document.querySelector(`link[href='${url}']`)) {
					return true;
				}

				// is there a speculationrules script?
				const existing = document.querySelectorAll<HTMLScriptElement>(
					`script[type='${speculationrules}']`,
				);
				for (const s of existing) {
					const rules = JSON.parse(s.textContent ?? "{}") as SpeculationRules;
					if (rules.prerender?.at(0)?.urls?.includes(url)) {
						return true;
					}
				}

				return false;
			};

			if (!alreadyAdded(url)) {
				if (
					prerender &&
					HTMLScriptElement.supports &&
					HTMLScriptElement.supports(speculationrules)
				) {
					const script = document.createElement("script");
					script.type = speculationrules;
					script.textContent = JSON.stringify({
						prerender: [
							{
								source: "list",
								urls: [url],
							},
						],
					} as SpeculationRules);
					document.head.append(script);
				} else {
					// prerender off/not supported, and it isn't already there
					const link = document.createElement("link");
					link.rel = "prefetch";
					link.as = "document";
					link.href = url;
					document.head.append(link);
				}
			}
		}
	}

	/**
	 * Use to prefetch/prerender HTML.
	 *
	 * Can be used more than once with different options for different selectors.
	 *
	 * @param options Prefetch options.
	 */
	prefetch(
		options: {
			/** The anchors to prefetch. Defaults to `trigger` elements. */
			anchors?: NodeListOf<HTMLAnchorElement>;

			/**
			 * Uses the experimental Speculation Rules API when supported
			 * to prerender on the client, defaults to `false`.
			 */
			prerender?: boolean;

			/**
			 * Determines when the prefetch takes place, defaults to `"hover"`.
			 */
			strategy?: "hover" | "load" | "visible";
		} = {
			anchors: this.getTrigger<HTMLAnchorElement>(),
			prerender: this.#prerender,
			strategy: this.#strategy,
		},
		// above is the default if options is undefined
	) {
		// defaults if partially defined
		const {
			anchors = this.getTrigger<HTMLAnchorElement>(),
			prerender = this.#prerender,
			strategy = this.#strategy,
		} = options;

		let prefetchTimer: NodeJS.Timeout;

		/**
		 * @param delay ms delay - for `hover`
		 * @returns the event listener with delay
		 */
		const listener =
			(delay = 200) =>
			(e: Event) => {
				const { href } = e.currentTarget as HTMLAnchorElement;
				prefetchTimer = setTimeout(
					() => this.appendTag({ url: href, prerender }),
					delay,
				);
			};

		const reset = () => clearTimeout(prefetchTimer);

		const observer = new IntersectionObserver((entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					this.appendTag({
						url: (e.target as HTMLAnchorElement).href,
						prerender,
					});
				}
			}
		});

		for (const anchor of anchors) {
			if (strategy === "load") {
				this.appendTag({ url: anchor.href, prerender });
			} else if (strategy === "visible") {
				observer.observe(anchor);
			} else {
				// "hover" - default
				anchor.addEventListener("mouseover", listener());
				anchor.addEventListener("mouseout", reset);
				anchor.addEventListener("focus", listener());
				anchor.addEventListener("focusout", reset);
				anchor.addEventListener("touchstart", listener(0));
			}
		}
	}

	mount() {
		// immediately prefetch the `url` attribute if it exists
		if (this.#url) {
			this.appendTag({ url: this.#url, prerender: this.#prerender });
		}

		// prefetch the `trigger` elements
		this.prefetch();
	}
}
