/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
    colors:{
       violet:'#A069FF',
       primary: '#3CA19B',
       primaryLight: '#ABDFDC',
       bgColor: "#F5F5F5",
       primaryText: "#333333",
       secondaryText: "#555555",
       thirdText: "#222222",
       fourthText: '#6F6F6F',
       secondaryAction: "#FA8466",
       inputColor: '#D5D5D5',
       inputSecondary: '#cccccc',
       violetLight : '#C19DFF'
    }
    
    },
    fontFamily: {
      leaguespartan: ['League Spartan', 'sans-serif'],
      poppins: ["Poppins", 'sans-serif']
    },
  },
  plugins: [],
}