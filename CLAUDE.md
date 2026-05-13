# CLAUDE.md — demos/composite-panels

Этот файл — локальный контекст для Claude Code. Дополняет агентский `~/Projects/agency/CLAUDE.md`. Читай **оба**, прежде чем что-то менять.

## Что это

**ALUKOM / АЛЮКОМ** — концепт-демо лендинга для производителя алюминиевых и стальных композитных фасадных панелей. Делался как референс-кейс для клиента из стройки (бизнес-модель не назвал, делаем «как наиболее ходовое»: B2B-производитель, цель — привлечение дилеров).

Источник вдохновения по структуре: **sibalux.ru**. Концепция «лучше SIBALUX» — hero с KPI вместо логотипа, интерактивная палитра цветов, калькулятор сметы с дилерской маржой, квиз «стать дилером», scroll-driven storytelling, video-scrubbing вместо статичных hero-картинок.

Полный концепт лежит в `~/Projects/agency/playbook/memory/composite-panels-landing-concept.md` — структура секций, ТЗ для генерации фото, технические решения. Читай его, если нужно вспомнить «почему» — там зафиксировано.

## Карта файлов

```
demos/composite-panels/
├── CLAUDE.md                 — этот файл
├── README.md                 — внешняя инструкция (как запустить, что доделать)
├── package.json, tsconfig.json, next.config.ts, postcss.config.mjs
├── photo/                    — ИСХОДНИКИ PNG из Higgsfield (~30 МБ каждый),
│                               НЕ попадают в bundle (не в public/)
├── public/
│   ├── images/
│   │   ├── hero/main.webp
│   │   ├── story/phase-1..4.webp          — ScrollStory 4 фазы
│   │   ├── products/{akp,akp-a2,skp,skp-a2,cassette-3d}.webp
│   │   ├── portfolio/{9 объектов}.webp
│   │   ├── production/{main,lab,warehouse}.webp
│   │   ├── case/{before,after}.webp
│   │   └── banners/{material-macro,grand-facade,golden-dusk,manifesto}.webp
│   └── video/
│       ├── material-to-building-scrub.mp4 — для Hero (scrubbing), 3.6 МБ, keyframe в каждом кадре
│       ├── material-to-building.mp4        — старая loop-версия, не используется
│       └── material-to-building-poster.{jpg,webp}
└── src/
    ├── app/
    │   ├── layout.tsx        — шрифты Unbounded + Manrope, metadata
    │   ├── page.tsx          — сборка из секций (порядок важен!)
    │   └── globals.css       — дизайн-токены через @theme (Tailwind v4)
    ├── components/
    │   ├── Header.tsx
    │   ├── ui/{Container,SectionHeader}.tsx
    │   └── sections/         — 14 контентных + 4 banner-секций
    └── data/                 — все статические данные (TS-объекты)
        ├── products.ts, colors.ts, portfolio.ts
        ├── certificates.ts, offices.ts, faq.ts
```

## Стэк

- **Next.js 16** (App Router, Turbopack), `output: "export"` для статической сборки и rsync-деплоя на Nic.ru
- **React 19**
- **TypeScript 5.7** strict mode
- **Tailwind CSS v4** (CSS-first config через `@theme` в `globals.css` — НЕТ `tailwind.config.ts`)
- **Framer Motion 11** — все скролл-анимации
- **lucide-react** — иконки
- **clsx** — условные классы

## Ключевые места кода (где что искать)

| Что | Где |
|-----|-----|
| Видео-scrubbing по скроллу (Hero) | `sections/Hero.tsx` — `useMotionValueEvent` на `videoProgress` |
| Pingpong видео 0→1→0 | `sections/Hero.tsx` — `useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])` |
| KPI counter-up по скроллу | `sections/Hero.tsx` — компонент `AnimatedStat`, `useTransform([0, target])` |
| ScrollStory pinned 5 экранов | `sections/ScrollStory.tsx`, `style={{ height: "500vh" }}` + sticky |
| Каскадный параллакс баннеров | `sections/FullScreenBanner.tsx` — `CascadeItem` с delay по index |
| Драгабельный «до/после» слайдер | `sections/CaseStory.tsx` |
| Калькулятор дилерской маржи | `sections/Calculator.tsx` — pure React, без бэка |
| 4-шаговый квиз | `sections/DealerForm.tsx` — react state, mock-submit |
| 12 цветовых коллекций | `sections/Colors.tsx` — CSS-градиенты + SVG-оверлеи (не фото!) |

## Дизайн-токены

Все в `src/app/globals.css` через `@theme`. Палитра — премиум-архитектурный язык:
- bg: `#FAFAF8` (тёплый offwhite), bg-alt: `#F0EDE8`
- fg: `#0A0A0A` (основной текст)
- accent: `#B26F3A` (медь — единственный акцентный цвет, не вводить новые!)
- dark: `#0F1112` (тёмная тема для banner-секций)

Шрифты:
- Display: **Unbounded** (weights 300, 400, 500, 600, 700)
- Body: **Manrope** (weights 400, 500, 600, 700)

Класс `.h-display` — заголовочный стиль (weight 500). Класс `.h-eyebrow` — мелкие тёгер-заголовки.

## Принципы анимации

Везде используется один паттерн: `useScroll` с `target: ref` + `useTransform` от `scrollYProgress`. Это даёт смуз 60fps без `requestAnimationFrame` руками. Никогда не использовать `useEffect` + `setState` для анимации скролла — будет лагать.

**Hero**: pinned-секция 280vh, текст pingpong (выезжает снизу при заходе, возвращается вниз при выходе), видео pingpong (0→1→0 кадров).
**ScrollStory**: pinned 500vh, 4 фазы по 25% прогресса каждая, cross-fade между ними.
**FullScreenBanner**: НЕ pinned, обычная секция 85-95vh. Параллакс через `offset: ["start end", "end start"]`. Каскад через `CascadeItem` по index.

## Видео-scrubbing — критичные нюансы

Файл `material-to-building-scrub.mp4` перекодирован с `-g 1 -keyint_min 1 -sc_threshold 0` — каждый кадр является I-frame. Это даёт мгновенный seek в любом направлении (вперёд/назад). Без этого scrubbing будет с лагами и фризами на back-seek.

Если будут другие видео в Hero/ScrollStory — кодировать **так же**. Команда (в bash):

```bash
ffmpeg -y -i input.mp4 \
  -vf "scale=1600:900:flags=lanczos" \
  -c:v libx264 -preset faster -crf 27 -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -profile:v high -movflags +faststart \
  -an \
  public/video/output.mp4
```

Целевой вес: 3-5 МБ. crf 27 = разумный компромисс качества и веса.

## Конвертация PNG → WebP

Я использовал ImageMagick (`convert`) для всех скриптов. ffmpeg тоже есть. **Никогда не подключать `sharp`** — не нужно, тяжелит deps.

Шаблон команды:

```bash
convert input.png -resize 1200x900^ -gravity center -extent 1200x900 -strip -quality 85 output.webp
```

Размеры по слотам (логические, 2x для retina):
- Hero / ScrollStory / Production: 2400×1350 (16:9), q=82
- Products / Portfolio: 1200×900 или 1600×1200 (4:3), q=85
- Цвета: 1200×1200 (1:1) — но они НЕ фото, а CSS-градиенты
- Banners: 3000×1300 (21:9), q=80

## Антипаттерны (чего НЕ делать)

- ⛔ Не возвращать Unsplash URL в код — все картинки локальные в `public/images/`. Если нужны новые — кидать PNG в `photo/`, конвертировать ImageMagick'ом.
- ⛔ Не подключать `sharp`, не подключать новые UI-библиотеки. Стэк фиксирован.
- ⛔ Не добавлять `tailwind.config.ts` — Tailwind v4 работает через `@theme` в CSS.
- ⛔ Не использовать `framer-motion`'s `animate()` для скролл-анимации — только `useScroll` + `useTransform`.
- ⛔ Не превращать `<motion.video>` — оборачивать `<video>` в `<motion.div>`.
- ⛔ Не использовать `localStorage`/`sessionStorage` в коде — не нужно, всё в React-state.
- ⛔ Не вызывать `video.currentTime = X` без проверки `Number.isFinite(video.duration)` — крашится seek.

## Известные quirks

1. **`package.json` содержит `@tailwindcss/oxide-linux-arm64-gnu` и `lightningcss-linux-arm64-gnu`** — это linux-нативные бинари, добавлены чтобы build проходил в Linux-sandbox. На darwin-arm64 (mac) они не задействованы, npm их игнорирует. Можно удалить — не сломает.

2. **`tsconfig.json` модифицируется Next.js автоматически** — он добавляет `.next/dev/types/**/*.ts` в `include` после первого `dev`-запуска. Это норм, не откатывать.

3. **`.next/` в sandbox EPERM на rm** — если запускаешь `next build` в моём окружении и видишь `EPERM unlink .next/.fuse_hidden*` — это монтированная FS, не баг кода. На локальной машине пройдёт чисто.

4. **Sticky pinned sections на iOS Safari** иногда дёргаются на длинных секциях. Если будут жалобы — добавить `transform: translateZ(0)` на sticky-контейнер, либо медиа-фолбэк для мобилки.

## Команды

```bash
npm run dev              # localhost:3000
npm run build            # → out/ для деплоя
npm run lint             # next lint
npx tsc --noEmit         # быстрая проверка типов без сборки
```

## Что доделать перед production (актуально на 13.05.2026)

- [ ] Реальные логотипы партнёров в TrustBar (сейчас текстовые названия застройщиков)
- [ ] PDF-каталоги в `public/pdf/`
- [ ] Интеграция формы DealerForm с CRM (amoCRM / Bitrix24) или Telegram-ботом
- [ ] Я.Метрика + цели по `#dealer-form` submit + UTM-разметка
- [ ] OG-image 1200×630 в `public/og.jpg`
- [ ] Favicon-набор (32, 192, 512 + apple-touch-icon 180)
- [ ] `sitemap.xml`, `robots.txt`, `manifest.json`
- [ ] Замена бренда «АЛЮКОМ» на финальный — поменять в 5 местах: `layout.tsx` (metadata), `Header.tsx` (logo + brand), `Footer.tsx` (copyright + logo), `globals.css` (если нужны новые цвета бренда)
- [ ] Реальные цифры KPI от клиента: `1.2 млн м²/год`, `200+`, `47 регионов`, `10 лет` — заменить в `Hero.tsx` `stats`
- [ ] Если клиент не назван — обезличить и положить в `~/Projects/agency/templates/landing-next16/`

## Связи

- Главный CLAUDE.md агентства: `~/Projects/agency/CLAUDE.md`
- Концепт лендинга: `~/Projects/agency/playbook/memory/composite-panels-landing-concept.md`
- Универсальные принципы работы: `~/.claude/CLAUDE.md`
