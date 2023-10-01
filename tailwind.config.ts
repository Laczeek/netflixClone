import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: 'var(--font-roboto)',
			},
			fontSize: {
				sm: '1.4rem',
				md: '1.8rem',
				lg: '2.4rem',
				xl: '3.2rem',
				'2xl': '4.2rem',
				'4xl': '5.2rem'
			},
			colors: {
				'netflix-red': '#db0000',
				'netflix-gray': '#212121',
				'netflix-gray-light': '#313030',
				'gray-hover': '#4b4949',
			},
		},
	},
	plugins: [],
};
export default config;
