import colors from 'tailwindcss/colors';

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
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      violet: colors.violet,
      teal: colors.teal,
      neutral: colors.neutral,
      b: '#3f3cbb',
    },
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
      colors: {
        contrast1: '#17191C',
        contrast2: '#282b2e',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s',
        fadeIn1: 'fadeIn 1s',
        fadeIn2: 'fadeIn 2s',
        fadeIn3: 'fadeIn 3s',
        fadeIn5: 'fadeIn 5s',
        fadeIn7: 'fadeIn 7s',
      },
    },
  },
  plugins: [],
};
