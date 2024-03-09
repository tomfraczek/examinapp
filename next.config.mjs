/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['assets-global.website-files.com', 'images.ctfassets.net'],
  },
};
module.exports = nextConfig;
