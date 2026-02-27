export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        orange: "#bb4500",
        white: "#ffffff",
        black: "#000000",
        gray: {
          light: "#dfc6c6",
          text: "#2c2c2c",
          input: "#f8dfdf",
        },
        brown: "#4b2008",
      },
      fontFamily: {
        sans: ["Oswald", "ui-sans-serif", "system-ui"],
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
        "3xl": "5rem",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
