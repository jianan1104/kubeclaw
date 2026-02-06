import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kubeclaw",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
