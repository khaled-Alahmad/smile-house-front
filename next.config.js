/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["smile-house.promotion22.com", "doctris-landing.vercel.app","smilehouse.serv00.net"],
  },
};
module.exports = {
  env: {
    TWILIO_ACCOUNT_SID: process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN,
  },
};

module.exports = nextConfig;
