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
	 * To clean up event listeners added to `document` when the element is removed.
	 */
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
	get event() {
		return (this.getAttribute("event") ?? "click") as keyof HTMLElementEventMap;
	}

	set event(value) {
		this.setAttribute("event", value);
	}

	/**
	 * @returns All of the elements that match the `trigger` selector.
	 * @default this.querySelectorAll("[data-trigger]")
	 */
	getTrigger() {
		const triggers = this.querySelectorAll<HTMLElement>(
			this.getAttribute("trigger") ?? "[data-trigger]",
		);
		return triggers;
	}

	/**
	 * @param instance The instance of the desired element, ex: `HTMLDialogElement`.
	 * Defaults to `HTMLElement`.
	 * @returns The element that matches the `content` selector.
	 * @default this.querySelector("[data-content]")
	 */
	getContent<T extends HTMLElement = HTMLElement>(
		instance: { new (): T } = HTMLElement as { new (): T },
	) {
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
	 * @param revert Swap back to old content
	 * @param delay Wait time before swapping back
	 */
	swapContent(revert: boolean = true, delay: number = 800) {
		const swap = this.querySelector(this.getAttribute("swap") ?? "[data-swap]");
		if (swap) {
			const original = Array.from(this.getContent().childNodes);

			if (swap instanceof HTMLTemplateElement) {
				this.getContent().replaceChildren(swap.content.cloneNode(true));
			} else {
				this.getContent().replaceChildren(...swap.childNodes);
			}

			if (revert) {
				setTimeout(() => this.getContent().replaceChildren(...original), delay);
			}
		}
	}

	/**
	 * Wrapper around `document.body.addEventListener` that ensures when the
	 * element is removed from the DOM, these event listeners are cleaned up.
	 * @param type
	 * @param listener
	 * @param options
	 */
	safeListener<
		K extends keyof HTMLElementEventMap,
		T extends HTMLElement | Window | Document = HTMLElement,
	>(
		type: K,
		listener: (this: T, ev: HTMLElementEventMap[K]) => any,
		element: T = document.body as T,
		options: AddEventListenerOptions = {},
	) {
		options.signal = this.#listenerController.signal;
		//@ts-ignore - inferred listener type not working...?
		element.addEventListener(type, listener, options);
	}

	/**
	 * @param listener Listener to attach to all of the `trigger` elements.
	 */
	triggerListener<T extends HTMLElement, K extends keyof HTMLElementEventMap>(
		listener: (this: T, ev: HTMLElementEventMap[K]) => any,
		type: K = this.event as K,
	) {
		for (const trigger of this.getTrigger()) {
			trigger.addEventListener(type, listener as EventListener);
		}
	}

	/**
	 * Placeholder function is passed into `queueMicrotask` in `connectedCallback`. It is overridden in each component that needs to run `connectedCallback`.
	 *
	 * The reason for this is to make these elements work better with frameworks like Svelte. For SSR this isn't necessary, but when client side rendering, the HTML within the custom element isn't available before `connectedCallback` is called. By waiting until the next microtask, the HTML content is available---then for example, listeners can be attached to elements inside.
	 */
	mount() {}

	connectedCallback() {
		queueMicrotask(() => this.mount());
	}

	disconnectedCallback() {
		this.#listenerController.abort();
	}
}
