import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz do projeto (há um pnpm-lock.yaml na pasta-mãe que confundia o Turbopack)
  turbopack: { root: import.meta.dirname },
  // Imagens servidas como assets estáticos (já otimizadas em JPEG q82) →
  // 0 transformações de Image Optimization na Vercel, sem perda de qualidade.
  images: { unoptimized: true },
};

export default nextConfig;
