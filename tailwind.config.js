/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        green: {
          DEFAULT: '#4CAF50', // Highlighted sections and buttons
          light: '#A5D6A7', // Selected options
          pastel: '#D0E8D8', // Product image background
        },
        gray: {
          light: '#F0F0F0', // Input fields and unselected options
          medium: '#CCCCCC', // Dividers and borders
          dark: '#666666', // Dark gray text
          sidebar: '#E0E0E0', // Sidebar background
        },
      },
    },
  },
  plugins: [],
}