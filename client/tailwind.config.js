/** @type {import('tailwindcss').Config} */
export default {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    screens: {
      'default': '0px',  // => @media (min-width:  0px) { ... }
      'sm-tablet': '555px',   
      'tablet': '845px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    boxShadow: {
      'fading': '0 0 20px rgba(0, 0, 0, 0.08), 0 0 40px rgba(0, 0, 0, 0.03), 0 0 60px rgba(0, 0, 0, 0.02), 0 0 80px rgba(0, 0, 0, 0.01)',
    },
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }