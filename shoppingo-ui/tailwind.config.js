/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      vs: '280px',
      xs:'375px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors:{
        bgColor:'#fff8f0',
        textColor:'#111D4A',
        textColor2:'#886918',
        effectColor:'#d7271a',
        shadowColor:'#9ca3af',
        gradientFrom:'rgb(17,29,74)',
        gradientTo:'rgb(187,43,43)',
        darkBgColor:'#000000',
        darkTextColor:"white",
        darkTextColor2:'#d7271a',
      },
    },
  },
  plugins: [],
}
