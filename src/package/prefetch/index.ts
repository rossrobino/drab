import { Base } from "../base/index.js";
import type { Attributes } from "../types/index.js";

type Strategy = "hover" | "load" | "visible";

export type PrefetchAttributes = Attributes<Prefetch> &
	Partial<{ strategy: Strategy; prerender: boolean; url: string }>;

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

type ListRule = {
	source: "list";
	urls: string[];
} & Rule;

type WhereCondition =
	| {
			href_matches: string;
	  }
	| {
			selector_matches: string;
	  }
	| {
			and: WhereCondition[];
	  }
	| {
			not: WhereCondition;
	  }
	| {
			or: WhereCondition[];
	  };

/**
 * The `Prefetch` element can prefetch a url, or enhance the `HTMLAnchorElement` by loading the HTML for a page before it is navigated to. This element speeds up the navigation for multi-page applications (MPAs).
 *
 * If you are using a framework that already has a prefetch feature or uses a client side router, it is best to use the framework's feature instead of this element to ensure prefetching is working in accordance with the router.
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
export class Prefetch extends Base {
	#prefetchedUrls: string[] = [];

	constructor() {
		super();
	}

	/** When to prefetch the url. */
	get #strategy() {
		return (this.getAttribute("strategy") ?? "hover") as Strategy;
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
	 * Appends `<link rel="prefetch">` or `<script type="speculationrules">` to the head of the document.
	 *
	 * @param options Configuration options.
	 */
	appendTag(options: {
		/** `url` to prefetch. */
		url: string;

		/**
		 * Uses the Speculation Rules API when supported to prerender on the client.
		 */
		prerender?: boolean;
	}) {
		const { url, prerender } = options;

		// if not the current page and not already prefetched
		if (
			!(url === window.location.href) &&
			!this.#prefetchedUrls.includes(url)
		) {
			this.#prefetchedUrls.push(url);

			const link = document.createElement("link");
			link.rel = "prefetch";
			link.as = "document";
			link.href = url;
			document.head.append(link);

			if (prerender) {
				const script = document.createElement("script");
				script.type = "speculationrules";
				script.textContent = JSON.stringify({
					prerender: [
						{
							source: "list",
							urls: [url],
						},
					],
				} satisfies SpeculationRules);
				document.head.append(script);
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
			 * Uses the Speculation Rules API when supported to prerender on the client.
			 */
			prerender?: boolean;

			/**
			 * Determines when the prefetch takes place.
			 *
			 * @default "hover"
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

				// immediately append on touchstart, no delay
				// passive: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners
				anchor.addEventListener("touchstart", listener(0), { passive: true });
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
