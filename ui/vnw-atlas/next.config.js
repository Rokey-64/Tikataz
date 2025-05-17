const withBundleAnalyzer = require('@next/bundle-analyzer');  // Sử dụng require thay vì import
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
//   staticPageGenerationTimeout: 3000,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  // output: 'standalone'
};

module.exports = withNextIntl(nextConfig);
