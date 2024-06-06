/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["smile-house.promotion22.com", "doctris-landing.vercel.app"],
  },
};
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
