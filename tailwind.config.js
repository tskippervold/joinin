/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/preline/preline.js",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: 'class', // Force light mode
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin')
  ],
}

