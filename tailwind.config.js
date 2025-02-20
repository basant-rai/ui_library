/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',  // Example primary color
        secondary: 'var(--secondary)',  // Example secondary color
        destructive: "var(--destructive)",
        input: "var(--input)",
        background: "var(--background)"
      },
    },
  },
  plugins: [],
};
