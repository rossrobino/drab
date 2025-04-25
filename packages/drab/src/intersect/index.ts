import {
	Content,
	Lifecycle,
	Trigger,
	type BaseAttributes,
} from "../base/index.js";

export type IntersectAttributes = BaseAttributes & { threshold?: number };

type IntersectCallback = () => any;

/**
 * Uses the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to add a `data-intersect` attribute to `content` when the `trigger` is intersecting.
 *
 * Use `onIntersect` and `onExit` to customize further with JavaScript.
 *
 * ### Attributes
 *
 * `threshold`
 *
 * Specify a `threshold` between `0` and `1` to determine how much of the `trigger` should be visible for the intersection to occur.
 */
export class Intersect extends Lifecycle(Trigger(Content())) {
	/** Functions to run when the `trigger` intersects. */
	#intersectCallbacks: Array<IntersectCallback> = [];

	/** Functions to run when the `trigger` exits. */
	#exitCallbacks: Array<IntersectCallback> = [];

	constructor() {
		super();
	}

	/**
	 * How much of the `trigger` should be visible for the intersection to occur. For example, given a threshold of `.5`, the intersection would occur when the `trigger` is 50% visible.
	 *
	 * @default 0
	 */
	get #threshold() {
		return Number(this.getAttribute("threshold") ?? 0);
	}

	/**
	 * @param callback Runs when `trigger` intersects.
	 */
	onIntersect(callback: IntersectCallback) {
		this.#intersectCallbacks.push(callback);
	}

	/**
	 * @param callback Runs when `trigger` exits.
	 */
	onExit(callback: IntersectCallback) {
		this.#exitCallbacks.push(callback);
	}

	override mount() {
		const observer = new IntersectionObserver(
			(entries) => {
				/** Attribute to add or remove from `content`. */
				const attr = "data-intersect";

				for (const entry of entries) {
					if (entry.isIntersecting) {
						this.getContent().setAttribute(attr, "");

						for (const callback of this.#intersectCallbacks) {
							callback();
						}
					} else {
						this.getContent().removeAttribute(attr);

						for (const callback of this.#exitCallbacks) {
							callback();
						}
					}
				}
			},
			{ threshold: this.#threshold },
		);

		for (const trigger of this.getTrigger()) {
			observer.observe(trigger);
		}
	}
}
