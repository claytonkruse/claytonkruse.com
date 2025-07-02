/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['sans-serif'],
			serif: ['Alice', 'serif'],
			mono: ['"Libertinus Mono"', 'monospace']
		}
	},
	plugins: []
};
