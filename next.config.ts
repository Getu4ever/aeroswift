import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/foodmama-sitemap',
  trailingSlash: true, // Added to fix routing on static platforms
};

export default nextConfig;