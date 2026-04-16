import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.jdmagicbox.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "cdn.confident-group.com",
      },
    ],
  },
  // Allows the mobile device to access the dev server without having Next.js block cross-origin JS chunks / HMR
  allowedDevOrigins: ["localhost", "192.168.0.101"],
};

export default nextConfig;
