import { Animate, type AnimateAttributes } from "../animate/index.ts";
import type { Attributes } from "../types/index.ts";

export type ContextMenuAttributes = Attributes<ContextMenu> & AnimateAttributes;

/**
 * Displays content when the `trigger` element is right clicked, or long pressed on mobile.
 */
export class ContextMenu extends Animate {
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

	async show(e: MouseEvent | TouchEvent) {
		// find coordinates of the click
		const scrollY = window.scrollY;
		const scrollX = window.scrollX;

		const clientX =
			e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX ?? 0;
		const clientY =
			e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY ?? 0;

		let x = clientX + scrollX;
		let y = clientY + scrollY;

		this.getContent().style.position = "absolute";
		this.getContent().style.display = "block";

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

		await this.animateElement();
	}

	async hide() {
		if (this.getContent().style.display !== "none") {
			await this.animateElement({
				options: { direction: "reverse" },
			});
			this.getContent().style.display = "none";
		}
	}

	mount() {
		// mouse
		this.triggerListener((e) => {
			e.preventDefault();
			this.show(e);
		}, "contextmenu");

		this.safeListener("click", () => this.hide());

		// touch
		this.triggerListener((e) => {
			this.#touchTimer = setTimeout(() => {
				this.show(e);
			}, 800);
		}, "touchstart");

		const resetTimer = () => clearTimeout(this.#touchTimer);
		this.triggerListener(resetTimer, "touchend");
		this.triggerListener(resetTimer, "touchcancel");

		// keyboard
		this.safeListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.hide();
			}
		});
	}
}
