import {
	Content,
	Lifecycle,
	Trigger,
	type TriggerAttributes,
	type ContentAttributes,
} from "../base/index.js";

export interface IntersectAttributes
	extends TriggerAttributes,
		ContentAttributes {
	/** Number between 0 and 1 representing the visible portion of the `trigger`. */
	threshold?: number;
}

/**
 * Uses the
 * [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
 * to add a `data-intersect` attribute to `content` when the `trigger` is intersecting.
 *
 * ### Events
 *
 * `intersect`
 *
 * Fired when the `trigger` enters the viewport.
 *
 * `exit`
 *
 * Fired when the `trigger` exits the viewport.
 *
 * ### Attributes
 *
 * `threshold`
 *
 * Specify a `threshold` between `0` and `1` to determine how much of the
 * `trigger` should be visible for the intersection to occur.
 */
export class Intersect extends Lifecycle(Trigger(Content())) {
	constructor() {
		super();
	}

	/**
	 * How much of the `trigger` should be visible for the intersection to occur.
	 * For example, given a threshold of `.5`, the intersection would occur when
	 * the `trigger` is 50% visible.
	 *
	 * @default 0
	 */
	get #threshold() {
		return Number(this.getAttribute("threshold") ?? 0);
	}

	override mount() {
		const observer = new IntersectionObserver(
			(entries) => {
				// attribute to add or remove from `content`
				const attr = "data-intersect";

				for (const entry of entries) {
					if (entry.isIntersecting) {
						this.getContent().setAttribute(attr, "");
					} else {
						this.getContent().removeAttribute(attr);
					}

					this.dispatchEvent(
						new CustomEvent(entry.isIntersecting ? "intersect" : "exit", {
							detail: { entry },
						}),
					);
				}
			},
			{ threshold: this.#threshold },
		);

		for (const trigger of this.getTrigger()) observer.observe(trigger);
	}
}
