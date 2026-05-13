export type Product = {
  id: string;
  code: string;
  name: string;
  shortName: string;
  description: string;
  highlights: { label: string; value: string }[];
  fire: "Г1" | "Г4" | "НГ";
  thickness: string;
  applications: string[];
  image: string;
};

export const products: Product[] = [
  {
    id: "akp",
    code: "АКП РФ",
    name: "Алюминиевые композитные панели",
    shortName: "АКП РФ",
    description:
      "Базовая линейка для вентилируемых фасадов жилых и коммерческих зданий. Лёгкие, формуемые, широкая палитра.",
    highlights: [
      { label: "Толщина", value: "3 / 4 / 6 мм" },
      { label: "Вес", value: "5,5 кг/м²" },
      { label: "Гарантия", value: "25 лет" },
    ],
    fire: "Г1",
    thickness: "3–6 мм",
    applications: ["БЦ", "ЖК", "ТЦ", "Соцобъекты"],
    image: "/images/products/akp.webp",
  },
  {
    id: "akp-a2",
    code: "АКП А2",
    name: "Огнестойкие алюминиевые панели",
    shortName: "АКП А2",
    description:
      "Класс пожарной опасности НГ. Для высотных зданий, объектов с массовым пребыванием людей, гос. строительства.",
    highlights: [
      { label: "Толщина", value: "4 / 6 мм" },
      { label: "Сердцевина", value: "Минеральная А2" },
      { label: "Сертификат", value: "ФЗ-123" },
    ],
    fire: "НГ",
    thickness: "4–6 мм",
    applications: ["Высотки", "Аэропорты", "Госзаказ", "Метро"],
    image: "/images/products/akp-a2.webp",
  },
  {
    id: "skp",
    code: "СКП",
    name: "Стальные композитные панели",
    shortName: "СКП",
    description:
      "Усиленные панели для промышленных объектов, ТЦ, складских комплексов. Стойкость к механическим нагрузкам.",
    highlights: [
      { label: "Толщина", value: "4 мм" },
      { label: "Вес", value: "8,2 кг/м²" },
      { label: "Покрытие", value: "PE / PVDF" },
    ],
    fire: "Г1",
    thickness: "4 мм",
    applications: ["Промзоны", "Склады", "Логистика", "АЗС"],
    image: "/images/products/skp.webp",
  },
  {
    id: "skp-a2",
    code: "СКП А2",
    name: "Стальные огнестойкие панели",
    shortName: "СКП А2",
    description:
      "Сочетают прочность стали и негорючесть А2. Для ответственных промышленных объектов и реконструкций.",
    highlights: [
      { label: "Толщина", value: "4 / 6 мм" },
      { label: "Класс", value: "НГ" },
      { label: "Прочность", value: "до 300 МПа" },
    ],
    fire: "НГ",
    thickness: "4–6 мм",
    applications: ["Заводы", "НПЗ", "Реконструкция", "Стадионы"],
    image: "/images/products/skp-a2.webp",
  },
  {
    id: "cassette-3d",
    code: "3D-кассеты",
    name: "Архитектурные 3D-кассеты",
    shortName: "3D-кассеты",
    description:
      "Объёмные кассеты с фрезерованными гранями. Премиум-решение для индивидуальной архитектуры.",
    highlights: [
      { label: "Размер", value: "до 2000×6000 мм" },
      { label: "Кратность", value: "±0,5 мм" },
      { label: "Цвета", value: "Все коллекции" },
    ],
    fire: "Г1",
    thickness: "4–6 мм",
    applications: ["Премиум-ЖК", "Музеи", "Бутики", "Офисы класса А"],
    image: "/images/products/cassette-3d.webp",
  },
];
