/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'heroBlack': "url('../public/assets/dark_02.png')",
        'heroWhite': "url('../public/assets/light_02.png')",
        'heroPurple': "url('../public/assets/abstract-3840x2160-colorful-4k-24048.jpg')",
      },
    },
  },
  plugins: [],
}

