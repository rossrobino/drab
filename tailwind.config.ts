import type { Config } from "tailwindcss";
import { uico } from "uico";
import typography from "@tailwindcss/typography";

export default {
	plugins: [
		uico({
			colorFunction: "oklch",
			colorPalette: "oklch",
		}),
		typography,
	],
	content: ["./src/**/*.{html,js,ts}"],
} satisfies Config;
