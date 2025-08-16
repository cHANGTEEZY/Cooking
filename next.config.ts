import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg"
      ),
    ],
  },
};

export default nextConfig;
