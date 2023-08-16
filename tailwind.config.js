/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts,svx}"],
	theme: {
		borderColor: {
			DEFAULT: "#d4d4d4",
		},
		extend: {},
	},
	plugins: [require("@tailwindcss/typography")],
};
