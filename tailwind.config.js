export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E10600",
        dark: "#0A0A0A",
        metallic: "#2C2C2C",
        ice: "#F5F5F5",
        blue: "#00ADEF",
      },
      fontFamily: {
        f1: ["F1 Regular", "sans-serif"],
        "f1-bold": ["F1 Bold", "sans-serif"],
        "f1-bold-web": ["F1 Bold Web", "sans-serif"],
        "f1-black": ["F1 Black", "sans-serif"],
        "f1-italic": ["F1 Italic", "sans-serif"],
        "f1-wide": ["F1 Wide", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
