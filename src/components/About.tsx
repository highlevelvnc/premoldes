import Image from "next/image";
import { COMPANY } from "@/lib/constants";
import AnimatedStats from "./AnimatedStats";

const SERVICES = ["Construção de moradias", "Reabilitações", "Remodelações"];

const ABOUT_STATS = [
  { to: COMPANY.yearsExperience, suffix: "", label: "anos de experiência" },
  { to: 180, suffix: "", label: "dias até à chave na mão" },
  { to: 5, suffix: "", label: "anos de garantia estrutural" },
  { to: 100, suffix: "%", label: "construção a seco (LSF)" },
];

export default function About() {
  return (
    <section id="sobre" className="bg-concrete-50 py-24 lg:py-32">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal data-reveal-dir="left" className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-cardlg">
              <Image
                src="/portfolio/casa3.jpeg"
                alt="Moradia em LSF construída pela Premolde Construções"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-xl border border-ink-100 bg-white px-5 py-4 shadow-cardlg sm:-right-5">
              <span className="block font-mono text-xs uppercase tracking-[0.2em] text-flame-500">
                Chave na mão
              </span>
              <span className="mt-1 block font-display text-lg font-bold text-ink-900">
                Engenharia + Arquitetura
              </span>
            </div>
          </div>

          <div>
            <p className="eyebrow" data-reveal>
              <span className="h-px w-8 bg-flame-500" />
              05 — Sobre a Premolde
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-3xl font-extrabold leading-[1.06] tracking-tightest text-ink-900 sm:text-4xl lg:text-[2.75rem]"
            >
              {COMPANY.yearsExperience} anos a construir casas no concelho de Almada.
            </h2>
            <p data-reveal className="mt-5 text-lg leading-relaxed text-ink-500">
              A Premolde Construções é especialista em Light Steel Frame na
              Charneca de Caparica. Tratamos de tudo — do projeto de engenharia e
              arquitetura à entrega chave na mão — com orçamento e prazo fechados.
            </p>

            <ul data-reveal className="mt-6 flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-ink-200 bg-white px-4 py-1.5 text-sm font-medium text-ink-700"
                >
                  {s}
                </li>
              ))}
            </ul>

            <p data-reveal className="mt-6 text-ink-500">
              Marque uma visita a uma das nossas obras — em curso ou já entregue.
            </p>

            <div data-reveal className="mt-10 border-t border-ink-200 pt-10">
              <AnimatedStats items={ABOUT_STATS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
