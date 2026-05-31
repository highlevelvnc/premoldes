import Image from "next/image";

const FRAMES = [
  { src: "/ai/fase1-fundacao.jpg", no: "01", label: "Fundação & laje" },
  { src: "/ai/fase2-estrutura.jpg", no: "02", label: "Estrutura em aço" },
  { src: "/ai/fase3-paineis.jpg", no: "03", label: "Painéis & cobertura" },
  { src: "/ai/hero.jpg", no: "04", label: "Chave na mão" },
];

export default function ProcessStrip() {
  return (
    <section className="bg-ink-950 pb-24 pt-20 text-white lg:pb-28">
      <div className="container-px">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            data-reveal
            className="max-w-md font-display text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Do terreno à entrega, sem surpresas.
          </h2>
          <p data-reveal className="max-w-sm text-sm leading-relaxed text-white/55">
            Cada fase documentada e com prazo definido. Acompanha a obra do
            primeiro dia até receber a chave.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {FRAMES.map((f, i) => (
            <figure
              key={f.no}
              data-reveal
              data-reveal-dir
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-900"
            >
              <Image
                src={f.src}
                alt={f.label}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover opacity-85 transition-all duration-700 ease-smooth group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                <span className="font-mono text-xs text-flame-400">{f.no}</span>
                <span className="font-display text-sm font-semibold tracking-tight">{f.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
