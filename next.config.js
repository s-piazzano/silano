/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/silano',
  images: {
    domains: ["silano-3r.fra1.digitaloceanspaces.com"],
  },
};

module.exports = nextConfig;
