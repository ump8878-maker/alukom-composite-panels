"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container } from "../ui/Container";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

type Stat = { value: string; label: string };

export function FullScreenBanner({
  image,
  eyebrow,
  title,
  body,
  cta,
  ctaHref = "#dealer",
  stats,
  align = "left",
  height = "90vh",
  tone = "dark",
}: {
  image: string;
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  cta?: string;
  ctaHref?: string;
  stats?: Stat[];
  align?: "left" | "center" | "right";
  height?: string;
  tone?: "dark" | "warm";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Параллакс картинки — двигается медленнее скролла, лёгкий зум
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.08]);

  const isCenter = align === "center";
  const isRight = align === "right";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[color:var(--color-dark)]"
      style={{ height }}
    >
      {/* Картинка с параллаксом */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-[-8%] will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>

      {/* Затемнение */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            tone === "warm"
              ? "linear-gradient(180deg, rgba(40,28,16,0.55) 0%, rgba(20,14,10,0.35) 40%, rgba(15,17,18,0.85) 100%)"
              : "linear-gradient(180deg, rgba(15,17,18,0.65) 0%, rgba(15,17,18,0.35) 40%, rgba(15,17,18,0.85) 100%)",
        }}
      />

      {/* Световое пятно под текстом */}
      <div
        aria-hidden
        className={clsx(
          "absolute inset-y-0 w-[80%] md:w-[55%] pointer-events-none",
          isCenter && "left-1/2 -translate-x-1/2",
          isRight && "right-0",
          align === "left" && "left-0"
        )}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(15,17,18,0.55) 0%, rgba(15,17,18,0.2) 50%, rgba(15,17,18,0) 80%)",
        }}
      />

      <Container className="relative h-full flex items-center">
        <div
          className={clsx(
            "max-w-2xl",
            isCenter && "mx-auto text-center",
            isRight && "ml-auto text-right"
          )}
        >
          {eyebrow && (
            <CascadeItem progress={scrollYProgress} index={0}>
              <div
                className="text-xs font-semibold tracking-[0.3em] uppercase text-[color:var(--color-accent)] mb-5"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
              >
                {eyebrow}
              </div>
            </CascadeItem>
          )}

          <CascadeItem progress={scrollYProgress} index={1}>
            <h2
              className="text-white text-[clamp(2rem,4.2vw,4rem)] leading-[1.04] text-balance mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                textShadow: "0 2px 24px rgba(0,0,0,0.65), 0 1px 2px rgba(0,0,0,0.4)",
              }}
            >
              {title}
            </h2>
          </CascadeItem>

          {body && (
            <CascadeItem progress={scrollYProgress} index={2}>
              <p
                className="text-white/80 text-base md:text-lg max-w-xl mb-8 text-pretty leading-relaxed"
                style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
              >
                {body}
              </p>
            </CascadeItem>
          )}

          {stats && (
            <CascadeItem progress={scrollYProgress} index={3}>
              <div
                className={clsx(
                  "grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-6 mb-10 pt-8 border-t border-white/15",
                  isCenter && "mx-auto max-w-xl"
                )}
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <div
                      className="text-white text-2xl md:text-3xl mb-1 tabular-nums"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.02em" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </CascadeItem>
          )}

          {cta && (
            <CascadeItem progress={scrollYProgress} index={4}>
              <a
                href={ctaHref}
                className={clsx(
                  "inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white text-sm font-semibold transition-all hover:-translate-y-0.5",
                  isCenter && "mx-auto"
                )}
              >
                {cta}
                <ArrowUpRight size={15} />
              </a>
            </CascadeItem>
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * Каскадный элемент: выезжает снизу с задержкой по индексу,
 * держится в середине прокрутки секции, плавно уходит вверх к концу.
 *
 * progress 0 — секция только-только заехала снизу
 * progress 0.5 — секция по центру viewport
 * progress 1 — секция вышла наверх
 */
function CascadeItem({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: ReactNode;
}) {
  // Каскадная задержка — небольшая, чтобы все 5 элементов влезли в [0,1]
  const delay = index * 0.025;

  // Окна — длинные для появления (видно как выезжает), фиксированный exit для всех
  const appearStart = 0.05 + delay;
  const appearEnd = 0.40 + delay;
  const exitStart = 0.65;
  const exitEnd = 0.95;

  // Y-параллакс: 100px ниже → 0 → 0 → -100px вверх
  const y = useTransform(
    progress,
    [0, appearStart, appearEnd, exitStart, exitEnd, 1],
    [100, 100, 0, 0, -100, -100]
  );
  const opacity = useTransform(
    progress,
    [Math.max(0, appearStart - 0.03), appearEnd, exitStart, exitEnd],
    [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ y, opacity }} className="will-change-transform">
      {children}
    </motion.div>
  );
}
