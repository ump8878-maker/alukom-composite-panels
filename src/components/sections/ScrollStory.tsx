"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "../ui/Container";
import { ArrowDown } from "lucide-react";

// Слоты под твои финальные фото. Сейчас Unsplash-плейсхолдеры — подмени URL'ами на /images/story/phase-N.webp после генерации.
const phases = [
  {
    id: 1,
    eyebrow: "01 / Производство",
    title: "От проектного бюро —",
    subtitle: "до твоего объекта",
    body: "Полный цикл — 18 рабочих дней. Без посредников, без брокеров, без двойной маржи.",
    image: "/images/story/phase-1.webp",
    align: "left" as const,
  },
  {
    id: 2,
    eyebrow: "02 / Линия покраски",
    title: "Четыре линии — одна смена",
    subtitle: "PVDF · PE · A2 · 3D",
    body: "Каждая партия проходит через 6 слоёв подготовки. Лаборатория проверяет 23 параметра. Брак ниже 0,3%.",
    image: "/images/story/phase-2.webp",
    align: "right" as const,
  },
  {
    id: 3,
    eyebrow: "03 / Логистика",
    title: "Склад в Новосибирске\nи Москве",
    subtitle: "47 регионов · 24 часа на отгрузку",
    body: "От одной паллеты. Прямые контракты с ПЭК, Деловыми Линиями, Байкал-Сервис. До любой точки России — за 7 дней.",
    image: "/images/story/phase-3.webp",
    align: "left" as const,
  },
  {
    id: 4,
    eyebrow: "04 / Сдача объекта",
    title: "Фасад, который стоит\n25 лет",
    subtitle: "С гарантией от завода",
    body: "Без отслоений, выцветания и потёртостей. Замена бракованных листов в течение 14 дней. Скрытые дефекты — без переговоров.",
    image: "/images/story/phase-4.webp",
    align: "right" as const,
  },
];

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative bg-[color:var(--color-dark)] text-white" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Слой картинок / видео */}
        {phases.map((p, i) => {
          const phaseWithMedia = p as typeof p & { video?: string; poster?: string };
          return (
            <PhaseMedia
              key={`img-${p.id}`}
              index={i}
              progress={scrollYProgress}
              src={p.image}
              video={phaseWithMedia.video}
              poster={phaseWithMedia.poster}
            />
          );
        })}

        {/* Затемнение поверх фото — усиленное для читаемости текста */}
        <div
          aria-hidden
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,17,18,0.65) 0%, rgba(15,17,18,0.45) 35%, rgba(15,17,18,0.55) 70%, rgba(15,17,18,0.95) 100%)",
          }}
        />
        {/* Дополнительный горизонтальный вуаль — под текст, чтобы он всегда контрастировал */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,17,18,0.35) 0%, rgba(15,17,18,0.1) 60%, rgba(15,17,18,0) 100%)",
          }}
        />

        {/* Декоративная сетка фасада */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
          }}
        />

        {/* Тексты — каждая фаза абсолютно позиционирована, fade по прогрессу */}
        <Container className="relative z-20 h-full flex items-center">
          <div className="w-full grid grid-cols-12 gap-6 items-center">
            {phases.map((p, i) => (
              <PhaseText key={`txt-${p.id}`} index={i} progress={scrollYProgress} phase={p} />
            ))}
          </div>
        </Container>

        {/* Левый stepper-прогресс */}
        <ProgressIndicator progress={scrollYProgress} />

        {/* Финальный счётчик внизу */}
        <FinalCounter progress={scrollYProgress} />

        {/* Hint снизу для пользователя на первом экране */}
        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}

function PhaseMedia({
  index,
  progress,
  src,
  video,
  poster,
}: {
  index: number;
  progress: MotionValue<number>;
  src: string;
  video?: string;
  poster?: string;
}) {
  // Каждая фаза занимает 25% общего прогресса. Делаем плавные cross-fade.
  const start = index * 0.25;
  const peak = start + 0.125;
  const end = start + 0.25;

  const opacity = useTransform(
    progress,
    index === 0
      ? [0, peak, end, end + 0.05]
      : index === phases.length - 1
        ? [start - 0.05, start, peak, 1]
        : [start - 0.05, start, peak, end, end + 0.05],
    index === 0
      ? [1, 1, 1, 0]
      : index === phases.length - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 1, 0]
  );

  // Микро-зум в течение всей фазы — создаёт ощущение движения камеры.
  // Для видео зум выключен — видео само даёт движение камеры.
  const scale = useTransform(progress, [start, end], video ? [1, 1] : [1.05, 1.18]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 will-change-transform"
    >
      {video ? (
        <video
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
    </motion.div>
  );
}

function PhaseText({
  index,
  progress,
  phase,
}: {
  index: number;
  progress: MotionValue<number>;
  phase: (typeof phases)[number];
}) {
  const start = index * 0.25;
  const fadeIn = start + 0.04;
  const fadeOut = start + 0.20;
  const end = start + 0.25;

  // На первой фазе появление сразу
  const opacityIn = index === 0 ? 0 : start;
  const opacity = useTransform(
    progress,
    [opacityIn, fadeIn, fadeOut, end],
    [index === 0 ? 1 : 0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [opacityIn, fadeIn, fadeOut, end],
    [40, 0, 0, -40]
  );

  const isLeft = phase.align === "left";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`col-span-12 md:col-span-6 ${isLeft ? "md:col-start-1" : "md:col-start-7"} relative`}
    >
      {/* Локальное «световое пятно» затемнения под текстом — для читаемости поверх видео */}
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-10 -z-10 pointer-events-none rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15,17,18,0.65) 0%, rgba(15,17,18,0.35) 50%, rgba(15,17,18,0) 80%)",
          backdropFilter: "blur(2px)",
        }}
      />

      <div
        className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[color:var(--color-accent)] mb-4"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
      >
        {phase.eyebrow}
      </div>
      <h2
        className="text-white text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.05] text-balance mb-5 whitespace-pre-line"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.4)",
        }}
      >
        {phase.title}
      </h2>
      <div
        className="text-lg md:text-xl text-[color:var(--color-accent)] mb-6 text-balance"
        style={{ fontFamily: "var(--font-display)", fontWeight: 400, textShadow: "0 1px 12px rgba(0,0,0,0.7)" }}
      >
        {phase.subtitle}
      </div>
      <p
        className="text-white/80 text-sm md:text-base max-w-md text-pretty leading-relaxed"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
      >
        {phase.body}
      </p>
    </motion.div>
  );
}

function ProgressIndicator({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4 items-center">
      {phases.map((p, i) => (
        <ProgressDot key={`prog-${p.id}`} index={i} total={phases.length} progress={progress} />
      ))}
    </div>
  );
}

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index * 0.25;
  const end = start + 0.25;
  const opacity = useTransform(progress, [start - 0.02, start, end, end + 0.02], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [start - 0.02, start, end, end + 0.02], [0.85, 1, 1, 0.85]);
  const lineFill = useTransform(progress, [start, end], ["0%", "100%"]);

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.div
        style={{ opacity, scale }}
        className="font-display text-xs text-white tabular-nums"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>
      {index < total - 1 && (
        <div className="relative w-px h-16 bg-white/20 overflow-hidden">
          <motion.div
            style={{ height: lineFill }}
            className="absolute top-0 left-0 w-full bg-[color:var(--color-accent)]"
          />
        </div>
      )}
    </div>
  );
}

function FinalCounter({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.85, 0.92, 1], [0, 1, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-baseline gap-6 px-6 py-4 bg-white/8 backdrop-blur border border-white/15 rounded-full"
    >
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl md:text-4xl text-white tabular-nums">18</span>
        <span className="text-xs text-white/60 uppercase tracking-widest">рабочих дней</span>
      </div>
      <div className="w-px h-6 bg-white/20" />
      <div className="text-xs text-white/80 uppercase tracking-widest">
        полный цикл от заказа до отгрузки
      </div>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.04, 0.1], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 right-10 z-30 hidden md:flex items-center gap-3 text-white/60 text-xs uppercase tracking-widest"
    >
      <span>Скролл</span>
      <ArrowDown size={14} className="animate-bounce" />
    </motion.div>
  );
}
