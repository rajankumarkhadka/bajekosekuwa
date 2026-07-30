import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
          protocol: 'https',
          hostname: 'auth.bajekoshop.com',
        },
      {
        protocol: 'https',
        hostname: 'cms.bajekoshop.com',
      },
      {
        protocol: 'https',
        hostname: 'bajekoshop.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
