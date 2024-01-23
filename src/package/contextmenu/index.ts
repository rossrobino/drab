import { Animate } from "../animate/index.ts";

/**
 * Displays when the `trigger` element is right clicked, or long pressed on mobile.
 */
export class ContextMenu extends Animate {
	/** A clone of the template's content to insert into the context menu. */
	#templateContent = this.content(HTMLTemplateElement).content.cloneNode(true);

	/** The element containing the contents of the template. */
	#contextMenu = document.createElement("div");

	constructor() {
		super();
	}

	/** Sets the context menu's `style.left` and `style.top` position. */
	set #coordinates(value: { x: number; y: number }) {
		this.#contextMenu.style.left = `${value.x}px`;
		this.#contextMenu.style.top = `${value.y}px`;
	}

	async show(e: MouseEvent | TouchEvent) {
		this.#contextMenu.append(this.#templateContent);
		this.#contextMenu.style.visibility = "none";
		this.#contextMenu.style.position = "absolute";
		document.body.append(this.#contextMenu);

		// find coordinates of the click
		const scrollY = window.scrollY;
		const scrollX = window.scrollX;
		const clientX =
			e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX ?? 0;
		const clientY =
			e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY ?? 0;

		const x = clientX + scrollX;
		const y = clientY + scrollY;

		this.#coordinates = { x, y };

		await this.animateElement({ element: this.#contextMenu });

		const offsetWidth = this.#contextMenu.offsetWidth + 24;
		const offsetHeight = this.#contextMenu.offsetHeight + 6;
		const innerWidth = window.innerWidth;
		const innerHeight = window.innerHeight;

		// ensure menu is within view
		if (x + offsetWidth > scrollX + innerWidth) {
			this.#coordinates = { x: scrollX + innerWidth - offsetWidth, y };
		}
		if (y + offsetHeight > scrollY + innerHeight) {
			this.#coordinates = { x, y: scrollY + innerHeight - offsetHeight };
		}
	}

	async hide() {
		await this.animateElement({
			element: this.#contextMenu,
			options: { direction: "reverse" },
		});
		this.#contextMenu.remove();
	}

	connectedCallback() {
		this.triggerListener((e) => {
			e.preventDefault();
			this.show(e as MouseEvent);
		}, "contextmenu");

		this.safeListener("click", () => this.hide());
		this.safeListener("keydown", (e) => {
			if (e.key === "Escape") {
				this.hide();
			}
		});
	}
}
