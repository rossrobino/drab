import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import typography from "@tailwindcss/typography";
import { uico } from "uico";

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [
				tailwindcss({
					content: ["./src/**/*.{html,js,svelte,ts}"],
					plugins: [typography, uico],
				}),
				autoprefixer(),
			],
		},
	},
});
