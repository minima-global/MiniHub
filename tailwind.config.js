/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '390px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'hero': "url('../assets/background.jpg')",
        'thumbnail-minima': "url('../assets/thumbnails/minima.png')",
        'thumbnail-liquid': "url('../assets/thumbnails/liquid.png')",
        'thumbnail-mountains': "url('../assets/thumbnails/mountains.png')",
        'thumbnail-desert': "url('../assets/thumbnails/desert.png')",
        'thumbnail-galaxy': "url('../assets/thumbnails/galaxy.png')",
        'thumbnail-feather': "url('../assets/thumbnails/feather.png')",
      },
    },
  },
  plugins: [],
}

