module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../public/concert2.jpg')",
      },
      fontFamily: {
        'concert-title': ['Oswald', 'sans-serif'],
        'concert-body': ['Roboto', 'sans-serif'],
        'concert-description': ['Lora', 'serif'],
        'concert-subtitle': ['Montserrat', 'sans-serif'],
      },
      height: {
        '1/2-screen': '50vh',
      },
      colors: {
        'concert-bg-beige': '#FAF0E6',
        'gray-800': '#2D3748',
        'light-blue': '#3B82F6',
        'pure-blue': '#0000FF',
        'error-red': '#b71c1c',
        'white': '#ffffff',
        'black': '#000000',
        'custom-yellow-500': '#FCD34D',
        'custom-gray': '#f0f0f0',
        'border-gray': '#D1D5DB',
        'bg-green-300':'#9AE3B2',
        'text-green-500':'#22c55e',
        'text-gray-400':'#9ca3af'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
