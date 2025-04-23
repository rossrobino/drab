import { define } from "../util/define.js";

/**
 * Use the `Announcer` element to create a visually hidden ARIA live region
 * that announces content changes to screen readers. Use this element when you
 * need to announce changes to screen readers that something has changed. If changed
 * element is visible on the page, add the appropriate ARIA live attribute to the
 * visible element instead of using this announcer.
 *
 * It's recommended to create this element with JavaScript using the `Announcer.init` method,
 * then you can reuse the same announcer throughout the application to
 * [avoid duplicate regions](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/#limit-the-number-of-live-regions-on-the-page)
 * (see below).
 *
 * ### Attributes
 *
 * `aria-live`
 *
 * By default, the announcer is created with the
 * [`polite` ARIA live attribute](https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/#1.-using-the-aria-live-attribute).
 *
 * @example
 *
 * ```ts
 * import { Announcer } from "drab/announcer";
 *
 * // creates and appends a new announcer to the body element
 * const announcer = Announcer.init();
 *
 * // create announcement
 * announcer.announce("message");
 * ```
 *
 * > The `Base` element creates a single `Announcer` to share between all elements
 * > that can be accessed through `this.announce`. If you are using one of drab's other
 * > elements you can call `announce` directly on the element to announce changes.
 */
export class Announcer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.style.position = "absolute";
		this.style.width = "1px";
		this.style.height = "1px";
		this.style.padding = "0";
		this.style.margin = "-1px";
		this.style.overflow = "hidden";
		this.style.clipPath = "rect(0, 0, 0, 0)";
		this.style.whiteSpace = "nowrap";
		this.style.borderWidth = "0";

		if (!this.ariaLive) this.ariaLive = "polite";
	}

	/**
	 * @param message message to announce to screen readers
	 */
	announce(message: string) {
		// this ensures multiple messages will be read in succession
		const span = document.createElement("span");
		span.textContent = message;
		this.append(span);

		// https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/#empty-the-live-region-and-wait-a-bit-in-between-updates
		setTimeout(() => span.remove(), 10000);
	}

	/**
	 * Helper method to create a new `Announcer` element named `drab-announcer`
	 * and append the element to the `<body>` tag. If an announcer already exists
	 * on the page it will return the existing element.
	 *
	 * @returns the created or existing `Announcer` element
	 */
	static init(): Announcer {
		define("drab-announcer", this);

		const name = "drab-announcer";
		let announcer: Announcer | null = document.querySelector<Announcer>(name);

		if (!announcer) {
			announcer = document.createElement(name) as Announcer;
			document.body.append(announcer);
		}

		return announcer;
	}
}
