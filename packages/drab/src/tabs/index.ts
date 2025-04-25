import { Lifecycle, Trigger, type BaseAttributes } from "../base/index.js";

export type TabAttributes = BaseAttributes & {
	orientation?: "horizontal" | "vertical";
};

/**
 * Progressively enhance a list of links and content to be tabs by
 * wrapping with the `Tabs` element. Each `trigger` should be an
 * `HTMLAnchorElement` with the `href` attribute set to the `id` of the
 * corresponding tab panel.
 *
 * > Tip: Set the `height` of the element the `panel`s are contained in with
 * > CSS to prevent layout shift when JS is loaded.
 *
 * This element is based on
 * [Chris Ferdinandi's Toggle Tabs](https://gomakethings.com/a-web-component-ui-library-for-people-who-love-html/#toggle-tabs)
 * design.
 *
 * [ARIA Reference](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
 *
 * - Sets the correct ARIA attributes on each element.
 * - Supports keyboard navigation based on the `orientation` attribute.
 * - First tab is selected by default if no `aria-selected="true"` attribute is
 * found on another tab.
 * - `tablist` is calculated based on the deepest common parent of the tabs,
 * throws an error if not found.
 *
 * ### Attributes
 *
 * `orientation`
 *
 * Set `orientation="vertical"` if the `tablist` element is displayed vertically.
 */
export class Tabs extends Lifecycle(Trigger()) {
	/** Supported keys for keyboard navigation. */
	#keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];

	/** Currently selected tab. */
	#selected: { tab?: HTMLAnchorElement; index: number } = { index: 0 };

	constructor() {
		super();
	}

	/** User provided orientation of the `tablist`. */
	get #orientation() {
		return this.getAttribute("orientation") ?? "horizontal";
	}

	get #tabs() {
		return this.getTrigger(HTMLAnchorElement);
	}

	/**
	 * @param tab
	 * @returns The ancestors of the tab up to `this`.
	 */
	#ancestors(tab?: HTMLElement) {
		const ancestors = new Set<HTMLElement>();

		let current: HTMLElement | null | undefined = tab;
		while ((current = current?.parentElement) && current !== this) {
			ancestors.add(current);
		}

		return ancestors;
	}

	/** A map of each `tab` and its corresponding `panel`. */
	get #map() {
		const map = new Map<HTMLAnchorElement, HTMLElement>();

		for (const tab of this.#tabs) {
			const panel = this.querySelector(tab.hash);
			if (!(panel instanceof HTMLElement))
				throw new Error(`Tabs: No HTMLElement with ID of ${tab.hash} found.`);

			map.set(tab, panel);
		}

		return map;
	}

	override mount() {
		// create tablist
		const [first, ...rest] = this.#tabs;
		let common = this.#ancestors(first);
		for (let i = 0; i < rest.length; i++) {
			common = common.intersection(this.#ancestors(rest[i]));
		}
		const [tablist] = common;
		if (!tablist)
			throw new Error("Tabs: No common parent element found for triggers.");
		tablist.role = "tablist";
		tablist.ariaOrientation = this.#orientation;

		// enhance tabs/panels
		let index = 0;
		for (const [tab, panel] of this.#map) {
			tab.role = "tab";
			tab.id = `tab-${panel.id}`;
			tab.setAttribute("aria-controls", panel.id);
			if (tab.ariaSelected) this.#selected = { tab, index };

			panel.role = "tabpanel";
			panel.setAttribute("aria-labelledby", tab.id);

			tab.addEventListener(this.event, (e) => {
				e.preventDefault();

				for (const [t, p] of this.#map) {
					if (t === tab) {
						// show current
						t.ariaSelected = "true";
						t.tabIndex = 0;
						p.hidden = false;
					} else {
						// hide others
						t.ariaSelected = "false";
						t.tabIndex = -1;
						p.hidden = true;
					}
				}
			});

			index++;
		}

		// fallback to first
		if (!this.#selected.tab) this.#selected.tab = this.#tabs[0];

		// select the current tab
		this.#selected.tab?.click();

		// handle keyboard navigation
		this.addEventListener("keydown", (e) => {
			const i = this.#keys.indexOf(e.key);
			if (i === -1) return;

			const previousIndex = this.#selected.index;
			const vertical = this.#orientation === "vertical";

			if (
				((!vertical && i === 0) || (vertical && i === 1)) &&
				this.#tabs[this.#selected.index + 1]
			) {
				// next
				this.#selected.tab = this.#tabs[++this.#selected.index];
			} else if (
				((!vertical && i === 2) || (vertical && i === 3)) &&
				this.#tabs[this.#selected.index - 1]
			) {
				// previous
				this.#selected.tab = this.#tabs[--this.#selected.index];
			} else if (i === 4) {
				// home
				this.#selected = { tab: this.#tabs[0], index: 0 };
			} else if (i === 5) {
				// end
				const index = this.#tabs.length - 1;
				this.#selected = { tab: this.#tabs[index], index };
			}

			if (this.#selected.index === previousIndex) return;

			e.preventDefault();
			this.#selected.tab?.click();
			this.#selected.tab?.focus();
		});
	}
}
