export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  number: string;
  validUntil: string;
};

export const certificates: Certificate[] = [
  {
    id: "fz-123",
    title: "Сертификат пожарной безопасности ФЗ-123",
    issuer: "ВНИИПО МЧС России",
    number: "C-RU.ПБ81.В.00321",
    validUntil: "2028",
  },
  {
    id: "gost-30247",
    title: "Соответствие ГОСТ 30247.1-94",
    issuer: "Испытательная лаборатория «Сибпожтест»",
    number: "ИЛ-2025/417",
    validUntil: "2027",
  },
  {
    id: "iso-9001",
    title: "ISO 9001:2015 — менеджмент качества",
    issuer: "Russian Register",
    number: "21.0517.026",
    validUntil: "2026",
  },
  {
    id: "iso-14001",
    title: "ISO 14001:2015 — экологический менеджмент",
    issuer: "Russian Register",
    number: "21.0517.027",
    validUntil: "2026",
  },
  {
    id: "sro",
    title: "СРО «Союз композитчиков»",
    issuer: "Ассоциация СРО",
    number: "СРО-П-291-25062019",
    validUntil: "2027",
  },
  {
    id: "ng-class",
    title: "Класс пожарной опасности НГ",
    issuer: "ЦНИИСК им. Кучеренко",
    number: "ЦНИИСК/2024-АКП-А2",
    validUntil: "2029",
  },
  {
    id: "tu",
    title: "Технические условия 5285-001-АЛК",
    issuer: "Госстандарт РФ",
    number: "ТУ 5285-001-91283540-2023",
    validUntil: "2028",
  },
  {
    id: "eac",
    title: "Декларация ЕАС таможенного союза",
    issuer: "Россаккредитация",
    number: "ЕАЭС N RU Д-RU.РА04.В.32401",
    validUntil: "2027",
  },
];
