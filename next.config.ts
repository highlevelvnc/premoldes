import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do projeto (há um pnpm-lock.yaml na pasta-mãe que confundia o Turbopack)
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
