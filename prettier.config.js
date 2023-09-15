import config from "robino/config/prettier";

/** @type {import("prettier").Config} */
export default {
	...config,
	plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	overrides: [
		{
			files: "*.svelte",
			options: {
				parser: "svelte",
			},
		},
	],
};
