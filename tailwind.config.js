/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'locked',
    'bg-minima',
    'bg-feather',
    'bg-liquid',
    'bg-thumbnail-minima',
    'bg-thumbnail-liquid',
    'bg-thumbnail-mountains',
    'bg-thumbnail-desert',
    'bg-thumbnail-galaxy',
    'bg-thumbnail-feather',
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
        minima: "url('../assets/wallpapers/minima.jpg')",
        feather: "url('../assets/wallpapers/feather.jpg')",
        liquid: "url('../assets/wallpapers/liquid.jpg')",
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
};
