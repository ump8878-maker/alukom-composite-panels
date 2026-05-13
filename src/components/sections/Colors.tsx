"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { collections } from "@/data/colors";
import { Palette, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const categories = [
  { id: "all", label: "Все коллекции" },
  { id: "metal", label: "Металлики" },
  { id: "art", label: "Декоративные" },
  { id: "wood", label: "Дерево" },
  { id: "solid", label: "Solid / RAL" },
  { id: "special", label: "Спецэффекты" },
];

export function Colors() {
  const [active, setActive] = useState("all");

  const filtered = active === "all"
    ? collections
    : collections.filter(c => c.category === active);

  const totalSwatches = collections.reduce((s, c) => s + c.swatchCount, 0);

  return (
    <section id="colors" className="py-24 md:py-36 bg-[color:var(--color-bg-alt)]">
      <Container>
        <SectionHeader
          eyebrow="Цвета и покрытия"
          title={<>{totalSwatches}+ цветов в&nbsp;12&nbsp;коллекциях</>}
          description="От классических RAL до иридесцентных Chameleon. Подбираем образцы под архитектурный проект и присылаем дилеру в течение 3 рабочих дней."
        />

        {/* Фильтры */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={clsx(
                "px-4 py-2 text-sm font-semibold rounded-full transition-all",
                active === c.id
                  ? "bg-[color:var(--color-fg)] text-[color:var(--color-bg)]"
                  : "bg-[color:var(--color-surface)] text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-fg)]"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Сетка коллекций */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((col, i) => (
              <motion.article
                key={col.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group relative bg-[color:var(--color-surface)] overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all"
              >
                <SwatchSurface collectionId={col.id} representative={col.representative} />
                <div className="p-5">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-display font-semibold text-lg">{col.name}</h3>
                    <span className="text-xs font-medium text-[color:var(--color-accent)]">
                      {col.swatchCount} оттенков
                    </span>
                  </div>
                  <p className="text-xs text-[color:var(--color-fg-muted)] leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA-блок под палитрой */}
        <div className="mt-14 flex flex-col md:flex-row md:items-center gap-6 justify-between p-8 md:p-10 bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[color:var(--color-accent-soft)] flex items-center justify-center shrink-0">
              <Palette size={22} className="text-[color:var(--color-accent)]" />
            </div>
            <div>
              <h4 className="font-display text-xl mb-1">Бесплатный набор образцов</h4>
              <p className="text-sm text-[color:var(--color-fg-muted)] max-w-md">
                Дилерам со статусом «активный партнёр» — до 50 шт. в квартал. Доставка по РФ.
              </p>
            </div>
          </div>
          <a href="#dealer" className="btn-primary self-start md:self-auto">
            Заказать образцы
            <ArrowUpRight size={16} />
          </a>
        </div>
      </Container>
    </section>
  );
}

function SwatchSurface({
  collectionId,
  representative,
}: {
  collectionId: string;
  representative: string;
}) {
  // Для каждой коллекции свой эффект — имитирует фактуру материала
  const overlay = getOverlay(collectionId);

  return (
    <div className="relative aspect-square overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        style={{ background: representative }}
      />
      {overlay && (
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={overlay}
        />
      )}
      {/* Блик при наведении */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
        }}
      />
      {/* Лёгкое затемнение снизу — для разделения с подписью */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 100%)",
        }}
      />
    </div>
  );
}

function getOverlay(id: string): React.CSSProperties | null {
  switch (id) {
    case "brushed":
      return {
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 3px)",
      };
    case "metal":
      return {
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 6px)",
      };
    case "wood":
      return {
        backgroundImage:
          "repeating-linear-gradient(2deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 8px), repeating-linear-gradient(89deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 24px)",
      };
    case "rusty":
      return {
        backgroundImage:
          "radial-gradient(circle at 30% 40%, rgba(0,0,0,0.25), transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(circle at 50% 80%, rgba(0,0,0,0.2), transparent 35%)",
      };
    case "artsib":
      return {
        backgroundImage:
          "radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.4), transparent 35%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.2), transparent 40%)",
      };
    case "anodized":
      return {
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 2px)",
      };
    case "chameleon":
      return {
        backgroundImage:
          "linear-gradient(120deg, rgba(96,165,250,0.4) 0%, rgba(168,85,247,0.3) 50%, rgba(34,211,238,0.4) 100%)",
      };
    case "pearl":
      return {
        backgroundImage:
          "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.5), transparent 50%)",
      };
    case "sparkling":
      return {
        backgroundImage:
          "radial-gradient(circle at 10% 20%, white 0.5px, transparent 1px), radial-gradient(circle at 30% 60%, white 0.5px, transparent 1px), radial-gradient(circle at 70% 30%, white 0.4px, transparent 1px), radial-gradient(circle at 85% 80%, white 0.5px, transparent 1px), radial-gradient(circle at 55% 75%, white 0.3px, transparent 1px)",
        backgroundSize: "60px 60px, 80px 80px, 100px 100px, 50px 50px, 70px 70px",
      };
    case "terra":
      return {
        backgroundImage:
          "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1), transparent 50%), repeating-radial-gradient(circle at 50% 50%, transparent 0 6px, rgba(0,0,0,0.05) 6px 7px)",
      };
    case "supermatt":
      return {
        backgroundImage:
          "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.04), transparent 70%)",
      };
    default:
      return null;
  }
}
