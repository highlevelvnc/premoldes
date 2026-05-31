"use client";

import { useEffect } from "react";
import { initScrollReveal } from "@/lib/scrollReveal";

/**
 * Monta uma única vez os efeitos globais do site:
 * - scroll reveal (IntersectionObserver + fallback) para todos os [data-reveal]
 *
 * GSAP/ScrollTrigger são inicializados dentro de cada componente que precisa.
 */
export default function SiteEffects() {
  useEffect(() => {
    // pequeno atraso para garantir que o DOM das secções já montou
    const id = window.requestAnimationFrame(() => initScrollReveal());
    return () => window.cancelAnimationFrame(id);
  }, []);

  return null;
}
