import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import { uico } from "uico";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	plugins: [
		typography,
		uico({
			colorPalette: "oklch",
			colorFunction: "oklch",
		}),
	],
} satisfies Config;
