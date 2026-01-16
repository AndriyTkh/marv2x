import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true, // Cloudflare Pages requires unoptimized images
  },

  typedRoutes: true,

  // Output standalone for better Cloudflare compatibility
  output: 'standalone',
};

export default nextConfig;
