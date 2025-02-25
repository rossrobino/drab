import { adapter } from "@domcojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { domco } from "domco";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		domco({
			adapter: adapter({ trailingSlash: true }),
		}),
	],
});
