import { ADVANTAGES } from "@/lib/constants";

export default function Advantages() {
  return (
    <section id="vantagens" className="relative bg-concrete-50 py-24 lg:py-32">
      <div className="container-px">
        <div className="max-w-2xl">
          <p className="eyebrow" data-reveal>
            <span className="h-px w-8 bg-flame-500" />
            01 — Porquê Light Steel Frame
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tightest text-ink-900 sm:text-4xl lg:text-5xl"
          >
            A engenharia certa para a casa que vai durar uma vida.
          </h2>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-ink-500">
            O Light Steel Frame é o standard das construções modernas: rápido,
            eficiente e preciso ao milímetro. Construímos a seco, com aço
            galvanizado e materiais certificados.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-100 bg-ink-100 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((a, i) => (
            <div
              key={a.no}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
              className="group relative bg-concrete-50 p-7 transition-colors duration-300 hover:bg-white lg:p-9"
            >
              <span className="font-mono text-sm text-flame-500">{a.no}</span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink-900">
                {a.title}
              </h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">{a.text}</p>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-flame-500 transition-all duration-500 ease-smooth group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
