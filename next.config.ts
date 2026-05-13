import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export для деплоя на Nic.ru shared
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
