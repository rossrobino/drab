import typography from "@tailwindcss/typography";
import { uico } from "uico";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	plugins: [typography, uico],
};
