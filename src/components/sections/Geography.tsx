"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { offices, type Office } from "@/data/offices";
import { Building2, Warehouse, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import clsx from "clsx";

const typeMeta: Record<Office["type"], { label: string; icon: typeof MapPin }> = {
  head: { label: "Завод", icon: Building2 },
  branch: { label: "Офис", icon: MapPin },
  warehouse: { label: "Склад", icon: Warehouse },
};

export function Geography() {
  const [active, setActive] = useState<string>("novosib");
  const current = offices.find(o => o.id === active) ?? offices[0];
  const CurrentIcon = typeMeta[current.type].icon;

  return (
    <section id="geography" className="py-24 md:py-36 bg-[color:var(--color-bg-alt)]">
      <Container>
        <SectionHeader
          eyebrow="География"
          title="10 представительств от Калининграда до Владивостока"
          description="Завод в Новосибирске, центральный офис и склад в Москве, региональные представительства в 8 городах. Сервис и логистика рядом с дилером — в каждом часовом поясе."
        />

        {/* Топ-полоса с метриками */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)] mb-12">
          {[
            { value: "10", label: "представительств" },
            { value: "47", label: "регионов поставок" },
            { value: "24 ч", label: "отгрузка после оплаты" },
            { value: "7 дней", label: "доставка до любой точки" },
          ].map(m => (
            <div key={m.label} className="bg-[color:var(--color-surface)] p-6 md:p-8">
              <div className="font-display text-3xl md:text-4xl mb-1">{m.value}</div>
              <div className="text-xs text-[color:var(--color-fg-muted)] uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)]">
          {/* Список офисов слева */}
          <div className="lg:col-span-7 bg-[color:var(--color-surface)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[color:var(--color-border)]">
              {offices.map(o => {
                const Icon = typeMeta[o.type].icon;
                const isActive = active === o.id;
                return (
                  <button
                    key={o.id}
                    onMouseEnter={() => setActive(o.id)}
                    onFocus={() => setActive(o.id)}
                    onClick={() => setActive(o.id)}
                    className={clsx(
                      "relative text-left p-5 md:p-6 transition-all",
                      isActive
                        ? "bg-[color:var(--color-fg)] text-[color:var(--color-bg)]"
                        : "bg-[color:var(--color-surface)] hover:bg-[color:var(--color-bg-alt)]"
                    )}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Icon
                        size={16}
                        className={isActive ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-fg-muted)]"}
                      />
                      {o.type === "head" && (
                        <span className={clsx(
                          "text-[10px] tracking-widest uppercase font-semibold px-2 py-0.5",
                          isActive
                            ? "bg-[color:var(--color-accent)] text-white"
                            : "bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]"
                        )}>
                          Завод
                        </span>
                      )}
                    </div>
                    <div className="font-display text-lg md:text-xl mb-1">{o.city}</div>
                    <div className={clsx(
                      "text-xs",
                      isActive ? "text-[color:var(--color-bg)]/60" : "text-[color:var(--color-fg-subtle)]"
                    )}>
                      {typeMeta[o.type].label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Активный офис справа */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5 bg-[color:var(--color-dark)] text-white p-8 md:p-12 flex flex-col relative overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-6">
              <CurrentIcon size={18} className="text-[color:var(--color-accent)]" />
              <div className="text-xs tracking-widest uppercase text-white/60">
                {typeMeta[current.type].label}
              </div>
            </div>

            <h3 className="font-display text-3xl md:text-4xl mb-8">{current.city}</h3>

            <div className="space-y-5 text-sm">
              <div className="flex gap-3">
                <MapPin size={16} className="text-white/40 shrink-0 mt-0.5" />
                <span className="text-white/80">{current.address}</span>
              </div>
              <div className="flex gap-3">
                <Phone size={16} className="text-white/40 shrink-0 mt-0.5" />
                <a
                  href={`tel:${current.phone.replace(/\D/g, "")}`}
                  className="text-white hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {current.phone}
                </a>
              </div>
              <div className="flex gap-3">
                <Mail size={16} className="text-white/40 shrink-0 mt-0.5" />
                <a
                  href={`mailto:${current.email}`}
                  className="text-white hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {current.email}
                </a>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-white/40 mb-1">Часы работы</div>
                <div className="text-sm">Пн–Пт, 9:00 – 18:00</div>
              </div>
              <a
                href={`#contact-${current.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--color-accent)] hover:text-white transition-colors"
              >
                Подробнее
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div
              aria-hidden
              className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-15 pointer-events-none"
              style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
