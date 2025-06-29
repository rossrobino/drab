import {
	Content,
	type ContentAttributes,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
} from "../base/index.js";

export interface ContextMenuAttributes
	extends TriggerAttributes,
		ContentAttributes {}

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
		this.content().style.left = `${value.x}px`;
		this.content().style.top = `${value.y}px`;
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

		this.content().style.position = "absolute";
		this.content().setAttribute("data-open", "");

		const offsetWidth = this.content().offsetWidth + 24;
		const offsetHeight = this.content().offsetHeight + 6;
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
		this.content().removeAttribute("data-open");
	}

	override mount() {
		// mouse
		this.listener("contextmenu", (e) => {
			e.preventDefault();
			this.show(e);
		});

		this.safeListener("click", () => this.hide());

		// touch
		this.listener(
			"touchstart",
			(e) => {
				this.#touchTimer = setTimeout(() => {
					this.show(e);
				}, 800);
			},
			{ passive: true },
		);

		const resetTimer = () => clearTimeout(this.#touchTimer);
		this.listener("touchend", resetTimer, { passive: true });
		this.listener("touchcancel", resetTimer, { passive: true });

		// keyboard
		this.safeListener("keydown", (e) => {
			if (e.key === "Escape") this.hide();
		});
	}
}
