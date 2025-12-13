/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true, // Disable Image Optimization API
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
