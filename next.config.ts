import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: false,
  },

  typedRoutes: true,
};

export default nextConfig;
