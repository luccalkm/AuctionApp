/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true
  // },
  images: {
    remotePatterns: [{ hostname: "cdn.pixabay.com" }],
  },
};

module.exports = nextConfig;
