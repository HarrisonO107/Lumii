import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/privacy-policy", destination: "/legal/privacy-policy", permanent: true },
      { source: "/terms-of-service", destination: "/legal/terms-of-service", permanent: true },
    ];
  },
};

export default nextConfig;
