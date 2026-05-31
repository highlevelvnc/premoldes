"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHATSAPP_URL, STATS, COMPANY } from "@/lib/constants";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = root.current;
    if (!ctx) return;

    // ---- Entrada com anime.js (stagger das linhas + elementos) ----
    const targets = ctx.querySelectorAll<HTMLElement>("[data-hero]");
    targets.forEach((t) => (t.style.opacity = "0"));
    const anim = animate(targets, {
      opacity: [0, 1],
      translateY: [34, 0],
      duration: 1100,
      delay: stagger(110, { start: 150 }),
      ease: "outExpo",
    });

    // ---- Parallax suave da imagem (GSAP scrub) ----
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.to(imageWrap.current, {
        yPercent: 14,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ctx,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      return () => tween.kill();
    });

    return () => {
      anim.revert?.();
      mm.revert();
    };
  }, []);

  return (
    <section ref={root} id="top" className="relative flex min-h-[92svh] items-center overflow-hidden">
      {/* imagem de fundo */}
      <div ref={imageWrap} className="absolute inset-0 -z-10 will-change-transform">
        <Image
          src="/ai/hero.jpg"
          alt="Moradia moderna em Light Steel Frame construída pela Premolde"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/55 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/30" />
      </div>

      <div className="container-px w-full pb-16 pt-28 lg:pt-32">
        <div className="max-w-3xl">
          <p data-hero className="eyebrow !text-flame-300">
            <span className="h-px w-8 bg-flame-400" />
            Light Steel Frame · {COMPANY.region}
          </p>

          <h1
            data-hero
            className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tightest text-white sm:text-6xl lg:text-7xl"
          >
            Casas modernas,
            <br />
            construídas <span className="text-flame-500">a seco</span>
            <br />e chave na mão.
          </h1>

          <p data-hero className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            Moradias modulares em Light Steel Frame com orçamento e prazo
            fechados. {COMPANY.yearsExperience} anos a construir no concelho de
            Almada — com garantia estrutural de 5 anos.
          </p>

          <div data-hero className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base">
              Pedir orçamento grátis
            </a>
            <a href="#modelos" className="btn-ghost !border-white/25 !bg-white/10 text-base !text-white hover:!bg-white/20">
              Ver modelos
            </a>
          </div>

          {/* stats */}
          <dl data-hero className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l border-white/20 pl-4">
                <dt className="font-display text-2xl font-bold text-white lg:text-3xl">
                  {s.value}
                  <span className="text-flame-400">{s.suffix}</span>
                </dt>
                <dd className="mt-1 text-xs leading-snug text-white/55">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* indicador de scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <span className="h-10 w-px animate-draw-tip bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
