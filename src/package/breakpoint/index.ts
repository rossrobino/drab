import { Base } from "../base/index.ts";

/**
 * Displays the current breakpoint and `window.innerWidth`, based on the `breakpoints` provided. Defaults to [TailwindCSS breakpoint sizes](https://tailwindcss.com/docs/responsive-design).
 */
export class Breakpoint extends Base {
	breakpoints: { name: string; width: number }[] = [
		{ name: "sm", width: 640 },
		{ name: "md", width: 768 },
		{ name: "lg", width: 1024 },
		{ name: "xl", width: 1280 },
		{ name: "2xl", width: 1536 },
	];

	constructor() {
		super();

		this.breakpoints.sort((a, b) => b.width - a.width); // highest to lowest
	}

	/** finds the current breakpoint */
	get breakpoint() {
		for (let i = 0; i < this.breakpoints.length; i++) {
			const breakpoint = this.breakpoints.at(i);
			if (breakpoint) {
				if (window.innerWidth > breakpoint.width) {
					return breakpoint.name;
				}
			}
		}
		return "none";
	}

	connectedCallback() {
		const setHTML = () =>
			(this.content().innerHTML = `${this.breakpoint}:${window.innerWidth}`);

		setHTML();

		this.safeListener("resize", setHTML, window);
	}
}
