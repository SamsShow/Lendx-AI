/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["via.placeholder.com"],
  },
  // Enable the following if the app accesses external APIs
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://external-api.com/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
