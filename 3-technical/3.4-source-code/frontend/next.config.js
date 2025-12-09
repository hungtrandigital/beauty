/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable standalone output for Docker
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // PWA support
  // [GUESS: PWA configuration - can be enhanced later]
};

module.exports = nextConfig;

