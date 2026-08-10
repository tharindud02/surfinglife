import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// TODO: replace with the production domain once confirmed, so canonical
// URLs and sitemap.xml entries resolve correctly.
const SITE_URL = "https://www.surfinglife.lk";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  integrations: [tailwind(), sitemap()],
  build: {
    // Keep CSS out of a separate render-blocking request for this small site.
    inlineStylesheets: "always",
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: "hover",
  },
  image: {
    // Allow the Google Maps embed / any future remote images without
    // widening this further than needed.
    domains: [],
  },
  vite: {
    build: {
      cssMinify: true,
      assetsInlineLimit: 2048,
    },
  },
});
