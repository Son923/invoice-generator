/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Enable image optimization
  images: {
    domains: ['appwrite.1202design.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Enable compression
  compress: true,
  
  // Add trailing slash for better SEO
  trailingSlash: true,
  
  // Enable Vercel Analytics if available
  analyticsId: process.env.VERCEL_ANALYTICS_ID,
  
  // Optimize builds
  poweredByHeader: false,
  
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Add webpack configuration to optimize build
  webpack: (config, { isServer }) => {
    // Optimize build by excluding large dependencies from server bundle
    if (isServer) {
      config.externals = [...config.externals, 'jspdf'];
    }

    // Increase memory limit for webpack
    config.performance = {
      ...config.performance,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    return config;
  },

  // Optimize build output
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

module.exports = nextConfig 