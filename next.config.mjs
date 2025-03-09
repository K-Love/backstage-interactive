/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backstageinteractive.com'], // Add any domains you'll be loading images from
  },
  env: {
    GOOGLE_PAGESPEED_API_KEY: process.env.GOOGLE_PAGESPEED_API_KEY,
  },
};

export default nextConfig;
