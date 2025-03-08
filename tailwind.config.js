/** @type {import('tailwindcss').Config} */
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
    backgroundImage: {
      'hero-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ffffff' fill-opacity='0.1'/%3E%3Cpath d='M0 0h100v100H0zM25 25h50v50H25z' stroke='%23ffffff' stroke-opacity='0.2' stroke-width='2'/%3E%3C/svg%3E\")"
    },
  },
  plugins: [],
}