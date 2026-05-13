"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Percent,
  Truck,
  Megaphone,
  Award,
  ArrowUpRight,
  Check,
} from "lucide-react";

const tiers = [
  { volume: "от 1 000 м²", discount: "−12%", title: "Старт", note: "Базовый прайс для первого года" },
  { volume: "от 5 000 м²", discount: "−18%", title: "Активный", note: "+ бесплатные образцы 50 шт/кв" },
  { volume: "от 10 000 м²", discount: "−24%", title: "Региональный", note: "+ эксклюзив на регион" },
  { volume: "от 20 000 м²", discount: "−30%", title: "Стратегический", note: "Индивидуальные условия" },
];

const benefits = [
  {
    icon: Percent,
    title: "Прозрачная скидочная лестница",
    description: "Четыре ступени с понятными порогами. Никаких ретро-бонусов задним числом.",
    items: [
      "Скидка фиксируется на 12 месяцев",
      "Без обязательств по выкупу при «выпадении» из объёма",
      "Пересмотр условий ежеквартально вверх",
    ],
  },
  {
    icon: Truck,
    title: "Логистика по всей России",
    description: "Прямая отгрузка с завода в Новосибирске или со складского комплекса в Москве.",
    items: [
      "От 1 паллеты, без минимального заказа по складу",
      "Партнёрский тариф ПЭК, ДЛ, Байкал-Сервис",
      "Доставка до 7 дней в любую точку РФ",
    ],
  },
  {
    icon: Megaphone,
    title: "Маркетинговая поддержка",
    description: "Не просто прайс — целая система помощи дилеру в продажах.",
    items: [
      "Брендированные презентации и каталоги",
      "Передача лидов из Я.Директ в ваш регион",
      "Совместный фонд: 1.5% от оборота",
    ],
  },
  {
    icon: Award,
    title: "Обучение и поддержка инженеров",
    description: "Технические специалисты решают задачи дилера, как свои.",
    items: [
      "Курсы для монтажников (раз в квартал)",
      "Раскладка фасада под проект — бесплатно",
      "Выезд инженера на крупные объекты",
    ],
  },
];

export function DealerTerms() {
  return (
    <section id="dealer" className="py-24 md:py-36 bg-[color:var(--color-bg)]">
      <Container>
        <SectionHeader
          eyebrow="Дилерам и подрядчикам"
          title={<>Партнёрская программа<br /><span className="text-[color:var(--color-accent)]">от завода напрямую</span></>}
          description="Открываем региональные квоты на 2026 год. Не работаем через посредников — все условия прозрачны и зафиксированы в типовом договоре."
        />

        {/* Лестница скидок */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)] mb-20">
          {tiers.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-[color:var(--color-surface)] p-8 group hover:bg-[color:var(--color-bg-alt)] transition-colors"
            >
              <div className="text-xs font-semibold tracking-widest uppercase text-[color:var(--color-accent)] mb-3">
                {t.title}
              </div>
              <div className="font-display text-3xl md:text-4xl mb-2">{t.discount}</div>
              <div className="text-sm text-[color:var(--color-fg-muted)] mb-1">{t.volume}</div>
              <div className="text-xs text-[color:var(--color-fg-subtle)] mt-4 pt-4 border-t border-[color:var(--color-border)]">
                {t.note}
              </div>
              {/* Линия прогресса */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[color:var(--color-accent)] to-transparent" style={{
                width: `${(i + 1) * 25}%`
              }} />
            </motion.div>
          ))}
        </div>

        {/* 4 блока преимуществ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[color:var(--color-bg-alt)] p-8 md:p-10"
            >
              <div className="w-12 h-12 rounded-full bg-[color:var(--color-fg)] flex items-center justify-center text-[color:var(--color-bg)] mb-6">
                <b.icon size={20} />
              </div>
              <h3 className="font-display text-2xl mb-3">{b.title}</h3>
              <p className="text-[color:var(--color-fg-muted)] text-sm mb-6">{b.description}</p>
              <ul className="space-y-3">
                {b.items.map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[color:var(--color-accent-soft)] flex items-center justify-center">
                      <Check size={11} className="text-[color:var(--color-accent)]" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA-блок */}
        <div className="mt-16 p-10 md:p-14 bg-[color:var(--color-dark)] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="h-eyebrow mb-3 text-white/70">квоты 2026</div>
            <h3 className="h-display text-3xl md:text-4xl mb-3 text-balance">
              Открыто 32 региональных квоты
            </h3>
            <p className="text-white/70 max-w-md">
              Эксклюзивное право на регион — с подтверждённым годовым оборотом от 8000 м². Закроем первых 32 партнёра, остальные регионы — на общих условиях.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="#dealer-form" className="btn-primary bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white">
              Подать заявку
              <ArrowUpRight size={16} />
            </a>
            <a href="#dealer-contract" className="btn-secondary text-white border-white/30 hover:bg-white hover:text-[color:var(--color-fg)]">
              Образец договора
            </a>
          </div>

          {/* Декор */}
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
          />
        </div>
      </Container>
    </section>
  );
}
