# Premolde Construções — Website

Landing page premium para a **Premolde Construções** — moradias modulares em
Light Steel Frame (Charneca de Caparica, Almada). One-page mobile-first com
foco em conversão por WhatsApp.

## Stack

- **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS 3**
- **GSAP** (ScrollTrigger) + **anime.js v4** para as animações
- `next/font` (Manrope · Work Sans · JetBrains Mono)

## Destaques

- **Hero** cinematográfico com parallax
- **Animação central** (`#construir`): maquete 3D isométrica em SVG de uma
  moradia LSF que se monta peça a peça com o scroll, com labels técnicos, e
  cross-fade para foto real
- **Modelos**, **slider de obras**, secção-declaração editorial, processo,
  sobre e contacto
- Scroll-reveal robusto (IntersectionObserver + fallback)

## Desenvolvimento

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Onde editar

Quase tudo está centralizado em **`src/lib/constants.ts`**:

- `WHATSAPP_URL` e `COMPANY` — número de WhatsApp e dados da empresa
- `MODELS` — gama de modelos (**áreas e preços são placeholders a confirmar com o cliente**)
- `PORTFOLIO`, `ADVANTAGES`, `BUILD_STEPS`, `STATS`, `FAQ`

Imagens: `public/ai/` (geradas) e `public/portfolio/` (fotos reais do cliente).
Cores da marca em `tailwind.config.ts` (`flame` = vermelho do logo).

## Deploy

Pronto para [Vercel](https://vercel.com/new). Build estático, sem variáveis de ambiente.
