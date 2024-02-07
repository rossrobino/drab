import { Base } from "../base/index.js";
import type { Attributes } from "../types/index.js";

export type PrefetchAttributes = Attributes<Prefetch> &
	Partial<{ strategy: "hover" | "load" | "visible"; prerender: boolean }>;

interface SpeculationRules {
	prerender?: {
		source: string;
		urls: string[];
	}[];
}

/**
 * The `Prefetch` element enhances the `HTMLAnchorElement` by loading the HTML for
 * the linked page before it is navigated to. This element speeds up the navigation for
 * multi-page applications (MPAs).
 *
 * If you are using a framework that already has a prefetch feature, it is probably best to use
 * the framework instead of this element. Frameworks often use client side routing, or have
 * build time optimizations.
 *
 * `strategy`
 *
 * Set the `strategy` attribute to specify the when the prefetch will take place.
 *
 * - `"hover"` - (default) after `mouseover` or `focus` for > 200ms, and on `touchstart` for mobile
 * - `"visible"` - within viewport
 * - `"load"` - when the element is loaded, use carefully
 *
 * `prerender`
 *
 * Use the `prerender` attribute to use the experimental Speculation Rules API when supported to prerender on the client. This allows you to run client side JavaScript in advance instead of only fetching the HTML.
 *
 * Browsers that do not support will still use `<link rel="prefetch">` instead.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)
 */
export class Prefetch extends Base {
	constructor() {
		super();
	}

	/** When to prefetch the url. */
	get #strategy() {
		return (this.getAttribute("strategy") ?? "hover") as
			| "hover"
			| "load"
			| "visible";
	}

	/** Use the speculation rules API. */
	get #prerender() {
		return this.hasAttribute("prerender");
	}

	/**
	 * Use to prefetch/prerender HTML.
	 *
	 * Can be used more than once with different options for different selectors.
	 *
	 * @param options prefetch options
	 */
	prefetch(
		options: {
			/**
			 * Uses the experimental Speculation Rules API when supported
			 * to prerender on the client, defaults to `false`.
			 */
			prerender?: boolean;
			/**
			 * Determines when the prefetch takes place, defaults to `"hover"`.
			 */
			strategy?: "hover" | "load" | "visible";
		} = { prerender: this.#prerender, strategy: this.#strategy },
		// above is the default if undefined
	) {
		// defaults if partially defined
		const { prerender = this.#prerender, strategy = this.#strategy } = options;

		const anchors = this.getTrigger<HTMLAnchorElement>();

		const appendTag = (href: string) => {
			// if not the current page
			if (!(href === window.location.href)) {
				// minifies
				const speculationRules = "speculationrules";

				const url = new URL(href).pathname;

				// is there already a link tag
				let isNew = document.querySelector(`link[href='${url}']`) === null;

				// check if there's already a speculation rules script with the `url`
				const existing = document.querySelectorAll<HTMLScriptElement>(
					`script[type='${speculationRules}']`,
				);
				for (const s of existing) {
					const rules = JSON.parse(s.textContent ?? "{}") as SpeculationRules;
					if (rules.prerender?.at(0)?.urls.includes(url)) {
						isNew = false;
						break;
					}
				}

				if (isNew) {
					if (
						prerender &&
						HTMLScriptElement.supports &&
						HTMLScriptElement.supports(speculationRules)
					) {
						const specScript = document.createElement("script");
						specScript.type = speculationRules;
						specScript.textContent = JSON.stringify({
							prerender: [
								{
									source: "list",
									urls: [url],
								},
							],
						} satisfies SpeculationRules);
						document.head.append(specScript);
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
		};

		let prefetchTimer: NodeJS.Timeout;

		/**
		 * @param delay ms delay - for `hover`
		 * @returns the event listener with delay
		 */
		const listener =
			(delay = 200) =>
			(e: Event) => {
				const { href } = e.currentTarget as HTMLAnchorElement;
				prefetchTimer = setTimeout(() => appendTag(href), delay);
			};

		const reset = () => clearTimeout(prefetchTimer);

		const observer = new IntersectionObserver((entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					appendTag((e.target as HTMLAnchorElement).href);
				}
			}
		});

		for (const anchor of anchors) {
			if (strategy === "hover") {
				anchor.addEventListener("mouseover", listener());
				anchor.addEventListener("mouseout", reset);
				anchor.addEventListener("focus", listener());
				anchor.addEventListener("focusout", reset);
				anchor.addEventListener("touchstart", listener(0));
			} else if (strategy === "visible") {
				observer.observe(anchor);
			} else {
				// load
				appendTag(anchor.href);
			}
		}
	}

	mount() {
		this.prefetch();
	}
}
