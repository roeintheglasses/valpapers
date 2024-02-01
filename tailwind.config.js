/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{jsx,ts,tsx}", "./components/**/*.{jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        gray: {
          0: "#fff",
          100: "#fafafa",
          200: "#eaeaea",
          300: "#999999",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#222222",
          900: "#000000",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        poppins: [
          "Poppins",
          "Poppins-Bold",
          "Poppins-Light",
          "Poppins-SemiBold",
          "Poppins-Black",
        ],
        valo: ["Valo"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
