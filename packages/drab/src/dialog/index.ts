import { Base, type BaseAttributes } from "../base/index.js";

export type DialogAttributes = BaseAttributes & {
	"click-outside-close"?: boolean;
	"remove-body-scroll"?: boolean;
};

/**
 * Provides triggers for the `HTMLDialogElement`.
 *
 * `click-outside-close`
 *
 * By default, the `HTMLDialogElement` doesn't close if the user clicks outside of it.
 * Add a `click-outside-close` attribute to close when the user clicks outside.
 *
 * ### Attributes
 *
 * `remove-body-scroll`
 *
 * Add the `remove-body-scroll` attribute to remove the scroll from `document.body` when the dialog
 * is open.
 */
export class Dialog extends Base {
	/** The initial margin-right value of the body element. */
	#initialBodyMarginRight = parseInt(
		getComputedStyle(document.body).marginRight,
	);

	constructor() {
		super();
	}

	/** The `HTMLDialogElement` within the element. */
	get dialog() {
		return this.getContent(HTMLDialogElement);
	}

	/** Remove scroll from the body when open with the `remove-body-scroll` attribute. */
	#toggleBodyScroll(show: boolean) {
		if (this.hasAttribute("remove-body-scroll")) {
			document.body.style.marginRight = `${
				show
					? this.#initialBodyMarginRight +
						// scrollbar width
						window.innerWidth -
						document.documentElement.clientWidth
					: this.#initialBodyMarginRight
			}px`;
			document.body.style.overflow = show ? "hidden" : "";
		}
	}

	/** `HTMLDialogElement.showModal()` with animation. */
	show() {
		this.dialog.showModal();
		this.#toggleBodyScroll(true);
	}

	/** `HTMLDialogElement.close()` with animation. */
	close() {
		this.#toggleBodyScroll(false);
		this.dialog.close();
	}

	/** `show` or `close` depending on the dialog's `open` attribute. */
	toggle() {
		if (this.dialog.open) this.close();
		else this.show();
	}

	override mount() {
		this.triggerListener(() => this.toggle());

		this.safeListener("keydown", (e) => {
			if (e.key === "Escape" && this.dialog.open) {
				// to execute animation
				e.preventDefault();
				this.close();
			}
		});

		if (this.hasAttribute("click-outside-close")) {
			// https://blog.webdevsimplified.com/2023-04/html-dialog/#close-on-outside-click
			this.dialog.addEventListener("click", (e) => {
				const rect = this.dialog.getBoundingClientRect();

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
