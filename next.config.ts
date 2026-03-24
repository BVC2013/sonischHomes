import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.simplyrets.com",
      },
      {
        protocol: "https",
        hostname: "**.mlsgrid.com",
      },
      {
        protocol: "https",
        hostname: "**.mredllc.com",
      },
      {
        protocol: "http",
        hostname: "**.simplyrets.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
