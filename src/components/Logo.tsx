import { COMPANY } from "@/lib/constants";

/**
 * Wordmark Premolde + ícone de estrutura LSF (recriação vetorial do espírito
 * do logo do cliente: o "P" feito de treliça de aço). Nítido e escalável.
 */
export default function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const text = tone === "light" ? "text-white" : "text-ink-900";
  const sub = tone === "light" ? "text-white/55" : "text-ink-400";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 44"
        className="h-8 w-[29px] shrink-0"
        aria-hidden="true"
        fill="none"
      >
        {/* treliça vertical (haste do P) em vermelho */}
        <rect x="2" y="2" width="16" height="40" stroke="#E1251B" strokeWidth="2" />
        <path
          d="M2 12h16M2 22h16M2 32h16M2 2l16 10M18 12L2 22M2 22l16 10M18 32L2 42"
          stroke="#E1251B"
          strokeWidth="1.4"
        />
        {/* arco do P / treliça do telhado em grafite */}
        <path
          d="M18 4h12a6 6 0 0 1 0 18H18"
          stroke="currentColor"
          className={tone === "light" ? "text-white/70" : "text-ink-400"}
          strokeWidth="2"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.05rem] font-extrabold tracking-tight ${text}`}>
          {COMPANY.name.toUpperCase()}
        </span>
        <span className={`font-mono text-[0.5rem] uppercase tracking-[0.32em] ${sub}`}>
          Construções
        </span>
      </span>
    </span>
  );
}
