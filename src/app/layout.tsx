import type { Metadata, Viewport } from "next";
import { Manrope, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/constants";
import SiteEffects from "@/components/SiteEffects";
import WhatsAppButton from "@/components/WhatsAppButton";

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const sans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

// Usa o domínio de produção real da Vercel (premoldes.vercel.app agora; passa a
// premoldes.pt automaticamente quando o domínio for ligado). Garante que a
// og:image resolve sempre para um URL que existe (preview do WhatsApp/redes).
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://www.premoldes.pt";
const DESCRIPTION =
  "Premolde Construções — moradias modulares em Light Steel Frame na Charneca de Caparica. Construção a seco, chave na mão, garantia de 5 anos. Peça orçamento.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Premolde Construções — Casas modulares em Light Steel Frame",
    template: "%s · Premolde Construções",
  },
  description: DESCRIPTION,
  keywords: [
    "Light Steel Frame",
    "LSF",
    "casas modulares",
    "construção a seco",
    "moradias chave na mão",
    "Charneca de Caparica",
    "Almada",
    "Premolde",
  ],
  authors: [{ name: COMPANY.fullName }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: COMPANY.fullName,
    title: "Premolde Construções — Casas modulares em Light Steel Frame",
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Premolde Construções — casas modulares em Light Steel Frame",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Premolde Construções — Casas modulares em LSF",
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#191A1D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-PT"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-concrete-50 text-ink-900 antialiased">
        {children}
        <WhatsAppButton />
        <SiteEffects />
      </body>
    </html>
  );
}
