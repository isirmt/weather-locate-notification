import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["tabler"]),
    }),
    require("tailwind-scrollbar")
  ],
} satisfies Config;
