/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {

    fontFamily: {
      sans: ['"Inter"', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Courier New"', 'monospace'],
    },
    extend: {
      colors: {
        gray: {
          10: '#F3F4F6',
          50: '#f7f8f9',
          100: '#e7eaee',
          150: '#E5E7EB',
          200: '#d0d6dd',
          300: '#b8c1cc',
          400: '#A0ADBB',
          500: '#64768B',
          600: '#4e5c6c',
          700: '#38424d',
          800: '#21272e',
          900: '#0b0d0f',
        },
        blue: {
          50: '#F5F9FF',
          100: '#e4f0ff',
          200: '#94c4ff',
          300: '#4398ff',
          400: '#006df2',
          500: '#003D87',
          600: '#002e65',
          700: '#001e44',
          800: '#000f22',
          900: '#000811',
        },
        orange: {
          50: '#fff6f4',
          100: '#ffeee9',
          200: '#ffd4c9',
          300: '#ffbba9',
          400: '#ffa288',
          500: '#FF5527',
          600: '#dc2f00',
          700: '#b82700',
          800: '#6e1700',
          900: '#250800',
        },
        yellow: {
          50: '#FFFBEB',
          500: '#F59E0B',
        },
        green: {
          50: '#DEFFE7',
          100: '#dcfce7',
          500: '#00D261',
          600: '#009E2C',
        },
        red: {
          50: '#FFF8F4',
          500: '#EF4444',
        },
      },
    },
  },
  plugins: [],
}

