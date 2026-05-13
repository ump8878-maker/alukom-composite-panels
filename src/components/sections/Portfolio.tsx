"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { portfolio, portfolioFilters, type PortfolioCase } from "@/data/portfolio";
import { ArrowUpRight, MapPin, Calendar, Ruler } from "lucide-react";
import clsx from "clsx";

// Используем реальные фото из data/portfolio.ts (item.image). Локальные WebP в /public/images/portfolio/.

export function Portfolio() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return portfolio;
    if (filter === "culture") return portfolio.filter(c => c.type === "culture" || c.type === "sport");
    return portfolio.filter(c => c.type === filter);
  }, [filter]);

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-[color:var(--color-bg)]">
      <Container>
        <SectionHeader
          eyebrow="Портфолио"
          title={<>340+ реализованных объектов<br /><span className="text-[color:var(--color-accent)]">в&nbsp;47 регионах России</span></>}
          description="От школ до аэропортов. Полный каталог объектов 2014–2026 годов — 92 страницы с фото, метражом, заказчиками."
          action={
            <a href="#objects-pdf" className="btn-secondary">
              Каталог объектов 2026
              <ArrowUpRight size={16} />
            </a>
          }
        />

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mb-10">
          {portfolioFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={clsx(
                "px-4 py-2 text-sm font-semibold rounded-full transition-all",
                filter === f.id
                  ? "bg-[color:var(--color-fg)] text-[color:var(--color-bg)]"
                  : "bg-[color:var(--color-bg-alt)] text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-border)] hover:text-[color:var(--color-fg)]"
              )}
            >
              {f.label}
              <span className={clsx(
                "ml-1.5 text-xs",
                filter === f.id ? "text-[color:var(--color-bg)]/70" : "text-[color:var(--color-fg-subtle)]"
              )}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Масонри-сетка */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px] md:auto-rows-[360px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={clsx(
                  "relative group overflow-hidden cursor-pointer",
                  item.featured && "lg:row-span-2"
                )}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/15 backdrop-blur text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1.5 rounded-full border border-white/20">
                    {item.year}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                  <h3 className="font-display text-xl md:text-2xl mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/80 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={12} /> {item.city}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Ruler size={12} /> {item.area.toLocaleString("ru-RU")} м²
                    </span>
                  </div>
                  <div className="text-xs text-[color:var(--color-accent)] font-semibold">
                    {item.material}
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={18} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <a href="#all-objects" className="btn-ghost text-sm">
            Все 340 объектов
            <ArrowUpRight size={14} />
          </a>
        </div>
      </Container>
    </section>
  );
}
