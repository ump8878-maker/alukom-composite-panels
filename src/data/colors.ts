export type ColorCollection = {
  id: string;
  name: string;
  description: string;
  swatchCount: number;
  representative: string; // CSS gradient/color
  category: "metal" | "art" | "wood" | "solid" | "special";
};

export const collections: ColorCollection[] = [
  {
    id: "metal",
    name: "METAL",
    description: "Полированные металлические покрытия с микроскопической зернистостью.",
    swatchCount: 14,
    representative: "linear-gradient(135deg, #C5C5C5 0%, #8E8E8E 50%, #B0B0B0 100%)",
    category: "metal",
  },
  {
    id: "brushed",
    name: "BRUSHED",
    description: "Направленная шлифовка, мягкий блеск, эстетика индустриального дизайна.",
    swatchCount: 9,
    representative: "linear-gradient(135deg, #D4A574 0%, #B68855 100%)",
    category: "metal",
  },
  {
    id: "wood",
    name: "WOOD DESIGN",
    description: "Реалистичная фактура древесины: дуб, орех, термоясень.",
    swatchCount: 12,
    representative: "linear-gradient(135deg, #8B5A2B 0%, #5C3A1A 100%)",
    category: "wood",
  },
  {
    id: "rusty",
    name: "ART-RUSTY",
    description: "Эффект окисленной патины. Каждая партия уникальна по рисунку.",
    swatchCount: 6,
    representative: "linear-gradient(135deg, #A0522D 0%, #6B3410 50%, #8C4A1F 100%)",
    category: "art",
  },
  {
    id: "artsib",
    name: "ARTSIB",
    description: "Авторские декоративные покрытия: мрамор, бетон, оксид.",
    swatchCount: 18,
    representative: "linear-gradient(135deg, #3A3A3A 0%, #6B6B6B 100%)",
    category: "art",
  },
  {
    id: "anodized",
    name: "ANODIZED",
    description: "Анодированная фактура — глубокий матовый металл без отражений.",
    swatchCount: 7,
    representative: "linear-gradient(135deg, #5C4A38 0%, #3D3023 100%)",
    category: "metal",
  },
  {
    id: "chameleon",
    name: "CHAMELEON",
    description: "Покрытие, меняющее цвет от угла обзора и освещения.",
    swatchCount: 5,
    representative: "linear-gradient(135deg, #3D5A8A 0%, #7B4A9C 50%, #2D7A8E 100%)",
    category: "special",
  },
  {
    id: "pearl",
    name: "PEARL",
    description: "Перламутровое покрытие с мягким сиянием.",
    swatchCount: 8,
    representative: "linear-gradient(135deg, #F0EAE0 0%, #D9CFC0 100%)",
    category: "special",
  },
  {
    id: "sparkling",
    name: "SPARKLING",
    description: "Тёмная база с мелкими металлическими включениями.",
    swatchCount: 6,
    representative: "linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)",
    category: "special",
  },
  {
    id: "terra",
    name: "TERRA",
    description: "Тёплые матовые поверхности под керамику и камень.",
    swatchCount: 10,
    representative: "linear-gradient(135deg, #B26F3A 0%, #8C4F2A 100%)",
    category: "art",
  },
  {
    id: "supermatt",
    name: "SUPERMATT",
    description: "Глубокий матовый эффект, бархатистая поверхность.",
    swatchCount: 8,
    representative: "linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)",
    category: "solid",
  },
  {
    id: "solid",
    name: "SOLID COLORS",
    description: "Полный спектр RAL и собственные оттенки. Глянец / мат.",
    swatchCount: 120,
    representative: "linear-gradient(135deg, #3D4248 0%, #1F2226 100%)",
    category: "solid",
  },
];
