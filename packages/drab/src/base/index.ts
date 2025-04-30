/**
 * @module
 *
 * Each element in the library extends one or more of these mixins.
 * The mixins provides methods for selecting elements via HTML attributes
 * along with other helpers.
 */
import { Announcer } from "../announcer/index.js";
import { validate } from "../util/validate.js";

export interface TriggerAttributes {
	trigger?: string;
}

export interface ContentAttributes {
	content?: string;
	swap?: string;
}

export type Constructor<T> = new (...args: any[]) => T;

/**
 * By default, `trigger`s are selected via the `data-trigger` attribute.
 * Alternatively, you can set the `trigger` attribute to a CSS selector to
 * change the default selector from `[data-trigger]` to a selector of your
 * choosing. This can be useful if you have multiple elements within one another.
 *
 * Each element can have multiple `trigger`s.
 */
export const Trigger = <T extends Constructor<HTMLElement>>(
	Super = HTMLElement as T,
) =>
	class Trigger extends Super {
		constructor(...args: any[]) {
			super(args);
		}

		/**
		 * Event for the `trigger` to execute.
		 *
		 * For example, set to `"mouseover"` to execute the event when the user hovers the mouse over the `trigger`, instead of when they click it.
		 *
		 * @default "click"
		 */
		get event(): keyof HTMLElementEventMap {
			return (
				(this.getAttribute("event") as keyof HTMLElementEventMap) ?? "click"
			);
		}

		set event(value) {
			this.setAttribute("event", value);
		}

		/**
		 * @param instance The instance of the desired element to validate against,
		 * ex: `HTMLButtonElement`. Defaults to `HTMLElement`.
		 * @returns All of the elements that match the `trigger` selector.
		 * @default this.querySelectorAll("[data-trigger]")
		 */
		triggers<T extends HTMLElement>(instance: Constructor<T>): NodeListOf<T>;
		triggers(): NodeListOf<HTMLElement>;
		triggers(instance = HTMLElement) {
			const triggers = this.querySelectorAll(
				this.getAttribute("trigger") ?? "[data-trigger]",
			);

			for (const trigger of triggers) validate(trigger, instance);

			return triggers;
		}

		/**
		 * @param listener Listener to attach to all of the `trigger` elements.
		 */
		listener<T extends HTMLElement, K extends keyof HTMLElementEventMap>(
			listener: (this: T, e: HTMLElementEventMap[K]) => any,
			type: K = this.event as K,
			options?: AddEventListenerOptions,
		) {
			for (const trigger of this.triggers()) {
				trigger.addEventListener(type, listener as EventListener, options);
			}
		}
	};

/**
 * By default, `content` is selected via the `data-content` attribute.
 * Alternatively, you can set the `trigger` to a CSS selector to change
 * the default selector from `[data-trigger]` to a selector of your choosing.
 * This can be useful if you have multiple elements within one another.
 *
 * Each element can only have one `content`.
 */
export const Content = <T extends Constructor<HTMLElement>>(
	Super = HTMLElement as T,
) =>
	class Content extends Super {
		constructor(...args: any[]) {
			super(args);
		}

		/**
		 * @param instance The instance of the desired element to validate against,
		 * ex: `HTMLDialogElement`. Defaults to `HTMLElement`.
		 * @returns The element that matches the `content` selector.
		 * @default this.querySelector("[data-content]")
		 */
		content<T extends HTMLElement>(instance: Constructor<T>): T;
		content(): HTMLElement;
		content(instance = HTMLElement) {
			return validate(
				this.querySelector(this.getAttribute("content") ?? "[data-content]"),
				instance,
			);
		}

		/**
		 * Finds the `HTMLElement | HTMLTemplateElement` via the `swap` selector and
		 * swaps `this.content()` with the content of the element found.
		 *
		 * @param revert Wait time (ms) before swapping back, set to `false` to not revert.
		 * default: `800`
		 */
		swap(revert: number | false = 800) {
			/** The swap element, used to hold the replacement contents. */
			const swapTarget = this.querySelector(
				this.getAttribute("swap") ?? "[data-swap]",
			);

			if (swapTarget) {
				/** A copy of the content currently in `this.getContent()`. */
				const currentContent = this.content().childNodes;

				/**
				 * The contents of the swap element, set based on whether the
				 * swap is a `template` or not.
				 */
				const placeholder: Node[] = [];

				// Set the placeholder with the `swap` content, then replace the
				// swap content with the `currentContent`
				if (swapTarget instanceof HTMLTemplateElement) {
					// use `content` since it's a `template` element
					placeholder.push(swapTarget.content.cloneNode(true));
					swapTarget.content.replaceChildren(...currentContent);
				} else {
					// not a `template`, replace children directly
					placeholder.push(...swapTarget.childNodes);
					swapTarget.replaceChildren(...currentContent);
				}

				// finally, set the content to the contents of the placeholder
				this.content().replaceChildren(...placeholder);

				if (revert) {
					// wait and then run again to swap back
					setTimeout(() => this.swap(0), revert);
				}
			}
		}
	};

export const Lifecycle = <T extends Constructor<HTMLElement>>(
	Super = HTMLElement as T,
) =>
	class Lifecycle extends Super {
		/** To clean up event listeners added to `document` when the element is removed. */
		#listenerController = new AbortController();

		constructor(...args: any[]) {
			super(args);
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
		 * Passed into `queueMicrotask` in `connectedCallback`.
		 * It is overridden in each component that needs to run `connectedCallback`.
		 *
		 * The reason for this is to make these elements work better with frameworks like Svelte.
		 * For SSR this isn't necessary, but when client side rendering, the HTML within the
		 * custom element isn't available before `connectedCallback` is called. By waiting until
		 * the next microtask, the HTML content is available---then for example, listeners can
		 * be attached to elements inside.
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
	};

export const Announce = <T extends Constructor<HTMLElement>>(
	Super = HTMLElement as T,
) =>
	class Announce extends Super {
		/**
		 * A single `Announcer` element to share between all drab elements to announce
		 * interactive changes.
		 */
		static #announcer = Announcer.init();

		constructor(...args: any[]) {
			super(args);
		}

		/**
		 * @param message message to announce to screen readers
		 */
		announce(message: string) {
			Announce.#announcer.announce(message);
		}
	};
