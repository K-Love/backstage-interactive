import type { Config } from "tailwindcss";

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E3192',
        amber: '#F5A623',
        purple: '#8E44AD',
        magenta: '#EC008C',
        teal: '#16A085',
        yellow: '#FFD200',
        charcoal: '#4A4A4A',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        heading: ['Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}