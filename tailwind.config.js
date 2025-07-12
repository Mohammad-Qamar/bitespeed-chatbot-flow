/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',     // Blue-600
        danger: '#dc2626',      // Red-600
        success: '#16a34a',     // Green-600
        whatsapp: '#25D366',
        nodeHeader: '#ccfbf1',  // Teal-100
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        node: '0 2px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
