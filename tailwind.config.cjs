
module.exports = {
  // mode: "jit",
  content: [
   "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ABeeZeeRegular: ['ABeeZee-Regular'], 
      },
      colors: {
        primary: "#199A8E", 
        secondary: "#14171A",
      },
    },
  },
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
