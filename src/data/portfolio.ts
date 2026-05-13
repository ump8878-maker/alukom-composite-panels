export type PortfolioCase = {
  id: string;
  title: string;
  type: "tc" | "bc" | "zhk" | "transport" | "industrial" | "sport" | "gov" | "culture" | "social";
  city: string;
  year: number;
  area: number;
  material: string;
  image: string;
  featured?: boolean;
};

export const portfolio: PortfolioCase[] = [
  {
    id: "tc-aurora",
    title: "ТРЦ «Аврора»",
    type: "tc",
    city: "Екатеринбург",
    year: 2025,
    area: 18400,
    material: "АКП РФ • Champagne Brushed",
    image: "/images/portfolio/tc-aurora.webp",
    featured: true,
  },
  {
    id: "bc-meridian",
    title: "БЦ «Меридиан»",
    type: "bc",
    city: "Москва",
    year: 2024,
    area: 24600,
    material: "АКП А2 • Graphite Metallic",
    image: "/images/portfolio/bc-meridian.webp",
    featured: true,
  },
  {
    id: "zhk-cedar",
    title: "ЖК «Кедровая аллея»",
    type: "zhk",
    city: "Новосибирск",
    year: 2025,
    area: 32000,
    material: "АКП РФ • Wood Oak + Pearl White",
    image: "/images/portfolio/zhk-cedar.webp",
  },
  {
    id: "airport-vlk",
    title: "Терминал аэропорта",
    type: "transport",
    city: "Владивосток",
    year: 2024,
    area: 12800,
    material: "АКП А2 • Anodized Bronze",
    image: "/images/portfolio/airport-vlk.webp",
  },
  {
    id: "plant-ural",
    title: "Производственный комплекс «Урал»",
    type: "industrial",
    city: "Челябинск",
    year: 2025,
    area: 9600,
    material: "СКП А2 • Art-Rusty",
    image: "/images/portfolio/plant-ural.webp",
  },
  {
    id: "arena-sib",
    title: "Спорт-арена «Сибирь»",
    type: "sport",
    city: "Красноярск",
    year: 2023,
    area: 15200,
    material: "АКП РФ • Chameleon Blue-Violet",
    image: "/images/portfolio/arena-sib.webp",
  },
  {
    id: "gov-rostov",
    title: "Административный центр",
    type: "gov",
    city: "Ростов-на-Дону",
    year: 2024,
    area: 7800,
    material: "АКП А2 • Solid Anthracite",
    image: "/images/portfolio/gov-rostov.webp",
  },
  {
    id: "museum-kzn",
    title: "Музей современного искусства",
    type: "culture",
    city: "Казань",
    year: 2025,
    area: 6400,
    material: "АКП А2 • Supermatt Black",
    image: "/images/portfolio/museum-kzn.webp",
  },
  {
    id: "school-spb",
    title: "Школа на 1500 мест",
    type: "social",
    city: "Санкт-Петербург",
    year: 2024,
    area: 4900,
    material: "АКП РФ • Terra + Cream",
    image: "/images/portfolio/school-spb.webp",
  },
];

export const portfolioFilters = [
  { id: "all", label: "Все объекты", count: portfolio.length },
  { id: "tc", label: "Торговые центры", count: portfolio.filter(c => c.type === "tc").length },
  { id: "bc", label: "Бизнес-центры", count: portfolio.filter(c => c.type === "bc").length },
  { id: "zhk", label: "Жилые комплексы", count: portfolio.filter(c => c.type === "zhk").length },
  { id: "industrial", label: "Промышленность", count: portfolio.filter(c => c.type === "industrial").length },
  { id: "gov", label: "Госзаказ", count: portfolio.filter(c => c.type === "gov").length },
  { id: "culture", label: "Культура и спорт", count: portfolio.filter(c => c.type === "culture" || c.type === "sport").length },
];
