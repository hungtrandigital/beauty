/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from design system
        navy: {
          DEFAULT: '#1A2B4A',
          dark: '#0F1A2E',
          light: '#2A3F5F',
        },
        teal: {
          DEFAULT: '#00A8A8',
          dark: '#008080',
          light: '#00D4D4',
        },
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#B8941F',
          light: '#E8C55A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

