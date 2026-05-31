"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const barColor = solid ? "bg-ink-900" : "bg-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-smooth ${
        scrolled || open
          ? "border-b border-ink-100 bg-concrete-50/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-px flex h-16 items-center justify-between lg:h-20">
        <a href="#top" aria-label="Premolde Construções — início" className="relative z-50">
          <Logo tone={solid ? "dark" : "light"} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                solid ? "text-ink-600 hover:text-ink-900" : "text-white/85 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            Pedir orçamento
          </a>
        </div>

        {/* botão mobile */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-0.5 w-6 ${barColor} transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 ${barColor} transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 ${barColor} transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* overlay mobile */}
      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-concrete-50 px-6 pt-24 transition-all duration-400 ease-smooth lg:hidden ${
          open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink-100 py-4 font-display text-2xl font-semibold tracking-tight text-ink-900"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="btn-primary mt-8 w-full text-base"
        >
          Pedir orçamento no WhatsApp
        </a>
      </div>
    </header>
  );
}
