import { Base } from "../base/index.ts";
import { prefersReducedMotion } from "./prefersReducedMotion/index.ts";

/**
 * The `Animate` base class provides a declarative way to use the
 * [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
 * through HTML attributes. The `animateElement` method uses these attributes and
 * persists the final animation state. Other elements in **drab** extend this class
 * to provide animations. You can also extend this class to create your own custom
 * animated element.
 *
 * Keyframes can be set via HTML attributes on the element in the form of:
 *
 * ```html
 * <drab-animate animation-keyframe-offset-property="value">
 * ```
 *
 * Animations options can also be set:
 *
 * ```html
 * <drab-animate animation-option-property="value">
 * ```
 */
export class Animate extends Base {
	constructor() {
		super();
	}

	/**
	 * @returns An object containing the values of each `animation-option` attribute
	 */
	get animationOptions() {
		const options: KeyframeAnimationOptions = {};
		for (const attributeName of this.getAttributeNames()) {
			if (attributeName.startsWith("animation-option-")) {
				const value = this.getAttribute(attributeName);
				let [, , option] = attributeName.split("-");
				if (value) {
					if (option === "duration" || option === "delay") {
						options[option] = Number(value);
					} else if (option === "easing") {
						options[option] = value;
					}
				}
			}
		}
		return options;
	}

	/**
	 * @description
	 * Animates a particular element using the web animations API.
	 *
	 * - Disables animation if the user prefers reduced motion.
	 * - Sets default options
	 * - Uses the keyframes provided from `this.keyframes`
	 * - Waits for the animation to complete
	 * - Sets the start and end styles based on the first and last keyframe
	 *
	 * @param animateOptions - animates `this.content()` by default
	 */
	async animateElement(
		animateOptions: {
			element?: HTMLElement;
			options?: KeyframeAnimationOptions;
		} = { element: this.content(), options: {} },
	) {
		let { element = this.content(), options = {} } = animateOptions;

		const keyframes = this.keyframes;

		if (keyframes.length && !prefersReducedMotion()) {
			// options passed in via JS override the html attributes
			options = Object.assign(this.animationOptions, options);

			// defaults
			if (!options.duration) options.duration = 200;
			if (!options.easing) options.easing = "ease-in-out";

			let startStyles = keyframes.at(0);
			let endStyles = keyframes.at(-1);

			if (startStyles && endStyles) {
				// Don't modify the start/end style based on these,
				// everything else is a CSS property.
				// This is instead of doing `fill` since it is discouraged:
				// https://www.w3.org/TR/web-animations-1/#fill-behavior
				const notStyles = ["composite", "easing", "offset"];

				for (const key of notStyles) {
					delete startStyles[key];
					delete endStyles[key];
				}
			}

			if (options.direction?.includes("reverse")) {
				// swap the start and ending values
				[startStyles, endStyles] = [endStyles, startStyles];
			}

			Object.assign(element.style, startStyles);

			const animation = element.animate(keyframes, options);

			await animation.finished;

			Object.assign(element.style, endStyles);
		}
	}

	get keyframes(): Keyframe[] {
		const keyframes: Keyframe[] = [];

		for (const attributeName of this.getAttributeNames()) {
			/** the css property value, ex: "translate(100%,0)" */
			const value = this.getAttribute(attributeName);

			let [, , offset, ...propertyArray] = attributeName.split("-");

			if (attributeName.startsWith("animation-keyframe-")) {
				const property = propertyArray
					.map((v, i) => {
						if (i < 1) return v;
						return v.at(0)?.toUpperCase() + v.slice(1);
					})
					.join("");

				if (offset && property) {
					if (offset === "from") offset = "0";
					else if (offset === "to") offset = "1";
					else offset = String(parseInt(offset) * 0.01);

					const numberOffset = Number(offset);

					const sameOffsetKeyframe = keyframes.find(
						(v) => v.offset === numberOffset,
					);

					if (sameOffsetKeyframe) {
						sameOffsetKeyframe[property] = value;
					} else {
						keyframes.push({
							[property]: value,
							offset: numberOffset,
						});
					}
				}
			}
		}

		keyframes.sort((a, b) => Number(a.offset) - Number(b.offset));

		return keyframes;
	}
}
