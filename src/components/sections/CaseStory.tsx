"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { ArrowUpRight, Quote } from "lucide-react";

const beforeImg = "/images/case/before.webp";
const afterImg = "/images/case/after.webp";

const stats = [
  { value: "8 400", unit: "м²", label: "фасада обновлено" },
  { value: "4 мес", unit: "", label: "монтаж под ключ" },
  { value: "−34%", unit: "", label: "теплопотери" },
  { value: "25 лет", unit: "", label: "гарантия" },
];

export function CaseStory() {
  const [position, setPosition] = useState(50);

  return (
    <section className="py-24 md:py-36 bg-[color:var(--color-bg)]">
      <Container>
        <SectionHeader
          eyebrow="Кейс года"
          title={<>ЖК «Кедровая аллея»<br /><span className="text-[color:var(--color-accent)]">Новосибирск, 2025</span></>}
          description="Реконструкция фасадов трёх домов 1985 года: панельный ремонт, утепление, новые вентилируемые фасады из АКП РФ. Заказчик — застройщик «СибПромСтрой»."
        />

        {/* Слайдер до/после */}
        <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--color-bg-alt)] select-none mb-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${afterImg})` }}
          />
          <div
            className="absolute inset-y-0 left-0 bg-cover bg-center overflow-hidden"
            style={{
              width: `${position}%`,
              backgroundImage: `url(${beforeImg})`,
              backgroundSize: "auto 100%",
              backgroundPosition: "left center",
              filter: "saturate(0.6) contrast(0.95)",
            }}
          >
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Лейблы */}
          <div className="absolute top-6 left-6 z-10">
            <div className="bg-black/60 backdrop-blur text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5">
              До · 2023
            </div>
          </div>
          <div className="absolute top-6 right-6 z-10">
            <div className="bg-[color:var(--color-accent)] text-white text-xs font-semibold tracking-widest uppercase px-3 py-1.5">
              После · 2025
            </div>
          </div>

          {/* Разделитель */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.4)] z-10 pointer-events-none"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 6L1 10L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M15 6L19 10L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={e => setPosition(parseInt(e.target.value))}
            aria-label="До и после"
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          />
        </div>

        {/* Статистика + цитата */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)]">
          <div className="bg-[color:var(--color-surface)] p-10 md:p-14">
            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-4xl">{s.value}</span>
                    {s.unit && <span className="text-[color:var(--color-accent)] font-semibold">{s.unit}</span>}
                  </div>
                  <div className="text-sm text-[color:var(--color-fg-muted)] mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-[color:var(--color-dark)] text-white p-10 md:p-14 flex flex-col justify-between gap-8 relative overflow-hidden">
            {/* Фоновое фото-атмосфера за цитатой */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{ backgroundImage: "url('/images/banners/golden-dusk.webp')" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-dark)] via-[color:var(--color-dark)]/85 to-[color:var(--color-dark)]/60"
            />
            <Quote size={36} className="text-[color:var(--color-accent)] opacity-70 relative z-10" />

            <blockquote className="text-lg md:text-xl leading-relaxed text-white/90 relative z-10">
              «Изначально брали АКП А2 на 2 корпуса — после первого года решили перевести и третий. У АЛЮКОМ есть редкая для рынка штука: технический отдел готов считать раскладку под нестандартные углы фасада за один день».
            </blockquote>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[color:var(--color-accent)] flex items-center justify-center font-display font-semibold text-lg text-white">
                АС
              </div>
              <div>
                <div className="font-display font-semibold">Артём Соколов</div>
                <div className="text-xs text-white/60">Технический директор · «СибПромСтрой»</div>
              </div>
            </div>

            <a href="#all-cases" className="btn-ghost text-sm text-white hover:text-[color:var(--color-accent)] relative z-10">
              Все кейсы 2025
              <ArrowUpRight size={14} />
            </a>

            <div
              aria-hidden
              className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
