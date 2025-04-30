import { Lifecycle, Trigger, type TriggerAttributes } from "../base/index.js";

type Strategy = "hover" | "load" | "visible";

export interface PrefetchAttributes extends TriggerAttributes {
	/** When to prefetch the url. */
	strategy?: Strategy;

	/** Prerender on the client with the Speculation Rules API. */
	prerender?: boolean;

	/** URL to prefetch. */
	url?: string;
}

// https://developer.chrome.com/blog/speculation-rules-improvements
type SpeculationRules = {
	prerender?: DocumentRule[] | ListRule[];
	prefetch?: DocumentRule[] | ListRule[];
};

type Rule = {
	expects_no_vary_search?: string;
	referrer_policy?: ReferrerPolicy;
	requires?: string[];
};

type DocumentRule = {
	source: "document";
	where: WhereCondition;
	eagerness?: "immediate" | "moderate" | "eager" | "conservative";
} & Rule;

type ListRule = { source: "list"; urls: string[] } & Rule;

type WhereCondition =
	| { href_matches: string }
	| { selector_matches: string }
	| { and: WhereCondition[] }
	| { not: WhereCondition }
	| { or: WhereCondition[] };

/**
 * The `Prefetch` element can prefetch a url, or enhance the `HTMLAnchorElement` by loading the HTML for a page before it is navigated to. This element speeds up the navigation for multi-page applications (MPAs).
 *
 * If you are using a framework that already has a prefetch feature or uses a client side router, it is best to use the framework's feature instead of this element to ensure prefetching is working in accordance with the router.
 *
 * ### Attributes
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
 * Use the `prerender` attribute to use the Speculation Rules API when supported to prerender on the client. This allows you to run client side JavaScript in advance instead of only fetching the HTML.
 *
 * Browsers that do not support will still use `<link rel="prefetch">` instead.
 *
 * [Speculation Rules Reference](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)
 *
 * `url`
 *
 * Add a `url` attribute to immediately prefetch a url without having to provide
 * (or in addition to) `trigger` anchor elements.
 *
 * This element can be deprecated once the Speculation Rules API is supported across browsers. The API will be able to prefetch assets in a similar way with the `source: "document"` and `eagerness` features, and will work without JavaScript.
 */
export class Prefetch extends Lifecycle(Trigger()) {
	#prefetchedUrls = new Set<string>();

	constructor() {
		super();
	}

	/** When to prefetch the url. */
	get #strategy() {
		return this.getAttribute("strategy");
	}

	/** Prerender with the Speculation Rules API. */
	get #prerender() {
		return this.hasAttribute("prerender");
	}

	/** `url` to prefetch on `mount`.  */
	get #url() {
		return this.getAttribute("url");
	}

	/**
	 * Appends `<link rel="prefetch">` or `<script type="speculationrules">`
	 * to the head of the document.
	 *
	 * @param options Configuration options.
	 */
	prefetch(options: {
		/** `url` to prefetch. */
		url: string;

		/**
		 * Uses the Speculation Rules API when supported to prerender on the client.
		 */
		prerender?: boolean;
	}) {
		const { url } = options;

		// if not the current page and not already prefetched
		if (!(url === window.location.href) && !this.#prefetchedUrls.has(url)) {
			this.#prefetchedUrls.add(url);

			if (
				HTMLScriptElement.supports &&
				HTMLScriptElement.supports("speculationrules")
			) {
				const rules: SpeculationRules = {
					// Currently, adding `prefetch` is required to fallback if `prerender` fails.
					// Possibly will be automatic in the future, in which case it can be removed.
					// https://github.com/WICG/nav-speculation/issues/162#issuecomment-1977818473
					prefetch: [{ source: "list", urls: [url] }],
				};

				if (options.prerender) rules.prerender = rules.prefetch;

				const script = document.createElement("script");
				script.type = "speculationrules";
				script.textContent = JSON.stringify(rules);
				document.head.append(script);
			} else {
				const link = document.createElement("link");
				link.rel = "prefetch";
				link.as = "document";
				link.href = url;
				document.head.append(link);
			}
		}
	}

	override mount() {
		// immediately prefetch the `url` attribute if it exists
		if (this.#url)
			this.prefetch({ url: this.#url, prerender: this.#prerender });

		// prefetch the `trigger` elements
		const anchors = this.triggers(HTMLAnchorElement);
		const prerender = this.#prerender;
		const strategy = this.#strategy;

		let prefetchTimer: NodeJS.Timeout;

		const listener =
			(delay = 200) =>
			(e: Event) => {
				const { href } = e.currentTarget as HTMLAnchorElement;
				prefetchTimer = setTimeout(
					() => this.prefetch({ url: href, prerender }),
					delay,
				);
			};

		const reset = () => clearTimeout(prefetchTimer);

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					this.prefetch({
						url: (entry.target as HTMLAnchorElement).href,
						prerender,
					});
				}
			}
		});

		for (const anchor of anchors) {
			if (strategy === "load") {
				this.prefetch({ url: anchor.href, prerender });
			} else if (strategy === "visible") {
				observer.observe(anchor);
			} else {
				// "hover" - default
				anchor.addEventListener("mouseover", listener());
				anchor.addEventListener("mouseout", reset);
				anchor.addEventListener("focus", listener());
				anchor.addEventListener("focusout", reset);
				// immediately append on touchstart, no delay
				// passive: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners
				anchor.addEventListener("touchstart", listener(0), { passive: true });
			}
		}
	}
}
