/**
 * Each element in the library extends the `Base` class. It provides the `trigger`
 * and `content` methods for selecting elements via HTML attributes along with
 * other helpers.
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
	trigger() {
		const triggers = this.querySelectorAll<HTMLElement>(
			this.getAttribute("trigger") ?? "[data-trigger]",
		);
		if (!triggers.length) throw new Error("Trigger not found");
		return triggers;
	}

	/**
	 * @param instance The instance of the desired element, ex: `HTMLDialogElement`.
	 * Defaults to `HTMLElement`.
	 * @returns The element that matches the `content` selector.
	 * @default this.querySelector("[data-content]")
	 */
	content<T extends HTMLElement = HTMLElement>(
		instance: { new (): T } = HTMLElement as { new (): T },
	) {
		const content = this.querySelector(
			this.getAttribute("content") ?? "[data-content]",
		);
		if (content instanceof instance) return content;
		throw new Error("Content not found");
	}

	/**
	 * Finds the `HTMLTemplateElement` via the `swap` selector and
	 * swaps `this.content().innerHTML` with the content of the template.
	 *
	 * @param revert swap back to old content
	 * @param delay wait time before swapping back
	 */
	swap(revert: boolean = true, delay: number = 800) {
		const swap = this.querySelector<HTMLTemplateElement>(
			this.getAttribute("swap") ?? "[data-swap]",
		)?.content.cloneNode(true);
		if (swap) {
			const original = this.content().innerHTML;
			this.content().replaceChildren(swap);
			if (revert) {
				setTimeout(() => (this.content().innerHTML = original), delay);
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
	triggerListener(listener: EventListener) {
		for (const trigger of this.trigger()) {
			trigger.addEventListener(this.event, listener);
		}
	}

	disconnectedCallback() {
		this.#listenerController.abort();
	}
}
