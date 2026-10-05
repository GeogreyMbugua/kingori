import type { NextConfig } from "next";

// Set by the GitHub Pages workflow; local dev and server deployments keep the optimiser.
const staticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  typedRoutes: true,
  poweredByHeader: false,
  basePath,
  ...(staticExport ? { output: "export", trailingSlash: true } : {}),
  images: staticExport
    ? { loader: "custom", loaderFile: "./src/lib/image-loader.ts" }
    : { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
