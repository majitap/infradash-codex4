import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (https://majitap.github.io/infradash-codex4/)
  output: "export",
  basePath: "/infradash-codex4",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // cacheComponents / partialPrefetching (PPR) are not supported with output: "export"
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
