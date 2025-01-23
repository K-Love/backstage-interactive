/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backstageinteractive.com'], // Add any domains you'll be loading images from
    unoptimized: true,
  },
};

export default nextConfig;
