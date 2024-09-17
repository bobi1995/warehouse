import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: {
          100: "#BC2227",
          200: "#E7878C",
        },
        btn_green: {
          hover: "#AFE1AF",
          normal: "#50C878",
        },
        btn_red: {
          hover: "#ff9999",
          normal: "#cc0000",
        },
      },
    },
  },
  plugins: [],
};
export default config;
