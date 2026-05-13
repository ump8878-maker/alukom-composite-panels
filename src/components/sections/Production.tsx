"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Activity, FlaskConical, Factory, Boxes } from "lucide-react";

const lines: {
  icon: typeof Factory;
  name: string;
  description: string;
  metric: { value: string; label: string };
  bg?: string;
}[] = [
  {
    icon: Factory,
    name: "Линия каширования",
    description: "Прецизионная склейка алюминиевых листов с минеральной сердцевиной. Контроль адгезии и геометрии в реальном времени.",
    metric: { value: "0,12 мм", label: "точность геометрии" },
  },
  {
    icon: Activity,
    name: "Линия покраски",
    description: "PVDF и PE покрытия с роботизированными форсунками. Шесть слоёв подготовки и финиша.",
    metric: { value: "30 мкм", label: "толщина покрытия" },
  },
  {
    icon: FlaskConical,
    name: "Лаборатория контроля",
    description: "Каждая партия — испытания на огнестойкость, адгезию, цветостойкость, морозоустойчивость, удар.",
    metric: { value: "23", label: "параметра проверки" },
  },
  {
    icon: Boxes,
    name: "Складской комплекс",
    description: "15 000 м² на территории завода. Хранение в условиях стабильной влажности и температуры.",
    metric: { value: "180 ед.", label: "позиций в наличии" },
    bg: "/images/production/warehouse.webp",
  },
];

export function Production() {
  return (
    <section id="production" className="relative py-24 md:py-36 bg-[color:var(--color-dark)] text-white overflow-hidden">
      {/* Декоративные элементы */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
        }}
      />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-5 max-w-xl">
            <div className="h-eyebrow mb-4">Производство</div>
            <h2 className="text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.05] text-white mb-6 text-balance" style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.02em" }}>
              Завод 23 000 м² в&nbsp;Новосибирске
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-10 max-w-md leading-relaxed">
              Четыре производственные линии работают в три смены. Полный цикл от&nbsp;коил-листа до&nbsp;готовой панели — под одной крышей.
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-md">
              <BigStat value="1.2 млн" unit="м²/год" label="мощность" />
              <BigStat value="0,3%" unit="" label="процент брака" />
              <BigStat value="24 ч" unit="" label="отгрузка после оплаты" />
              <BigStat value="48" unit="" label="штатных инженеров" />
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Большое визуальное полотно — placeholder под фото производства */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[16/10] overflow-hidden"
              style={{
                background: "url('/images/production/main.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--color-dark)]/80 via-transparent to-transparent" />

              {/* Плавающие метки на изображении */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-1">
                    Производственный цех №2
                  </div>
                  <div className="font-display text-xl text-white">Линия покраски PVDF</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white">
                  <Activity size={18} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 карточки производственных линий */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {lines.map((line, i) => (
            <motion.div
              key={line.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative bg-[color:var(--color-dark)] p-8 group hover:bg-[color:var(--color-dark-alt)] transition-colors overflow-hidden"
            >
              {line.bg && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundImage: `url(${line.bg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-dark)] via-[color:var(--color-dark)]/85 to-[color:var(--color-dark)]/70" />
                </>
              )}
              <div className="relative">
                <line.icon size={28} className="text-[color:var(--color-accent)] mb-6" />
                <h3 className="font-display font-semibold text-xl mb-3">{line.name}</h3>
                <p className="text-sm text-white/60 mb-8 min-h-[4em]">{line.description}</p>
                <div className="pt-6 border-t border-white/10">
                  <div className="font-display text-2xl">{line.metric.value}</div>
                  <div className="text-xs text-white/50 mt-1">{line.metric.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BigStat({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-2xl md:text-3xl text-white">{value}</span>
        {unit && <span className="text-[color:var(--color-accent)] text-sm font-semibold">{unit}</span>}
      </div>
      <p className="text-xs text-white/50 mt-1">{label}</p>
    </div>
  );
}
