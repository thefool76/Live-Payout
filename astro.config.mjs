import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

const lastModified = new Map([
  ["/", "2026-08-18"],
  ["/about/", "2026-08-18"],
  ["/changelog/", "2026-08-18"],
  ["/methodology/", "2026-08-18"],
  ["/privacy/", "2026-08-18"],
  ["/terms/", "2026-08-18"],
  ["/whatnot-high-value-order-fees/", "2026-08-18"],
  ["/whatnot-seller-fees/", "2026-08-18"],
]);

export default defineConfig({
  site: "https://livepayoutcalculator.com",
  output: "static",
  integrations: [sitemap({
    serialize(item) {
      const modified = lastModified.get(new URL(item.url).pathname);
      return modified ? { ...item, lastmod: modified } : item;
    },
  }), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
