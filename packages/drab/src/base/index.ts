import { Announcer } from "../announcer/index.js";

export type BaseAttributes = {
	trigger?: string;
	content?: string;
	swap?: string;
};

/**
 * Each element in the library extends the `Base` class. It provides methods
 * for selecting elements via HTML attributes along with other helpers.
 *
 * By default, `trigger`s and `content` will be selected via the `data-trigger` and
 * `data-content` attributes. Alternatively, you can set the `trigger` or
 * `content` attribute to a CSS selector to change the default selector from
 * `[data-trigger]` or `[data-content]` to a selector of your choosing.
 * This can be useful if you have multiple elements within one another.
 *
 * Each element can have multiple `trigger`s, but will only have one `content`.
 */
export class Base extends HTMLElement {
	/**
	 * A single `Announcer` element to share between all drab elements to announce
	 * interactive changes.
	 */
	static #announcer = Announcer.init();

	/** To clean up event listeners added to `document` when the element is removed. */
	#listenerController = new AbortController();

	constructor() {
		super();
	}

	/**
	 * Event for the `trigger` to execute.
	 *
	 * For example, set to `"mouseover"` to execute the event when the user hovers the mouse over the `trigger`, instead of when they click it.
	 *
	 * @default "click"
	 */
	get event(): keyof HTMLElementEventMap {
		return (this.getAttribute("event") as keyof HTMLElementEventMap) ?? "click";
	}

	set event(value) {
		this.setAttribute("event", value);
	}

	/**
	 * @param message message to announce to screen readers
	 */
	announce(message: string) {
		Base.#announcer.announce(message);
	}

	/**
	 * @returns All of the elements that match the `trigger` selector.
	 * @default this.querySelectorAll("[data-trigger]")
	 */
	getTrigger<T extends HTMLElement = HTMLElement>() {
		return this.querySelectorAll<T>(
			this.getAttribute("trigger") ?? "[data-trigger]",
		);
	}

	/**
	 * @param instance The instance of the desired element to validate against,
	 * ex: `HTMLDialogElement`. Defaults to `HTMLElement`.
	 * @returns The element that matches the `content` selector.
	 * @default this.querySelector("[data-content]")
	 */
	getContent<T extends HTMLElement = HTMLElement>(
		instance: { new (): T } = HTMLElement as { new (): T },
	): T {
		const content = this.querySelector(
			this.getAttribute("content") ?? "[data-content]",
		);

		if (content instanceof instance) return content;

		throw new Error("Content not found");
	}

	/**
	 * Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
	 * swaps `this.content()` with the content of the element found.
	 *
	 * @param revert Wait time (ms) before swapping back, set to `false` to not revert.
	 * default: `800`
	 */
	swapContent(revert: number | false = 800) {
		/** The swap element, used to hold the replacement contents. */
		const swap = this.querySelector(this.getAttribute("swap") ?? "[data-swap]");

		if (swap) {
			/** A copy of the content currently in `this.getContent()`. */
			const currentContent = this.getContent().childNodes;

			/**
			 * The contents of the swap element, set based on whether the
			 * swap is a `template` or not.
			 */
			const placeholder: Node[] = [];

			// Set the placeholder with the `swap` content, then replace the
			// swap content with the `currentContent`
			if (swap instanceof HTMLTemplateElement) {
				// use `content` since it's a `template` element
				placeholder.push(swap.content.cloneNode(true));
				swap.content.replaceChildren(...currentContent);
			} else {
				// not a `template`, replace children directly
				placeholder.push(...swap.childNodes);
				swap.replaceChildren(...currentContent);
			}

			// finally, set the content to the contents of the placeholder
			this.getContent().replaceChildren(...placeholder);

			if (revert) {
				// wait and then run again to swap back
				setTimeout(() => this.swapContent(0), revert);
			}
		}
	}

	/**
	 * Wrapper around `addEventListener` that ensures when the element is
	 * removed from the DOM, these event listeners are cleaned up.
	 *
	 * @param type Event listener type - ex: `"keydown"`
	 * @param listener Listener to add to the target.
	 * @param target Event target to add the listener to - defaults to `document.body`.
	 * @param options Other options sans `signal`.
	 */
	safeListener<T extends keyof HTMLElementEventMap>(
		type: T,
		listener: (this: HTMLElement, event: HTMLElementEventMap[T]) => any,
		element?: HTMLElement,
		options?: AddEventListenerOptions,
	): void;
	safeListener<T extends keyof DocumentEventMap>(
		type: T,
		listener: (this: Document, event: DocumentEventMap[T]) => any,
		document: Document,
		options?: AddEventListenerOptions,
	): void;
	safeListener<T extends keyof WindowEventMap>(
		type: T,
		listener: (this: Window, event: WindowEventMap[T]) => any,
		window: Window,
		options?: AddEventListenerOptions,
	): void;
	safeListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		target: EventTarget = document.body,
		options: AddEventListenerOptions = {},
	) {
		options.signal = this.#listenerController.signal;
		target.addEventListener(type, listener, options);
	}

	/**
	 * @param listener Listener to attach to all of the `trigger` elements.
	 */
	triggerListener<T extends HTMLElement, K extends keyof HTMLElementEventMap>(
		listener: (this: T, e: HTMLElementEventMap[K]) => any,
		type: K = this.event as K,
		options?: AddEventListenerOptions,
	) {
		for (const trigger of this.getTrigger()) {
			trigger.addEventListener(type, listener as EventListener, options);
		}
	}

	/**
	 * Passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.
	 *
	 * The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.
	 */
	mount() {}

	/** Called when custom element is added to the page. */
	connectedCallback() {
		queueMicrotask(() => this.mount());
	}

	/**
	 * Passed into `disconnectedCallback`, since `Base` needs to run `disconnectedCallback` as well. It is overridden in each element that needs to run `disconnectedCallback`.
	 */
	destroy() {}

	/** Called when custom element is removed from the page. */
	disconnectedCallback() {
		this.destroy();
		this.#listenerController.abort();
	}
}
