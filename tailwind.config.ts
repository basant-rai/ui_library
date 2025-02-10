import type { Config } from "tailwindcss";

// 
export default {
	// darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			screens: {
				'2xl': '1440px'
			},
			padding: '4px'
		},
		fontWeight: {
			'400': '400',
			'500': '500',
			'600': '600',
			'700': '700',
			'800': '800'
		},
		fontFamily: {
			cabin: 'Cabin'
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)'
				},
				secondary: {
					DEFAULT: 'var(--secondary)'
				},
				tertiary: {
					DEFAULT: 'var(--tertiary)'
				}
			}
		}
	},
	plugins: [],
} satisfies Config;