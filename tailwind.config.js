/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			serif: ['Alice', 'serif'],
			sans: ['sans-serif'],
			mono: ['"Libertinus Mono"', 'monospace']
		}
	},
	plugins: []
};
