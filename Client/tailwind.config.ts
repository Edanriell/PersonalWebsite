import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/entities/**/*.{js,ts,jsx,tsx}",
		"./src/next-pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/shared/**/*.{js,ts,jsx,tsx}",
		"./src/widgets/**/*.{js,ts,jsx,tsx}",
		"./src/features/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			backgroundImage: {
				"button-gradient": "linear-gradient(180deg, #1994ff 0%, #157cff 100%)"
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)"
			}
		}
	},
	plugins: []
} satisfies Config;
