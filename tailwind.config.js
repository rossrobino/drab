/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts,svx}"],
	theme: {
		borderColor: {
			DEFAULT: "#d4d4d4",
		},
		extend: {
			fontFamily: {
				antique: [
					"Superclarendon",
					"Bookman Old Style",
					"URW Bookman",
					"URW Bookman L",
					"Georgia Pro",
					"Georgia",
					"serif",
				],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
