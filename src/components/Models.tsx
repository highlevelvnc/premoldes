import Image from "next/image";
import { MODELS, WHATSAPP_URL } from "@/lib/constants";

export default function Models() {
  return (
    <section id="modelos" className="bg-concrete-50 py-24 lg:py-32">
      <div className="container-px">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow" data-reveal>
              <span className="h-px w-8 bg-flame-500" />
              03 — Modelos
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tightest text-ink-900 sm:text-4xl lg:text-5xl"
            >
              Modelos prontos a adaptar ao seu terreno.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-ink-500">
            Pontos de partida — adaptamos plantas, áreas e acabamentos ao seu
            gosto. Valores chave na mão, a partir de.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MODELS.map((m, i) => (
            <article
              key={m.name}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 4) * 70}ms` }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-cardlg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={m.image}
                  alt={`Modelo ${m.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-3 py-1 font-mono text-xs font-medium text-white backdrop-blur">
                  {m.type} · {m.floors}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-bold tracking-tight text-ink-900">
                  Modelo {m.name}
                </h3>

                <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink-500">
                  <div className="flex items-baseline gap-1.5">
                    <dt className="font-mono text-xs text-ink-400">área</dt>
                    <dd className="font-medium text-ink-700">{m.area} m²</dd>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <dt className="font-mono text-xs text-ink-400">quartos</dt>
                    <dd className="font-medium text-ink-700">{m.bedrooms}</dd>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <dt className="font-mono text-xs text-ink-400">wc</dt>
                    <dd className="font-medium text-ink-700">{m.baths}</dd>
                  </div>
                </dl>

                <ul className="mt-4 space-y-1.5">
                  {m.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-ink-500">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-flame-500" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-end justify-between border-t border-ink-100 pt-4">
                  <div>
                    <span className="block font-mono text-xs text-ink-400">desde</span>
                    <span className="font-display text-lg font-bold text-ink-900">
                      {m.from}€
                    </span>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pedir orçamento do modelo ${m.name}`}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-ink-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-flame-500"
                  >
                    Orçamento
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-8 text-center text-sm text-ink-400">
          * Áreas e valores indicativos para configuração base. Confirmamos tudo
          no orçamento personalizado.
        </p>
      </div>
    </section>
  );
}
