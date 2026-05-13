"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { Calculator as CalcIcon, ArrowRight } from "lucide-react";

const buildingTypes = [
  { id: "tc", label: "Торговый / БЦ", pricePerM2: 4200, factor: 1.0 },
  { id: "zhk", label: "Жилой комплекс", pricePerM2: 3800, factor: 0.95 },
  { id: "industrial", label: "Промышленный", pricePerM2: 3400, factor: 0.88 },
  { id: "gov", label: "Гос. объект", pricePerM2: 4600, factor: 1.05 },
  { id: "private", label: "Частный объект", pricePerM2: 5200, factor: 1.18 },
];

const collections = [
  { id: "solid", label: "Solid / RAL", multiplier: 1.0 },
  { id: "metal", label: "Metal / Brushed", multiplier: 1.15 },
  { id: "wood", label: "Wood Design", multiplier: 1.28 },
  { id: "rusty", label: "Art-Rusty / Artsib", multiplier: 1.42 },
  { id: "chameleon", label: "Chameleon / Pearl", multiplier: 1.55 },
];

const fireClasses = [
  { id: "g1", label: "Г1 (стандарт)", multiplier: 1.0 },
  { id: "ng", label: "НГ (огнестойкий А2)", multiplier: 1.34 },
];

const dealerDiscounts = [
  { volume: 0, discount: 0, label: "0" },
  { volume: 1000, discount: 0.12, label: "1000 м²" },
  { volume: 5000, discount: 0.18, label: "5000 м²" },
  { volume: 10000, discount: 0.24, label: "10 000 м²" },
  { volume: 20000, discount: 0.30, label: "20 000 м²" },
];

export function Calculator() {
  const [building, setBuilding] = useState("tc");
  const [collection, setCollection] = useState("solid");
  const [fire, setFire] = useState("g1");
  const [area, setArea] = useState(2000);

  const calc = useMemo(() => {
    const b = buildingTypes.find(x => x.id === building)!;
    const c = collections.find(x => x.id === collection)!;
    const f = fireClasses.find(x => x.id === fire)!;

    const base = b.pricePerM2 * c.multiplier * f.multiplier;
    const retail = base * area;

    // Дилерская скидка по объёму
    const tier = [...dealerDiscounts].reverse().find(d => area >= d.volume) ?? dealerDiscounts[0];
    const dealer = retail * (1 - tier.discount);
    const margin = retail - dealer;

    return {
      perM2Retail: Math.round(base),
      perM2Dealer: Math.round(base * (1 - tier.discount)),
      retail: Math.round(retail),
      dealer: Math.round(dealer),
      margin: Math.round(margin),
      discount: tier.discount,
      discountLabel: tier.label,
    };
  }, [building, collection, fire, area]);

  return (
    <section id="calculator" className="py-24 md:py-36 bg-[color:var(--color-bg-alt)]">
      <Container>
        <SectionHeader
          eyebrow="Расчёт"
          title="Калькулятор сметы и дилерской маржи"
          description="Прикиньте бюджет объекта и сразу увидите вашу дилерскую маржу. Цены актуальны на 12 мая 2026, точную смету готовим в течение суток."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)]">
          {/* Параметры */}
          <div className="lg:col-span-7 bg-[color:var(--color-surface)] p-8 md:p-12 space-y-10">
            {/* Тип объекта */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[color:var(--color-fg-muted)] mb-4">
                Тип объекта
              </label>
              <div className="flex flex-wrap gap-2">
                {buildingTypes.map(t => (
                  <Pill key={t.id} active={building === t.id} onClick={() => setBuilding(t.id)}>
                    {t.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Коллекция */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[color:var(--color-fg-muted)] mb-4">
                Коллекция покрытия
              </label>
              <div className="flex flex-wrap gap-2">
                {collections.map(c => (
                  <Pill key={c.id} active={collection === c.id} onClick={() => setCollection(c.id)}>
                    {c.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Класс огнестойкости */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-[color:var(--color-fg-muted)] mb-4">
                Класс пожарной опасности
              </label>
              <div className="flex flex-wrap gap-2">
                {fireClasses.map(f => (
                  <Pill key={f.id} active={fire === f.id} onClick={() => setFire(f.id)}>
                    {f.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Площадь */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <label className="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-fg-muted)]">
                  Площадь фасада
                </label>
                <span className="font-display text-2xl">
                  {area.toLocaleString("ru-RU")} <span className="text-sm text-[color:var(--color-fg-muted)]">м²</span>
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={30000}
                step={100}
                value={area}
                onChange={e => setArea(parseInt(e.target.value))}
                className="w-full accent-[color:var(--color-accent)]"
              />
              <div className="flex justify-between text-xs text-[color:var(--color-fg-subtle)] mt-2">
                <span>100 м²</span>
                <span>5 000</span>
                <span>10 000</span>
                <span>20 000</span>
                <span>30 000+</span>
              </div>
            </div>
          </div>

          {/* Результат */}
          <motion.div
            layout
            className="lg:col-span-5 bg-[color:var(--color-dark)] text-white p-8 md:p-12 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-8">
              <CalcIcon size={18} className="text-[color:var(--color-accent)]" />
              <div className="text-xs tracking-widest uppercase text-white/60">Ваш расчёт</div>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <div className="text-xs text-white/50 mb-1">Розница за м²</div>
                <div className="font-display text-3xl line-through text-white/40">
                  {calc.perM2Retail.toLocaleString("ru-RU")} ₽
                </div>
              </div>

              <div>
                <div className="text-xs text-[color:var(--color-accent)] mb-1">
                  Дилерская цена за м² · скидка {Math.round(calc.discount * 100)}% (от&nbsp;{calc.discountLabel})
                </div>
                <div className="font-display text-5xl text-white">
                  {calc.perM2Dealer.toLocaleString("ru-RU")} <span className="text-2xl">₽</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <Row label="Бюджет розницы" value={`${calc.retail.toLocaleString("ru-RU")} ₽`} muted />
                <Row label="Закупка у нас" value={`${calc.dealer.toLocaleString("ru-RU")} ₽`} />
                <Row label="Ваша маржа" value={`+${calc.margin.toLocaleString("ru-RU")} ₽`} accent />
              </div>
            </div>

            <a href="#dealer-form" className="btn-primary bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white mt-10 justify-center">
              Получить точную смету
              <ArrowRight size={16} />
            </a>
            <p className="text-[11px] text-white/40 mt-4 text-center">
              Расчёт ориентировочный, без монтажа и подсистемы. Точное КП — за 1 рабочий день.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-medium rounded-full transition-all border ${
        active
          ? "bg-[color:var(--color-fg)] text-[color:var(--color-bg)] border-[color:var(--color-fg)]"
          : "bg-[color:var(--color-bg-alt)] text-[color:var(--color-fg)] border-[color:var(--color-border)] hover:border-[color:var(--color-fg)]"
      }`}
    >
      {children}
    </button>
  );
}

function Row({
  label,
  value,
  muted,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={`text-sm ${muted ? "text-white/40" : "text-white/70"}`}>{label}</span>
      <span className={`font-display text-lg ${accent ? "text-[color:var(--color-accent)]" : muted ? "text-white/40" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
