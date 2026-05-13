# ALUKOM — концепт лендинга производителя композитных панелей

Демо-сайт под B2B-производителя композитных фасадных панелей. Цель — привлечение дилеров и оптовых партнёров. Структурно «лучше SIBALUX»: hero с KPI вместо логотипа, интерактивная палитра цветов, калькулятор сметы с дилерской маржой, квиз «стать дилером», SVG-карта России.

## Запуск

```bash
cd ~/Projects/agency/demos/composite-panels
npm install
npm run dev
```

Открой `http://localhost:3000`.

## Стек

- Next.js 16 (static export)
- React 19
- TypeScript 5.7
- Tailwind CSS v4 (CSS-first config через `@theme` в globals.css)
- Framer Motion 11 — анимации секций
- lucide-react — иконки

## Структура

```
src/
├── app/
│   ├── layout.tsx       # шрифты Unbounded + Manrope, метаданные
│   ├── page.tsx          # сборка из секций
│   └── globals.css       # дизайн-токены + utility-классы
├── components/
│   ├── Header.tsx        # фиксированная шапка с эффектом scroll
│   ├── ui/               # Container, SectionHeader
│   └── sections/         # 14 секций сайта
└── data/                 # все данные в TypeScript
    ├── products.ts
    ├── colors.ts
    ├── portfolio.ts
    ├── certificates.ts
    ├── offices.ts
    └── faq.ts
```

## 14 секций

1. **Hero** — KPI завода, 2 CTA, фасадный фон
2. **TrustBar** — бесконечный marquee с логотипами застройщиков
3. **Products** — 5 линеек панелей + карточка-CTA
4. **Colors** — 12 коллекций с CSS/SVG-имитацией фактур, фильтры по типу
5. **Production** — 4 KPI + 4 линии + блок-показ цеха
6. **Portfolio** — 9 кейсов с фильтрами, масонри-сетка, featured-row span
7. **DealerTerms** — лестница скидок + 4 блока преимуществ + CTA на квоты
8. **Calculator** — интерактивный калькулятор сметы и дилерской маржи
9. **CaseStory** — слайдер «до/после» с drag-разделителем + цитата
10. **Certificates** — 8 документов как PDF-превью с hover-эффектом
11. **Geography** — SVG-карта России с интерактивными точками офисов
12. **FAQ** — sticky-заголовок + 10 вопросов аккордеоном
13. **DealerForm** — 4-шаговый квиз с прогресс-баром
14. **Footer** — контакты + 6 PDF-каталогов + nav в 4 колонки

## Изображения и видео (актуально на 12 мая 2026)

Все 25 фото уже сконвертированы в WebP и лежат в `public/images/`:
- `hero/main.webp` — бронзовое здание Москва-Сити ночью (~600 КБ)
- `story/phase-1..4.webp` — сторителлинг между Hero и Products (~900 КБ всего)
- `products/{akp,akp-a2,skp,skp-a2,cassette-3d}.webp` — карточки продукции
- `portfolio/{tc-aurora,bc-meridian,airport-vlk,plant-ural,arena-sib,gov-rostov,museum-kzn,school-spb,zhk-cedar}.webp` — 9 кейсов
- `production/main.webp` — линия каширования
- `case/{before,after}.webp` — для CaseStory drag-слайдера
- Резерв: `production/lab.webp`, `production/warehouse.webp`, `hero/test.webp` — не подключены

Видео `public/video/material-to-building.mp4` (3.9 МБ, 1080p/24fps, без звука) — material-to-building reveal в ScrollStory Phase 4. Poster `material-to-building-poster.webp` подгружается пока видео тянется.

Исходники PNG лежат в `photo/` (вне deploy bundle, не попадают в `out/`).

## Что доделать перед production

- [ ] Реальные логотипы партнёров в TrustBar (вместо текстовых названий застройщиков)
- [ ] PDF-каталоги в `public/pdf/`
- [ ] Интеграция формы с Telegram-ботом или CRM (сейчас mock-submit)
- [ ] Я.Метрика + цели + UTM
- [ ] OG-image 1200×630 в `public/og.jpg`
- [ ] Favicon-набор
- [ ] Sitemap, robots.txt
- [ ] OG-image 1200×630
- [ ] Favicon-набор
- [ ] Sitemap, robots.txt, manifest.json

## Деплой

Static export → деплой rsync-ом на Nic.ru shared.

```bash
npm run build  # сгенерит /out
rsync -avz ./out/ user@nic-ru:/var/www/alukom.ru/
```
