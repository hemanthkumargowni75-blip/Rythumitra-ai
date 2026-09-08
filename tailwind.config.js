/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          50: '#f2f9f0',
          100: '#e1f2dd',
          200: '#c4e6bc',
          300: '#9bd28e',
          400: '#6eb85f',
          500: '#4c9b3c',
          600: '#3a7d2e',
          700: '#2f6327',
          800: '#294f23',
          900: '#23421f',
        },
        earth: {
          50: '#fbf7ee',
          100: '#f4ebd8',
          200: '#e8d4af',
          300: '#dab881',
          400: '#ce9f5a',
          500: '#bf843e',
          600: '#a76a32',
          700: '#84502b',
          800: '#6c4128',
          900: '#593623',
        },
      },
      fontFamily: {
        telugu: ['var(--font-telugu)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
