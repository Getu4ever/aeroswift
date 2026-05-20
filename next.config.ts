import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* * 'export' allows the app to be deployed as a static site.
   * Note: This disables features like Image Optimization and API routes.
   */
  output: 'export',
  
  /* * images.unoptimized is required when output: 'export' 
   * because the standard Next.js image optimizer requires a running server.
   */
  images: {
    unoptimized: true,
  },
  
  /* * trailingSlash: true ensures that routes like /booking/ 
   * are generated as /booking/index.html, which is essential 
   * for reliable routing on static hosting platforms.
   */
  trailingSlash: true,
  
  /* * Note: Ensure 'basePath' matches your repository name if 
   * you are deploying to GitHub Pages (e.g., '/aeroswift').
   * For Vercel root-domain deployments, you can remove or comment this out.
   */
  // basePath: '/aeroswift', 
};

export default nextConfig;