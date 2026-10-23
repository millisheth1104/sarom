import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Local brand assets are pre-optimised in /public/media; keep formats modern.
    formats: ["image/webp"],
    deviceSizes: [360, 480, 768, 1024, 1280, 1440, 1600, 1920],
  },
  // The thank-you page moved from /contact/thankyou to /thank-you (2026-10-23).
  // The old address was live, so it is redirected rather than dropped.
  async redirects() {
    return [
      { source: "/contact/thankyou", destination: "/thank-you", permanent: true },
    ];
  },
};

export default nextConfig;
