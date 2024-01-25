import { Base } from "../base/index.ts";

export type Breakpoints = { name: string; width: number }[];

/**
 * Displays the current breakpoint and `window.innerWidth`, based on the `breakpoints` provided. Defaults to [TailwindCSS breakpoint sizes](https://tailwindcss.com/docs/responsive-design).
 *
 * Provide alternate breakpoints by specifying `breakpoint` attributes:
 *
 * ```html
 * <drab-breakpoint breakpoint-name="400">
 * ```
 */
export class Breakpoint extends Base {
	breakpoints: Breakpoints = [
		{ name: "sm", width: 640 },
		{ name: "md", width: 768 },
		{ name: "lg", width: 1024 },
		{ name: "xl", width: 1280 },
		{ name: "2xl", width: 1536 },
	];

	constructor() {
		super();

		const custom: Breakpoints = [];

		for (const attributeName of this.getAttributeNames()) {
			if (attributeName.startsWith("breakpoint-")) {
				const [, ...name] = attributeName.split("-");
				if (name) {
					custom.push({
						name: name.join("-"),
						width: Number(this.getAttribute(attributeName)),
					});
				}
			}
		}

		if (custom.length) this.breakpoints = custom;

		// highest to lowest
		this.breakpoints.sort((a, b) => b.width - a.width);
	}

	/** finds the current breakpoint */
	get breakpoint() {
		for (let i = 0; i < this.breakpoints.length; i++) {
			const breakpoint = this.breakpoints[i];
			if (breakpoint) {
				if (window.innerWidth > breakpoint.width) {
					return breakpoint.name;
				}
			}
		}
		return "none";
	}

	mount() {
		const render = () =>
			(this.getContent().innerHTML = `${this.breakpoint}:${window.innerWidth}`);

		render();

		this.safeListener("resize", render, window);
	}
}
