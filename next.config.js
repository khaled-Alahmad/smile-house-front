/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   scrollRestoration: true,
  // },
  images: {
    domains: [
      "smile-house.promotion22.com",
      "doctris-landing.vercel.app",
      "smilehouse.serv00.net",
    ],
  },
};

module.exports = nextConfig;
