/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.congress.gov", "www.govinfo.gov", "www.senate.gov"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
