import Image from "next/image";
import { COMPANY, WHATSAPP_URL } from "@/lib/constants";

export default function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden bg-ink-950 py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image src="/ai/blueprint.jpg" alt="" fill aria-hidden className="object-cover opacity-[0.16]" sizes="100vw" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/70 to-flame-950/40" />
      </div>

      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow !text-flame-400" data-reveal>
            <span className="h-px w-8 bg-flame-500" />
            <span>Orçamento grátis e sem compromisso</span>
            <span className="h-px w-8 bg-flame-500" />
          </p>
          <h2
            data-reveal
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tightest sm:text-5xl lg:text-6xl"
          >
            Vamos construir
            <br />a sua casa?
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Conte-nos o que precisa. Respondemos rápido com um orçamento
            personalizado para o seu terreno e projeto.
          </p>

          <div data-reveal className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-base sm:w-auto">
              Pedir orçamento no WhatsApp
            </a>
            <a href={COMPANY.phoneHref} className="btn-ghost w-full !border-white/25 !bg-white/10 text-base !text-white hover:!bg-white/20 sm:w-auto">
              Ligar {COMPANY.phone}
            </a>
          </div>

          <div data-reveal className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { label: "Telefone", value: COMPANY.phone, href: COMPANY.phoneHref },
              { label: "Onde estamos", value: COMPANY.region, href: undefined },
            ].map((c) => (
              <div key={c.label} className="bg-ink-950/60 px-5 py-6 text-center backdrop-blur">
                <span className="block font-mono text-xs uppercase tracking-[0.2em] text-flame-400">
                  {c.label}
                </span>
                {c.href ? (
                  <a href={c.href} className="mt-2 block font-display font-semibold text-white transition-colors hover:text-flame-300">
                    {c.value}
                  </a>
                ) : (
                  <span className="mt-2 block font-display font-semibold text-white">{c.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
