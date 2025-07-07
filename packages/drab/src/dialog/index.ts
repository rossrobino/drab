import {
	Content,
	type ContentAttributes,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
} from "../base/index.js";

export interface DialogAttributes extends TriggerAttributes, ContentAttributes {
	/** Close the dialog when clicked outside. */
	"click-outside-close"?: boolean;

	/** Remove scroll from the body when dialog is open. */
	"remove-body-scroll"?: boolean;
}

/**
 * Provides triggers for the `HTMLDialogElement`.
 *
 * ### Attributes
 *
 * `click-outside-close`
 *
 * By default, the `HTMLDialogElement` doesn't close if the user clicks outside of it.
 * Add a `click-outside-close` attribute to close when the user clicks outside.
 *
 * If the dialog covers the full viewport and this attribute is present, the first child
 * of the dialog will be assumed to be the content of the dialog and the dialog will close
 * if there is a click outside of the first child element.
 *
 * `remove-body-scroll`
 *
 * Add the `remove-body-scroll` attribute to remove the scroll from `document.body` when the dialog
 * is open.
 */
export class Dialog extends Lifecycle(Trigger(Content())) {
	constructor() {
		super();
	}

	/** The `HTMLDialogElement` within the element. */
	get #dialog() {
		return this.content(HTMLDialogElement);
	}

	get #removeBodyScroll() {
		return this.hasAttribute("remove-body-scroll");
	}

	get #clickOutsideClose() {
		return this.hasAttribute("click-outside-close");
	}

	get #scrollbarWidth() {
		return window.innerWidth - document.documentElement.clientWidth;
	}

	/** Remove scroll from the body when open with the `remove-body-scroll` attribute. */
	#toggleBodyScroll(show: boolean) {
		if (this.#removeBodyScroll) {
			document.documentElement.style.scrollbarGutter = "stable";
			document.body.style.overflow = show ? "hidden" : "";
		}
	}

	/** Wraps `HTMLDialogElement.showModal()`. */
	show() {
		this.#dialog.showModal();
		this.#toggleBodyScroll(true);
	}

	/** Wraps `HTMLDialogElement.close()`. */
	close() {
		this.#toggleBodyScroll(false);
		this.#dialog.close();
	}

	/** `show` or `close` depending on the dialog's `open` attribute. */
	toggle() {
		if (this.#dialog.open) this.close();
		else this.show();
	}

	override mount() {
		this.listener(() => this.toggle());

		this.safeListener("keydown", (e) => {
			if (e.key === "Escape" && this.#dialog.open) {
				e.preventDefault();
				this.close();
			}
		});

		if (this.#clickOutsideClose) {
			// https://blog.webdevsimplified.com/2023-04/html-dialog/#close-on-outside-click
			this.#dialog.addEventListener("click", (e) => {
				let rect = this.#dialog.getBoundingClientRect();

				// If dialog covers full viewport, use first child element for hit testing
				// Example: https://picocss.com/docs/modal
				if (
					window.innerWidth - rect.width <= this.#scrollbarWidth + 3 &&
					window.innerHeight - rect.height <= 3 &&
					this.#dialog.firstElementChild
				) {
					rect = this.#dialog.firstElementChild.getBoundingClientRect();
				}

				if (
					e.clientX < rect.left ||
					e.clientX > rect.right ||
					e.clientY < rect.top ||
					e.clientY > rect.bottom
				) {
					this.close();
				}
			});
		}
	}
}
