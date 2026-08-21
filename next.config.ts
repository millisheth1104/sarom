import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Local brand assets are pre-optimised in /public/media; keep formats modern.
    formats: ["image/webp"],
    deviceSizes: [360, 480, 768, 1024, 1280, 1440, 1600, 1920],
  },
};

export default nextConfig;
