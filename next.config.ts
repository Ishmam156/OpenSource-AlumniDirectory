import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
    GOOGLE_SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL
  },
  // Enable static optimization where possible
  output: 'standalone',
  // Optimize images
  images: {
    domains: ['*'],
    minimumCacheTTL: 60
  },
  // Production source maps
  productionBrowserSourceMaps: false,
  eslint: {
    // This setting allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
