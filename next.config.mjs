/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/webp'],
    deviceSizes: [375, 640, 828, 1080, 1280],
    imageSizes: [64, 128, 256, 384, 560],
  },
};

export default nextConfig;
