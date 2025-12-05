import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: false,
  },

  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
