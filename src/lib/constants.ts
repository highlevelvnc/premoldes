// ============================================================================
//  ÚNICO sítio para dados da empresa, WhatsApp, navegação, modelos e conteúdo.
//  Editar aqui reflecte em todo o site (header, hero, modelos, CTA, footer...).
// ============================================================================

const PHONE_DIGITS = "351968216954";

export const WHATSAPP_URL =
  `https://wa.me/${PHONE_DIGITS}?text=` +
  encodeURIComponent(
    "Olá Premolde! Vi o vosso site e gostaria de pedir um orçamento para uma moradia em Light Steel Frame."
  );

export const COMPANY = {
  name: "Premolde",
  fullName: "Premolde Construções",
  tagline: "Casas modulares em Light Steel Frame, chave na mão.",
  region: "Charneca de Caparica · Almada",
  email: "contacto@premolde.pt",
  phone: "+351 968 216 954",
  phoneHref: "tel:+351968216954",
  nipc: "514206748",
  address: "Rua da Almada, Charneca de Caparica, 2820-606",
  yearsExperience: 15,
  instagram: "https://instagram.com/premolde.casas",
  facebook: "https://facebook.com/premolde.casas",
} as const;

export const NAV_LINKS = [
  { label: "Vantagens", href: "#vantagens" },
  { label: "Como construímos", href: "#construir" },
  { label: "Modelos", href: "#modelos" },
  { label: "Obras", href: "#obras" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
] as const;

// Números de prova social (editáveis)
export const STATS = [
  { value: "15", suffix: " anos", label: "de experiência" },
  { value: "180", suffix: " dias", label: "para uma moradia chave na mão" },
  { value: "5", suffix: " anos", label: "de garantia estrutural" },
  { value: "100", suffix: "%", label: "construção a seco (LSF)" },
] as const;

// Vantagens do Light Steel Frame
export const ADVANTAGES = [
  {
    no: "01",
    title: "Rápido de construir",
    text: "Construção a seco e modular: uma moradia pronta em meses, não em anos. Menos dependência do tempo e da mão de obra.",
  },
  {
    no: "02",
    title: "Eficiência térmica",
    text: "Isolamento contínuo nas paredes e cobertura. Casas frescas no verão, quentes no inverno — e contas de energia mais baixas.",
  },
  {
    no: "03",
    title: "Antissísmico e leve",
    text: "A estrutura em aço galvanizado é leve, flexível e resistente. Comporta-se melhor em sismos do que a construção tradicional.",
  },
  {
    no: "04",
    title: "Preço fechado",
    text: "Orçamento e prazo definidos à partida. Chave na mão, sem surpresas a meio da obra.",
  },
  {
    no: "05",
    title: "Sustentável",
    text: "Aço reciclável, menos desperdício em obra e menor pegada de carbono que o betão.",
  },
  {
    no: "06",
    title: "Durável",
    text: "Aço tratado contra corrosão e materiais certificados. Garantia estrutural e manutenção mínima.",
  },
] as const;

// Fases da animação central (montagem da estrutura) + processo
export const BUILD_STEPS = [
  {
    no: "01",
    key: "fundacao",
    title: "Fundação & laje",
    text: "Preparamos o terreno e executamos a laje de betão nivelada — a base sólida sobre a qual tudo assenta.",
  },
  {
    no: "02",
    key: "estrutura",
    title: "Estrutura em aço",
    text: "Montagem dos perfis de aço galvanizado (Light Steel Frame). A casa ganha esqueleto em poucos dias.",
  },
  {
    no: "03",
    key: "envolvente",
    title: "Painéis & cobertura",
    text: "Fechamento com painéis OSB, isolamento térmico e acústico e a cobertura. A casa fica estanque.",
  },
  {
    no: "04",
    key: "acabamento",
    title: "Acabamentos & chave",
    text: "Reboco, revestimentos, caixilharia, instalações e acabamentos interiores. Entregamos chave na mão.",
  },
] as const;

// Gama de modelos — PLACEHOLDERS editáveis (confirmar áreas/preços com o cliente)
export const MODELS = [
  {
    name: "Atlântico",
    type: "T2",
    floors: "Térreo",
    area: 92,
    bedrooms: 2,
    baths: 1,
    from: "118.000",
    image: "/portfolio/casa4.jpeg",
    highlights: ["Open-space cozinha/sala", "Alpendre coberto", "Piso único acessível"],
  },
  {
    name: "Sado",
    type: "T3",
    floors: "Térreo",
    area: 124,
    bedrooms: 3,
    baths: 2,
    from: "149.000",
    image: "/portfolio/casa3.jpeg",
    highlights: ["Suite com closet", "Garagem integrada", "Painéis solares (opção)"],
  },
  {
    name: "Tejo",
    type: "T3",
    floors: "2 pisos",
    area: 168,
    bedrooms: 3,
    baths: 3,
    from: "189.000",
    image: "/portfolio/casa2.jpeg",
    highlights: ["Suite no piso superior", "Terraço panorâmico", "Pé-direito duplo na sala"],
  },
  {
    name: "Arrábida",
    type: "T4",
    floors: "2 pisos",
    area: 212,
    bedrooms: 4,
    baths: 3,
    from: "239.000",
    image: "/portfolio/casa3.jpeg",
    highlights: ["Suite + 3 quartos", "Garagem dupla", "Escritório / sala de família"],
  },
] as const;

// Portfólio — obras reais do cliente
export const PORTFOLIO = [
  {
    src: "/portfolio/casa4.jpeg",
    title: "Moradia térrea contemporânea",
    location: "Charneca de Caparica",
    tag: "T3 · Térreo",
    area: 138,
    year: "2024",
  },
  {
    src: "/portfolio/casa2.jpeg",
    title: "Moradia de dois pisos com terraço",
    location: "Almada",
    tag: "T3 · 2 pisos",
    area: 172,
    year: "2023",
  },
  {
    src: "/portfolio/casa3.jpeg",
    title: "Moradia urbana com revestimento de pedra",
    location: "Setúbal",
    tag: "T3 · 2 pisos",
    area: 165,
    year: "2023",
  },
] as const;

export const FAQ = [
  {
    q: "Quanto tempo demora a construir uma moradia?",
    a: "Uma moradia chave na mão em Light Steel Frame fica pronta tipicamente em cerca de 180 dias, dependendo da área e dos acabamentos. A estrutura em si monta-se em poucos dias.",
  },
  {
    q: "O preço é fechado?",
    a: "Sim. Trabalhamos com orçamento e prazo definidos à partida, em regime chave na mão ou por mútuo acordo, com garantia estrutural de 5 anos.",
  },
  {
    q: "As casas em LSF são seguras e duráveis?",
    a: "Muito. O aço galvanizado é tratado contra corrosão, é leve e flexível (excelente comportamento sísmico) e usa materiais certificados, com manutenção mínima ao longo do tempo.",
  },
  {
    q: "Posso personalizar o projeto?",
    a: "Totalmente. Os modelos são pontos de partida — adaptamos plantas, áreas e acabamentos ao seu terreno e ao seu gosto, com projeto de engenharia e arquitetura incluído.",
  },
] as const;
