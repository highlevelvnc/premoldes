"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { PORTFOLIO } from "@/lib/constants";

export default function Portfolio() {
  const [i, setI] = useState(0);
  const infoRef = useRef<HTMLDivElement>(null);
  const n = PORTFOLIO.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);

  useEffect(() => {
    if (!infoRef.current) return;
    const els = infoRef.current.querySelectorAll<HTMLElement>("[data-anim]");
    animate(els, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 750,
      delay: stagger(70),
      ease: "outExpo",
    });
  }, [i]);

  const cur = PORTFOLIO[i];
  const pad = (v: number) => String(v + 1).padStart(2, "0");

  return (
    <section id="obras" className="bg-white py-24 lg:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>
              <span className="h-px w-8 bg-flame-500" />
              04 — Obras realizadas
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tightest text-ink-900 sm:text-4xl lg:text-5xl"
            >
              Casas reais, construídas por nós.
            </h2>
          </div>
          {/* setas (desktop) */}
          <div data-reveal className="hidden items-center gap-3 sm:flex">
            <SliderBtn dir="prev" onClick={() => go(-1)} />
            <SliderBtn dir="next" onClick={() => go(1)} />
          </div>
        </div>

        <div data-reveal className="mt-10 overflow-hidden rounded-2xl border border-ink-100 bg-ink-950">
          {/* palco da imagem */}
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            {PORTFOLIO.map((p, idx) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.title}
                fill
                sizes="100vw"
                priority={idx === 0}
                className={`object-cover transition-opacity duration-700 ease-smooth ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />

            {/* número grande + dots */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-7">
              <div ref={infoRef}>
                <span data-anim className="font-mono text-xs uppercase tracking-[0.2em] text-flame-300">
                  {cur.tag}
                </span>
                <h3 data-anim className="mt-1.5 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {cur.title}
                </h3>
                <p data-anim className="mt-1 text-sm text-white/70">
                  {cur.location} · {cur.area} m² · {cur.year}
                </p>
              </div>
              <div className="flex items-center gap-2 font-display font-bold text-white">
                <span className="text-2xl sm:text-3xl">{pad(i)}</span>
                <span className="text-sm text-white/50">/ {pad(n - 1)}</span>
              </div>
            </div>
          </div>

          {/* barra de controlo */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
            <div className="flex gap-2">
              {PORTFOLIO.map((p, idx) => (
                <button
                  key={p.src}
                  type="button"
                  aria-label={`Ver obra ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === i ? "w-8 bg-flame-500" : "w-2.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3 sm:hidden">
              <SliderBtn dir="prev" onClick={() => go(-1)} light />
              <SliderBtn dir="next" onClick={() => go(1)} light />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderBtn({
  dir,
  onClick,
  light = false,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Obra anterior" : "Obra seguinte"}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
        light
          ? "border-white/20 text-white hover:border-flame-500 hover:text-flame-400"
          : "border-ink-200 text-ink-700 hover:border-flame-500 hover:text-flame-500"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}
