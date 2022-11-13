function withOpacity(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}

let path = require("path");
function resolvePackages(...packages) {
  return packages.map((pkg) =>
    path.join(__dirname, "../../packages", pkg, "/**/*.{js,ts,jsx,tsx}")
  );
}

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    ...resolvePackages("/react-commons"),
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6EFFD",
          100: "#C1D7F9",
          200: "#97BDF6",
          300: "#6DA3F2",
          400: "#4E8FEF",
          500: "#2F7BEC",
          600: "#2A73EA",
          700: "#2368E7",
          800: "#1D5EE4",
          900: "#124BDF",
        },
        gray: {
          50: "#F9F9F9",
          100: "#F5F6F7",
          200: "#F5F5F5",
          300: "#EEEEEE",
          400: "#CCD4DB",
          500: "#A3AFBF",
          600: "#657180",
          700: "#4E555E",
          800: "#2A2E33",
          900: "#101214",
        },
        secondary: withOpacity("--color-secondary"),
        "secondary-hover": withOpacity("--color-secondary-hover"),
        "bg-1": withOpacity("--color-bg-1"),
        "bg-2": withOpacity("--color-bg-2"),
        "dark-bg": "#0C0D0E",
        "light-bg": "#171B1D",
        "modal-bg": "#212628",
        error: "#F06163",
        success: "#23C7A4",
        warning: "#FFC155",
        "text-theme": withOpacity("--color-text-theme"),
        "text-theme-alt": withOpacity("--color-text-theme-alt"),
        tertiary: withOpacity("--color-tertiary"),
        "tertiary-dark": withOpacity("--color-tertiary-dark"),
        iris: withOpacity("--color-iris"),
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      backgroundImage: {
        conic: "conic-gradient(var(--tw-gradient-stops))",
        "conic-to-t": "conic-gradient(at top, var(--tw-gradient-stops))",
        "conic-to-b": "conic-gradient(at bottom, var(--tw-gradient-stops))",
        "conic-to-l": "conic-gradient(at left, var(--tw-gradient-stops))",
        "conic-to-r": "conic-gradient(at right, var(--tw-gradient-stops))",
        "conic-to-tl": "conic-gradient(at top left, var(--tw-gradient-stops))",
        "conic-to-tr": "conic-gradient(at top right, var(--tw-gradient-stops))",
        "conic-to-bl":
          "conic-gradient(at bottom left, var(--tw-gradient-stops))",
        "conic-to-br":
          "conic-gradient(at bottom right, var(--tw-gradient-stops))",
      },
      screens: {
        "3xl": "1920px",
        "4xl": "2400px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
