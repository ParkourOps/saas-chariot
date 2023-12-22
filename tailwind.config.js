/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    /*
      See:
      - https://daisyui.com/docs/colors/
      - https://daisyui.com/docs/themes/
    */
    themes: [
      {
        // https://coolors.co/153243-2d6286-f26419-f5f8ff-ece6df-bee0f4
        mytheme: {
          "primary": "#153243",
          "secondary": "#2D6286",
          "accent": "#F26419",
          "neutral": "#F5F8FF",
          "base-100": "#ECE6DF",
          "info": "#BEE0F4",
          "success": "#C3F48A",
          "warning": "#FFBF80",
          "error": "#FF7A66",
        },
      },      
    ]
  }    
}

