import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* * Removing 'output: export' allows Next.js to run as a dynamic 
   * server, which is required for Sanity Studio and standard 
   * Next.js image optimization.
   */
  
  /* * If you need to keep trailingSlash for specific hosting needs 
   * (like S3/Cloudfront), you can keep it.
   */
  trailingSlash: true,
  
  /* * You can remove images.unoptimized once you remove output: 'export'
   * unless you specifically prefer the unoptimized behavior.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;