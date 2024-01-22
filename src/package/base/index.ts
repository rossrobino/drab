/**
 * The `Base` class provides the `trigger` and `content` methods for
 * selecting elements via HTML attributes along with other helpers for
 * each custom element in the library.
 *
 * Set a `trigger` or `content` attribute to a CSS selector to change the
 * default selector from `[data-trigger]` and `[data-content]`.
 */
export class Base extends HTMLElement {
	/**
	 * To clean up event listeners added to `document` when
	 * when the element is removed.
	 */
	#listenerController = new AbortController();

	constructor() {
		super();
	}

	/**
	 * Event for the `trigger` to execute.
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
	trigger() {
		const trigger = this.getAttribute("trigger") ?? "[data-trigger]";
		const elements = this.querySelectorAll<HTMLElement>(trigger);
		if (!elements.length) throw new Error("Trigger not found");
		return elements;
	}

	/**
	 *
	 * @param instance The instance of the desired element, ex: `HTMLDialogElement`.
	 * Defaults to `HTMLElement`.
	 * @returns The element that matches the `content` selector.
	 * @default this.querySelector("[data-content]")
	 */
	content<T extends HTMLElement = HTMLElement>(
		instance: { new (): T } = HTMLElement as { new (): T },
	) {
		const content = this.getAttribute("content") ?? "[data-content]";
		const element = this.querySelector(content);
		if (element instanceof instance) return element;
		throw new Error("Content not found");
	}

	/**
	 * Wrapper around `document.body.addEventListener` that ensures when the
	 * element is removed from the DOM, these event listeners are cleaned up.
	 * @param type
	 * @param listener
	 * @param options
	 */
	safeListener<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
		options: AddEventListenerOptions = {},
	) {
		options.signal = this.#listenerController.signal;
		document.body.addEventListener(type, listener, options);
	}

	/**
	 * @param listener Listener to attach to all of the `trigger` elements.
	 */
	triggerListener(listener: EventListener) {
		for (const trigger of this.trigger()) {
			trigger.addEventListener(this.event, listener);
		}
	}

	disconnectedCallback() {
		this.#listenerController.abort();
	}
}
