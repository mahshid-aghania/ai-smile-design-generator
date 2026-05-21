import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "smiledentalartscentre.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
