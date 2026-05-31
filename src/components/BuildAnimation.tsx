"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUILD_STEPS } from "@/lib/constants";

// ---------------------------------------------------------------------------
//  Projeção isométrica de uma moradia LSF de 2 pisos (viewBox 720 × 540).
//  x = largura (→ trás-direita), y = profundidade (→ trás-esquerda), z = altura.
// ---------------------------------------------------------------------------
const COS30 = Math.cos(Math.PI / 6);
const U = 33; // px por unidade
const OX = 352;
const OY = 312;
const proj = (x: number, y: number, z: number): [number, number] => [
  OX + (x - y) * COS30 * U,
  OY + ((x + y) * 0.5 - z) * U,
];
const P = (x: number, y: number, z: number) => proj(x, y, z).join(",");
const poly = (...pts: [number, number, number][]) =>
  pts.map((p) => P(p[0], p[1], p[2])).join(" ");

// dimensões da casa
const W = 6.4; // largura
const D = 4.4; // profundidade
const MID = 3; // laje intermédia
const TOP = 6; // cobertura

// montantes verticais (x na face frontal y=0  +  y na face direita x=W)
const FRONT_STUDS = [0, 2.13, 4.27, 6.4];
const RIGHT_STUDS = [0, 1.47, 2.93, 4.4];

// janelas/portas: [eixo, a, b, z1, z2]  (eixo 'front' usa x, 'right' usa y)
const OPENINGS: { face: "front" | "right"; a: number; b: number; z1: number; z2: number }[] = [
  { face: "front", a: 0.7, b: 2.5, z1: 3.5, z2: 5.1 }, // piso 1 esq
  { face: "front", a: 3.5, b: 5.7, z1: 3.5, z2: 5.1 }, // piso 1 dir
  { face: "front", a: 0.7, b: 1.8, z1: 0.1, z2: 2.5 }, // porta
  { face: "front", a: 3.0, b: 5.7, z1: 0.6, z2: 2.5 }, // piso 0
  { face: "right", a: 0.8, b: 3.4, z1: 3.5, z2: 5.1 }, // piso 1 lateral
  { face: "right", a: 0.8, b: 3.4, z1: 0.6, z2: 2.5 }, // piso 0 lateral
];
const openingPoly = (o: (typeof OPENINGS)[number]) =>
  o.face === "front"
    ? poly([o.a, 0, o.z1], [o.b, 0, o.z1], [o.b, 0, o.z2], [o.a, 0, o.z2])
    : poly([W, o.a, o.z1], [W, o.b, o.z1], [W, o.b, o.z2], [W, o.a, o.z2]);

// anotações técnicas: âncora 3D na casa + posição do texto no viewBox
const LABELS = [
  { t: "Laje de betão", a: proj(W / 2, D, 0), x: 70, y: 486, anchorEnd: false },
  { t: "Isolamento térmico", a: proj(0, 0, 4.2), x: 40, y: 250, anchorEnd: false },
  { t: "Aço galvanizado (LSF)", a: proj(W, 0, 4.6), x: 612, y: 196, anchorEnd: true },
  { t: "Caixilharia de alumínio", a: proj(W, 1.5, 4.3), x: 624, y: 372, anchorEnd: true },
  { t: "Painéis solares", a: proj(W / 2, D / 2, TOP), x: 556, y: 70, anchorEnd: true },
];

export default function BuildAnimation() {
  const track = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!track.current || !svgRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const svg = svgRef.current;
    const sel = (s: string) => gsap.utils.toArray<SVGElement>(svg.querySelectorAll(s));
    const slab = sel(".bd-slab");
    const studs = sel(".bd-stud");
    const beams = sel(".bd-beam");
    const roof = sel(".bd-roofline");
    const faces = sel(".bd-face");
    const openings = sel(".bd-opening");
    const labels = sel(".bd-label");
    const leaders = sel(".bd-leader");
    const lines = [...slab, ...studs, ...beams, ...roof];

    const showFinal = () => {
      gsap.set(lines, { strokeDashoffset: 0 });
      gsap.set(leaders, { strokeDashoffset: 0 });
      gsap.set(faces, { opacity: 1 });
      gsap.set(openings, { opacity: 1 });
      gsap.set(labels, { opacity: 1 });
      gsap.set(svgRef.current, { opacity: 0.14 });
      gsap.set(photoRef.current, { opacity: 1 });
      if (barRef.current) barRef.current.style.transform = "scaleX(1)";
      setActive(BUILD_STEPS.length - 1);
    };

    const mm = gsap.matchMedia();

    try {
      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (ctx.conditions?.reduced) {
            showFinal();
            return;
          }

          // estado inicial via JS (falha-aberta)
          gsap.set([...lines, ...leaders], { strokeDasharray: 1, strokeDashoffset: 1 });
          gsap.set(faces, { opacity: 0 });
          gsap.set(openings, { opacity: 0 });
          gsap.set(labels, { opacity: 0 });
          gsap.set(photoRef.current, { opacity: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: track.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              onUpdate: (self) => {
                const p = self.progress;
                if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
                const idx = Math.min(
                  BUILD_STEPS.length - 1,
                  Math.floor(p * BUILD_STEPS.length)
                );
                setActive((prev) => (prev === idx ? prev : idx));
              },
            },
          });

          tl.to(slab, { strokeDashoffset: 0, duration: 0.8 })
            .to(studs, { strokeDashoffset: 0, duration: 1.6, stagger: 0.08 }, ">-0.05")
            .to(beams, { strokeDashoffset: 0, duration: 1.2, stagger: 0.12 }, "<0.4")
            .to(roof, { strokeDashoffset: 0, duration: 0.8, stagger: 0.1 }, ">-0.2")
            .to(faces, { opacity: 1, duration: 1.0, stagger: 0.15 }, ">")
            .to(openings, { opacity: 1, duration: 0.8, stagger: 0.08 }, ">-0.3")
            .to(leaders, { strokeDashoffset: 0, duration: 0.5, stagger: 0.12 }, ">-0.1")
            .to(labels, { opacity: 1, duration: 0.4, stagger: 0.12 }, "<0.1")
            // cross-fade: a foto real entra enquanto a maquete esmaece
            .to(photoRef.current, { opacity: 1, duration: 1.2 }, ">0.1")
            .to(svgRef.current, { opacity: 0.14, duration: 1.0 }, "<");

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );
    } catch {
      showFinal();
    }

    return () => mm.revert();
  }, []);

  return (
    <section id="construir" className="relative bg-ink-950 text-white">
      <div ref={track} className="relative h-[320vh] md:h-[380vh]">
        <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
          {/* fundo blueprint + grelha */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <Image
              src="/ai/blueprint.jpg"
              alt=""
              fill
              aria-hidden
              className="object-cover opacity-[0.16]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-grid-dark opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/30 to-ink-950" />
          </div>

          <div className="container-px grid w-full items-center gap-6 lg:grid-cols-12 lg:gap-10">
            {/* coluna de texto / fases */}
            <div className="order-2 lg:order-1 lg:col-span-4">
              <p className="eyebrow !text-flame-400">
                <span className="h-px w-8 bg-flame-500" />
                02 — Como construímos
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tightest sm:text-4xl lg:text-[2.75rem]">
                Da laje à chave,
                <br className="hidden sm:block" /> em poucos meses.
              </h2>

              <ul className="mt-7 space-y-1">
                {BUILD_STEPS.map((s, i) => {
                  const on = i === active;
                  const done = i < active;
                  return (
                    <li
                      key={s.key}
                      className={`flex gap-4 rounded-xl px-3 py-2.5 transition-all duration-500 ${
                        on ? "bg-white/[0.06]" : "opacity-45"
                      }`}
                    >
                      <span
                        className={`mt-0.5 font-mono text-sm transition-colors ${
                          on || done ? "text-flame-400" : "text-white/40"
                        }`}
                      >
                        {s.no}
                      </span>
                      <div>
                        <p className="font-display font-semibold tracking-tight">{s.title}</p>
                        <p
                          className={`mt-1 max-w-sm text-sm leading-relaxed text-white/60 transition-all duration-500 ${
                            on
                              ? "max-h-24 opacity-100"
                              : "max-h-0 overflow-hidden opacity-0 lg:max-h-24 lg:opacity-60"
                          }`}
                        >
                          {s.text}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  ref={barRef}
                  className="h-full w-full origin-left scale-x-0 rounded-full bg-flame-500"
                />
              </div>
            </div>

            {/* palco da animação */}
            <div className="order-1 lg:order-2 lg:col-span-8">
              <div className="relative mx-auto aspect-[720/540] w-full max-w-2xl">
                {/* foto real (cross-fade final) */}
                <div ref={photoRef} className="absolute inset-0 overflow-hidden rounded-2xl opacity-0">
                  <Image
                    src="/portfolio/casa2.jpeg"
                    alt="Moradia em Light Steel Frame concluída pela Premolde"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-ink-950/10" />
                </div>

                <svg
                  ref={svgRef}
                  viewBox="0 0 720 540"
                  className="relative h-full w-full overflow-visible"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* sombra no chão */}
                  <polygon
                    points={poly([0.4, 0.4, 0], [W + 0.6, 0.4, 0], [W + 0.6, D + 0.6, 0], [0.4, D + 0.6, 0])}
                    fill="#000"
                    opacity="0.25"
                  />

                  {/* ---- paredes (faces) — preenchem no fim, dão volume ---- */}
                  <polygon className="bd-face" points={poly([0, D, 0], [W, D, 0], [W, D, TOP], [0, D, TOP])} fill="#11181F" opacity="0" />
                  <polygon className="bd-face" points={poly([W, 0, 0], [W, D, 0], [W, D, TOP], [W, 0, TOP])} fill="#D9D6D0" opacity="0" />
                  <polygon className="bd-face" points={poly([0, 0, 0], [W, 0, 0], [W, 0, TOP], [0, 0, TOP])} fill="#F5F4F1" opacity="0" />
                  {/* telhado */}
                  <polygon className="bd-face" points={poly([0, 0, TOP], [W, 0, TOP], [W, D, TOP], [0, D, TOP])} fill="#ECEAE5" opacity="0" />

                  {/* ---- janelas / portas (glow âmbar) ---- */}
                  {OPENINGS.map((o, i) => (
                    <polygon key={i} className="bd-opening" points={openingPoly(o)} fill="#F6B23C" opacity="0" />
                  ))}

                  {/* ---- laje ---- */}
                  <polygon
                    className="bd-slab"
                    points={poly([0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0])}
                    pathLength={1}
                    stroke="#E1251B"
                    strokeWidth="2.5"
                  />

                  {/* ---- montantes verticais ---- */}
                  {FRONT_STUDS.map((x, i) => {
                    const [x1, y1] = proj(x, 0, 0);
                    const [x2, y2] = proj(x, 0, TOP);
                    const edge = i === 0 || i === FRONT_STUDS.length - 1;
                    return (
                      <line key={`fs${i}`} className="bd-stud" x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1}
                        stroke={edge ? "#E1251B" : "#F09A8F"} strokeWidth={edge ? 2.2 : 1.4} />
                    );
                  })}
                  {RIGHT_STUDS.map((y, i) => {
                    if (i === 0) return null; // partilhado com o canto frontal
                    const [x1, y1] = proj(W, y, 0);
                    const [x2, y2] = proj(W, y, TOP);
                    const edge = i === RIGHT_STUDS.length - 1;
                    return (
                      <line key={`rs${i}`} className="bd-stud" x1={x1} y1={y1} x2={x2} y2={y2} pathLength={1}
                        stroke={edge ? "#E1251B" : "#F09A8F"} strokeWidth={edge ? 2.2 : 1.4} />
                    );
                  })}
                  {/* canto traseiro (profundidade) */}
                  <line className="bd-stud" {...lineProps(proj(0, D, 0), proj(0, D, TOP))} pathLength={1} stroke="#C41A12" strokeWidth="1.8" />

                  {/* ---- vigas horizontais (laje intermédia + topo) ---- */}
                  {[MID, TOP].map((z) =>
                    [
                      [proj(0, 0, z), proj(W, 0, z)],
                      [proj(W, 0, z), proj(W, D, z)],
                      [proj(0, 0, z), proj(0, D, z)],
                      [proj(0, D, z), proj(W, D, z)],
                    ].map(([p1, p2], j) => (
                      <line key={`b${z}-${j}`} className="bd-beam" {...lineProps(p1, p2)} pathLength={1}
                        stroke="#E1251B" strokeWidth={z === TOP ? 2.4 : 2} />
                    ))
                  )}

                  {/* ---- linha de cumeeira do telhado (diagonais do topo) ---- */}
                  <line className="bd-roofline" {...lineProps(proj(0, 0, TOP), proj(W, D, TOP))} pathLength={1} stroke="#F09A8F" strokeWidth="1.2" />
                  <line className="bd-roofline" {...lineProps(proj(W, 0, TOP), proj(0, D, TOP))} pathLength={1} stroke="#F09A8F" strokeWidth="1.2" />

                  {/* ---- anotações técnicas ---- */}
                  {LABELS.map((l, i) => (
                    <g key={i}>
                      <line
                        className="bd-leader"
                        x1={l.a[0]}
                        y1={l.a[1]}
                        x2={l.x}
                        y2={l.y}
                        pathLength={1}
                        stroke="#E1251B"
                        strokeWidth="1"
                      />
                      <circle className="bd-label" cx={l.a[0]} cy={l.a[1]} r="3" fill="#E1251B" opacity="0" />
                      <text
                        className="bd-label"
                        x={l.x}
                        y={l.y - 6}
                        opacity="0"
                        textAnchor={l.anchorEnd ? "end" : "start"}
                        fill="#fff"
                        style={{ font: "500 13px var(--font-mono)", letterSpacing: "0.02em" }}
                      >
                        {l.t}
                      </text>
                    </g>
                  ))}
                </svg>

                <div className="absolute -left-1 top-3 hidden rounded-md border border-white/10 bg-ink-900/70 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-flame-300 backdrop-blur sm:block">
                  LSF · maquete técnica
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// helper para espalhar x1/y1/x2/y2 a partir de dois pontos projetados
function lineProps(p1: [number, number], p2: [number, number]) {
  return { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1] };
}
