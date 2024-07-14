import type { Config } from "tailwindcss";

export const config: Config = {
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
      animation: {
        "tracking-in-expand-fwd-top":
          "tracking-in-expand-fwd-top 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both",
        "bounce-in-top": "bounce-in-top 1.1s ease both",
        "roll-in-left": "roll-in-left 0.6s ease both",
        "fade-in-fwd":
          "fade-in-fwd 2.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
      keyframes: {
        "tracking-in-expand-fwd-top": {
          "0%": {
            "letter-spacing": "-.5em",
            transform: "translateZ(-700px) translateY(-500px)",
            opacity: "0",
          },
          "40%": {
            opacity: ".6",
          },
          to: {
            transform: "translateZ(0) translateY(0)",
            opacity: "1",
          },
        },
        "bounce-in-top": {
          "0%": {
            transform: "translateY(-500px)",
            "animation-timing-function": "ease-in",
            opacity: "0",
          },
          "38%": {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",
            opacity: "1",
          },
          "55%": {
            transform: "translateY(-65px)",
            "animation-timing-function": "ease-in",
          },
          "72%, 90%, to": {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",
          },
          "81%": {
            transform: "translateY(-28px)",
          },
          "95%": {
            transform: "translateY(-8px)",
            "animation-timing-function": "ease-in",
          },
        },
        "roll-in-left": {
          "0%": {
            transform: "translateX(-800px) rotate(-540deg)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0) rotate(0deg)",
            opacity: "1",
          },
        },
        "fade-in-fwd": {
          "0%": {
            transform: "translateZ(-80px)",
            opacity: "0",
          },
          to: {
            transform: "translateZ(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
