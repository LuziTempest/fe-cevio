// tailwind.config.ts — tambahkan bagian `extend` berikut ke config yang sudah ada

import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        ticker: "ticker 22s linear infinite",
        blink: "blink 0.9s steps(1) infinite",
      },
    },
  },
};

export default config;
