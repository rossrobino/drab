export class Base extends HTMLElement {
	/**
	 * To clean up event listeners added to `document` when
	 * when the element is removed.
	 */
	#listenerController = new AbortController();

	constructor() {
		super();
	}

	get triggerEvent() {
		return (this.getAttribute("trigger-event") ??
			"click") as keyof HTMLElementEventMap;
	}

	set triggerEvent(value) {
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
	 * @param instance The instance of the desired element, ex: `HTMLDialogElement`
	 * @returns The element that matches the `content` selector.
	 * @default this.querySelector("[data-content]")
	 */
	content<T = HTMLElement>(instance: { new (): T; prototype: T }) {
		const content = this.getAttribute("content") ?? "[data-content]";
		const element = this.querySelector(content);
		if (element instanceof instance) return element;
		throw new Error("Content not found");
	}

	/**
	 * Wrapper around `document.addEventListener` that ensures when the
	 * element is removed from the DOM, these event listeners are cleaned up.
	 * @param type
	 * @param listener
	 * @param options
	 */
	safeAddEventListener<K extends keyof DocumentEventMap>(
		type: K,
		listener: (this: Document, ev: DocumentEventMap[K]) => any,
		options: AddEventListenerOptions = {},
	) {
		options.signal = this.#listenerController.signal;
		document.addEventListener(type, listener, options);
	}

	disconnectedCallback() {
		this.#listenerController.abort();
	}
}
