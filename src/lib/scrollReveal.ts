/**
 * Scroll reveal robusto: visible-by-default + IntersectionObserver + fallback.
 *
 * - No mount marca todos os [data-reveal] como data-revealed="false" (CSS esconde).
 * - O IntersectionObserver flipa para "true" quando entram no viewport.
 * - Um setTimeout de 3500ms força TODOS a "true", mesmo que o IO não dispare
 *   (headless browsers, tabs em background, falhas silenciosas do IO).
 *
 * Garante que a página NUNCA fica em branco.
 */
export function initScrollReveal(): () => void {
  if (typeof window === "undefined") return () => {};

  const els = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]")
  );

  // Sem suporte a IO ou reduced-motion → mostrar tudo já.
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.setAttribute("data-revealed", "true"));
    return () => {};
  }

  els.forEach((el) => {
    if (!el.hasAttribute("data-revealed")) {
      el.setAttribute("data-revealed", "false");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).setAttribute("data-revealed", "true");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  els.forEach((el) => observer.observe(el));

  // Fallback absoluto: força tudo visível ao fim de 3.5s.
  const fallback = window.setTimeout(() => {
    els.forEach((el) => el.setAttribute("data-revealed", "true"));
  }, 3500);

  return () => {
    observer.disconnect();
    window.clearTimeout(fallback);
  };
}
