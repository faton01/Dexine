import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (there is an unrelated package-lock.json in the home folder).
  outputFileTracingRoot: process.cwd(),
  images: {
    // High-resolution artwork: serve modern formats at large widths.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560, 3200],
    // Instagram CDN images for the optional live feed.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
