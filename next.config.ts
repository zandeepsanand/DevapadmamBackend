import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.0.100", "192.168.0.101", "192.168.0.102", "192.168.0.*"],
};

export default nextConfig;


