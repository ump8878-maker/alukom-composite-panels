"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

import { ArrowRight, Download, ShieldCheck, ArrowDown } from "lucide-react";
import { Container } from "../ui/Container";

type Stat = {
  value: string;
  unit: string;
  label: string;
  target: number;
  decimals: number;
  suffix: string;
};

const stats: Stat[] = [
  { value: "1.2 млн", unit: "м²/год", label: "производственная мощность", target: 1.2, decimals: 1, suffix: " млн" },
  { value: "200+", unit: "", label: "цветов и покрытий", target: 200, decimals: 0, suffix: "+" },
  { value: "47", unit: "регионов", label: "география поставок", target: 47, decimals: 0, suffix: "" },
  { value: "10", unit: "лет", label: "гарантия на покрытие", target: 10, decimals: 0, suffix: "" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Инвертированный pingpong: на 0 и 1 — последний кадр (здание широко),
  // в середине 0.5 — первый кадр (макро). Скроллим вниз: здание → приближается → макро → отдаляется → здание.
  const videoProgress = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);

  // Запускаем видео коротко чтобы Safari прогрузил кадры, потом ставим на паузу.
  // Это критично для scrubbing — без user-initiated play seek в Safari работает с лагами.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let stopped = false;

    const init = () => {
      if (stopped) return;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      setDuration(video.duration);

      // Сдвигаем currentTime к ФИНАЛУ ДО play() — прогрев играет последний отрезок видео,
      // а не первый кадр (макро). Пользователь всё равно не видит — video.opacity=0.
      try { video.currentTime = Math.max(0, video.duration - 0.4); } catch {}

      const finalize = () => {
        if (stopped) return;
        // Слушаем "seeked" — браузер отрисовал финальный кадр → fade-in
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          clearTimeout(fallbackTimer);
          if (!stopped) setVideoReady(true);
        };
        const fallbackTimer = setTimeout(() => {
          video.removeEventListener("seeked", onSeeked);
          if (!stopped) setVideoReady(true);
        }, 700);
        video.addEventListener("seeked", onSeeked);
        try { video.currentTime = video.duration - 0.05; } catch {}
      };

      video.play().then(() => {
        if (stopped) return;
        setTimeout(() => {
          if (stopped) return;
          video.pause();
          finalize();
        }, 80);
      }).catch(() => {
        if (stopped) return;
        video.pause();
        finalize();
      });
    };

    if (video.readyState >= 1) init();
    video.addEventListener("loadedmetadata", init);
    video.addEventListener("loadeddata", init);

    return () => {
      stopped = true;
      video.removeEventListener("loadedmetadata", init);
      video.removeEventListener("loadeddata", init);
    };
  }, []);

  // Привязываем currentTime к прогрессу скролла
  // Батчим scrubbing через rAF: не дёргаем video.currentTime на каждый scroll-event,
  // а копим последнее значение и применяем 1 раз за visual frame. Так декодер успевает.
  const pendingTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  useMotionValueEvent(videoProgress, "change", (v) => {
    if (!duration) return;
    pendingTimeRef.current = Math.min(duration - 0.05, Math.max(0, v * duration));
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      const video = videoRef.current;
      const t = pendingTimeRef.current;
      if (!video || t === null) return;
      try {
        video.currentTime = t;
      } catch {}
    });
  });

  // Лёгкое pingpong затемнение тёплым тоном (не чёрный)
  const dimming = useTransform(scrollYProgress, [0, 0.5, 1], [0.32, 0.22, 0.32]);

  // === Симметричный pingpong текст: выезжает снизу к пику 0.5, уезжает вниз обратно ===
  const titleY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [80, 0, 0, 0, 80]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.5, 0.88, 1], [0, 1, 1, 1, 0]);

  const descY = useTransform(scrollYProgress, [0.04, 0.24, 0.5, 0.76, 0.96], [60, 0, 0, 0, 60]);
  const descOpacity = useTransform(scrollYProgress, [0.04, 0.18, 0.5, 0.82, 0.96], [0, 1, 1, 1, 0]);

  const ctaY = useTransform(scrollYProgress, [0.08, 0.28, 0.5, 0.72, 0.92], [50, 0, 0, 0, 50]);
  const ctaOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.5, 0.78, 0.92], [0, 1, 1, 1, 0]);

  // KPI обёртка: появляется с 0.16-0.36, ВИДИМА до 0.92 (пока цифры считаются вверх и обратно).
  // Уезжает только в самом конце 0.92-0.98 — чтобы реверс отсчёта был на экране.
  const kpiY = useTransform(scrollYProgress, [0.16, 0.4, 0.92, 1], [80, 0, 0, 80]);
  const kpiOpacity = useTransform(scrollYProgress, [0.16, 0.36, 0.92, 0.98], [0, 1, 1, 0]);

  const badgeY = useTransform(scrollYProgress, [0, 0.06, 0.5, 0.94, 1], [-30, 0, 0, 0, -30]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.06, 0.5, 0.94, 1], [0, 1, 1, 1, 0]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.04, 0.12], [1, 1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative bg-[#2A241D]"
      style={{ height: "420vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Постер — последний кадр видео (широкий план здания), всегда видим под видео */}
        <img
          src="/images/hero/main.webp"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Видео появляется ПОВЕРХ постера через fade-in только после прогрева,
            когда currentTime уже на финальном кадре — без мелькания первого. */}
        <video
          ref={videoRef}
          src="/video/material-to-building-scrub.mp4"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden
          style={{
            opacity: videoReady ? 1 : 0,
            transition: "opacity 350ms ease-out",
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Лёгкое тёплое затемнение для читаемости текста (не чёрное) */}
        <motion.div
          style={{ opacity: dimming }}
          aria-hidden
          className="absolute inset-0 z-10 bg-[#3A2E20]"
        />

        {/* Виньетка тёплыми тонами — сверху и снизу мягкий fade для читаемости */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,36,29,0.35) 0%, rgba(42,36,29,0.05) 30%, rgba(42,36,29,0.35) 75%, rgba(42,36,29,0.70) 100%)",
          }}
        />

        {/* Сетка фасада */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "92px 92px",
          }}
        />

        <Container className="relative z-20 h-full pt-[72px] pb-12 flex flex-col justify-center">
          <motion.div
            style={{ y: badgeY, opacity: badgeOpacity }}
            className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur text-white/90 text-xs font-medium tracking-wider uppercase mb-7 will-change-transform"
          >
            <ShieldCheck size={13} className="text-[color:var(--color-accent)]" />
            Завод в Новосибирске · С 2014 года
          </motion.div>

          <motion.h1
            style={{
              y: titleY,
              opacity: titleOpacity,
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 24px rgba(0,0,0,0.65), 0 1px 2px rgba(0,0,0,0.4)",
            }}
            className="text-white text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.05] mb-7 text-balance max-w-3xl will-change-transform"
          >
            Завод композитных <span className="text-[color:var(--color-accent)]">панелей</span> от Калининграда до Владивостока
          </motion.h1>

          <motion.p
            style={{ y: descY, opacity: descOpacity, textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
            className="text-white/80 text-base md:text-lg max-w-xl mb-10 text-pretty leading-relaxed will-change-transform"
          >
            Производим алюминиевые и стальные композитные панели для вентилируемых фасадов.
            Открываем дилерские квоты в 32 регионах России на 2026 год.
          </motion.p>

          <motion.div
            style={{ y: ctaY, opacity: ctaOpacity }}
            className="flex flex-wrap items-center gap-3 will-change-transform"
          >
            <a
              href="#dealer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
            >
              Стать дилером
              <ArrowRight size={15} />
            </a>
            <a
              href="#price"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent text-white border border-white/30 hover:bg-white hover:text-[color:var(--color-fg)] hover:border-white text-sm font-semibold transition-all"
            >
              <Download size={15} />
              Прайс 2026 PDF
            </a>
          </motion.div>

          <motion.div
            style={{ y: kpiY, opacity: kpiOpacity }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-14 md:mt-20 pt-10 border-t border-white/15 will-change-transform"
          >
            {stats.map((s, i) => (
              <AnimatedStat key={s.label} stat={s} progress={scrollYProgress} index={i} />
            ))}
          </motion.div>
        </Container>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedStat({
  stat,
  progress,
  index,
}: {
  stat: Stat;
  progress: MotionValue<number>;
  index: number;
}) {
  // Каскадный набор: индексы 0..3 стартуют с шагом 0.04
  const ascendStart = 0.15 + index * 0.04;
  const ascendEnd = ascendStart + 0.2;
  // Обратный отсчёт: тот же шаг, но в зеркальном порядке.
  // Последняя цифра (index=3) первой пошла обратно к нулю.
  const descendStart = 0.67 - index * 0.04;
  const descendEnd = descendStart + 0.2;

  const numberMV = useTransform(
    progress,
    [ascendStart, ascendEnd, descendStart, descendEnd],
    [0, stat.target, stat.target, 0],
    { clamp: true }
  );

  const formatted = useTransform(numberMV, (v) => {
    if (stat.decimals > 0) {
      return v.toFixed(stat.decimals).replace(".", ",");
    }
    return Math.round(v).toLocaleString("ru-RU");
  });

  const itemY = useTransform(
    progress,
    [ascendStart, ascendEnd, descendStart, descendEnd],
    [30, 0, 0, 30],
    { clamp: true }
  );

  // Медь пока счёт идёт (вверх или вниз), белый когда стоит
  const accentMix = useTransform(
    progress,
    [ascendStart, ascendEnd, descendStart, descendEnd],
    [1, 0, 0, 1],
    { clamp: true }
  );
  const color = useTransform(accentMix, (v) =>
    v > 0.05 ? "rgba(178, 111, 58, 1)" : "rgba(255, 255, 255, 1)"
  );

  return (
    <motion.div style={{ y: itemY }} className="will-change-transform">
      <div className="flex items-baseline gap-1.5">
        <motion.span
          className="text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none tabular-nums"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            textShadow: "0 1px 12px rgba(0,0,0,0.5)",
            color,
          }}
        >
          {formatted}
        </motion.span>
        {stat.suffix && (
          <span
            className="text-white text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {stat.suffix}
          </span>
        )}
        {stat.unit && (
          <span className="text-[color:var(--color-accent)] text-xs md:text-sm font-semibold ml-1">
            {stat.unit}
          </span>
        )}
      </div>
      <p className="text-white/60 text-xs mt-1.5 max-w-[140px]">{stat.label}</p>
    </motion.div>
  );
}
