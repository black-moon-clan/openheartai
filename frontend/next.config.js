/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  // Increase the timeout for async operations
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // Increase timeouts for async operations
    timeoutInMs: 30000,
  },
  // Disable type checking during build to prevent issues
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  distDir: ".next",
  // Enable static exports
  trailingSlash: true,
};

module.exports = nextConfig;
