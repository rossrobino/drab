import {
	Content,
	Lifecycle,
	Trigger,
	type BaseAttributes,
} from "../base/index.js";

export type ContextMenuAttributes = BaseAttributes;

/**
 * Displays content when the `trigger` element is right clicked, or long pressed on mobile.
 */
export class ContextMenu extends Lifecycle(Trigger(Content())) {
	/** Tracks the long press duration on mobile. */
	#touchTimer: NodeJS.Timeout | undefined;

	constructor() {
		super();
	}

	/** Sets the context menu's `style.left` and `style.top` position. */
	set #coordinates(value: { x: number; y: number }) {
		this.getContent().style.left = `${value.x}px`;
		this.getContent().style.top = `${value.y}px`;
	}

	show(e: MouseEvent | TouchEvent) {
		// find coordinates of the click
		const scrollY = window.scrollY;
		const scrollX = window.scrollX;

		const clientX =
			e instanceof MouseEvent ? e.clientX : (e.touches[0]?.clientX ?? 0);
		const clientY =
			e instanceof MouseEvent ? e.clientY : (e.touches[0]?.clientY ?? 0);

		let x = clientX + scrollX;
		let y = clientY + scrollY;

		this.getContent().style.position = "absolute";
		this.getContent().setAttribute("data-open", "");

		const offsetWidth = this.getContent().offsetWidth + 24;
		const offsetHeight = this.getContent().offsetHeight + 6;
		const innerWidth = window.innerWidth;
		const innerHeight = window.innerHeight;

		// ensure menu is within view
		if (x + offsetWidth > scrollX + innerWidth) {
			x = scrollX + innerWidth - offsetWidth;
		}
		if (y + offsetHeight > scrollY + innerHeight) {
			y = scrollY + innerHeight - offsetHeight;
		}

		this.#coordinates = { x, y };
	}

	hide() {
		this.getContent().removeAttribute("data-open");
	}

	override mount() {
		// mouse
		this.triggerListener((e) => {
			e.preventDefault();
			this.show(e);
		}, "contextmenu");

		this.safeListener("click", () => this.hide());

		// touch
		this.triggerListener(
			(e) => {
				this.#touchTimer = setTimeout(() => {
					this.show(e);
				}, 800);
			},
			"touchstart",
			{ passive: true },
		);

		const resetTimer = () => clearTimeout(this.#touchTimer);
		this.triggerListener(resetTimer, "touchend", { passive: true });
		this.triggerListener(resetTimer, "touchcancel", { passive: true });

		// keyboard
		this.safeListener("keydown", (e) => {
			if (e.key === "Escape") this.hide();
		});
	}
}
