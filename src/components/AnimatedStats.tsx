"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

type Item = { to: number; suffix?: string; label: string };

/**
 * Contadores que correm de 0 até ao valor real quando entram no ecrã (anime.js).
 * Falha-aberta: o markup já mostra o valor final, o efeito só anima a partir do 0.
 */
export default function AnimatedStats({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      nums.forEach((el) => {
        const target = Number(el.dataset.count || "0");
        const obj = { v: 0 };
        animate(obj, {
          v: target,
          duration: 1700,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // mantém valores finais do markup

    nums.forEach((el) => (el.textContent = "0"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(root);
    const fb = window.setTimeout(run, 3500);

    return () => {
      io.disconnect();
      window.clearTimeout(fb);
    };
  }, []);

  return (
    <dl ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label}>
          <dt className="font-display text-4xl font-extrabold tracking-tight text-ink-900 lg:text-5xl">
            <span data-count={s.to}>{s.to}</span>
            <span className="text-flame-500">{s.suffix}</span>
          </dt>
          <dd className="mt-2 text-sm leading-snug text-ink-500">{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
