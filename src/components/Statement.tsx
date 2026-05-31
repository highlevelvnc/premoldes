export default function Statement() {
  return (
    <section className="bg-concrete-50 py-24 lg:py-36">
      <div className="container-px">
        <p className="eyebrow" data-reveal>
          <span className="h-px w-8 bg-flame-500" />
          A versatilidade do LSF
        </p>
        <h2
          data-reveal
          className="mt-6 max-w-5xl font-display text-[2rem] font-extrabold leading-[1.08] tracking-tightest text-ink-300 sm:text-4xl lg:text-[3.4rem] lg:leading-[1.06]"
        >
          <span className="text-ink-900">Do projeto à chave</span>, a construção a
          seco permite-nos erguer <span className="text-flame-500">do zero</span> os
          projetos mais exigentes — <span className="text-ink-900">no prazo e no
          orçamento</span> que combinámos.
        </h2>

        <div className="mt-12 flex flex-col gap-6 border-t border-ink-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p data-reveal className="max-w-md text-ink-500">
            Cada moradia é um projeto de engenharia e arquitetura próprio,
            adaptado ao seu terreno, gosto e forma de viver.
          </p>
          <a
            data-reveal
            href="#modelos"
            className="group inline-flex items-center gap-3 font-display font-semibold tracking-tight text-ink-900"
          >
            <span className="border-b border-flame-500 pb-0.5">Ver os modelos</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
