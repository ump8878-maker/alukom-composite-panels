export type Office = {
  id: string;
  city: string;
  type: "head" | "branch" | "warehouse";
  address: string;
  phone: string;
  email: string;
  // Координаты для SVG-карты в относительных %
  x: number;
  y: number;
};

export const offices: Office[] = [
  {
    id: "novosib",
    city: "Новосибирск",
    type: "head",
    address: "Платформа 3307 км, дом 17, к.2",
    phone: "+7 (383) 383-25-44",
    email: "info@alukom.ru",
    x: 64,
    y: 56,
  },
  {
    id: "msk",
    city: "Москва",
    type: "branch",
    address: "Огородный проезд, 16/1с4, оф. 1105",
    phone: "+7 (495) 859-20-79",
    email: "msk@alukom.ru",
    x: 28,
    y: 39,
  },
  {
    id: "spb",
    city: "Санкт-Петербург",
    type: "branch",
    address: "Социалистическая, 21, оф. 2126",
    phone: "+7 (812) 665-66-75",
    email: "spb@alukom.ru",
    x: 27,
    y: 28,
  },
  {
    id: "ekb",
    city: "Екатеринбург",
    type: "warehouse",
    address: "Мамина-Сибиряка, 101, 7 эт.",
    phone: "+7 (343) 363-89-93",
    email: "ekb@alukom.ru",
    x: 49,
    y: 44,
  },
  {
    id: "samara",
    city: "Самара",
    type: "branch",
    address: "Красноармейская, 131, оф. 4-035",
    phone: "+7 (846) 211-50-63",
    email: "samara@alukom.ru",
    x: 35,
    y: 50,
  },
  {
    id: "kazan",
    city: "Казань",
    type: "branch",
    address: "Солдатская, 8, оф. 203А",
    phone: "+7 (843) 202-20-70",
    email: "kazan@alukom.ru",
    x: 36,
    y: 44,
  },
  {
    id: "rostov",
    city: "Ростов-на-Дону",
    type: "branch",
    address: "Время работы 9:00–18:00",
    phone: "+7 (861) 207-20-43",
    email: "rostov@alukom.ru",
    x: 30,
    y: 56,
  },
  {
    id: "krd",
    city: "Краснодар",
    type: "branch",
    address: "Советская, 30, 4 эт., оф. 406",
    phone: "+7 (861) 207-20-43",
    email: "krd@alukom.ru",
    x: 27,
    y: 60,
  },
  {
    id: "khb",
    city: "Хабаровск",
    type: "branch",
    address: "Путевая, 1а, 3 эт., оф. 2",
    phone: "+7 (421) 298-88-43",
    email: "khb@alukom.ru",
    x: 90,
    y: 60,
  },
  {
    id: "vlk",
    city: "Владивосток",
    type: "branch",
    address: "Аксаковская, 3в, 5 эт., оф. 7",
    phone: "+7 (423) 205-54-85",
    email: "vlk@alukom.ru",
    x: 92,
    y: 65,
  },
];
