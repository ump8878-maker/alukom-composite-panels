"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { products } from "@/data/products";
import { ArrowUpRight, Flame, Shield } from "lucide-react";

export function Products() {
  return (
    <section id="products" className="py-24 md:py-36 bg-[color:var(--color-bg)]">
      <Container>
        <SectionHeader
          eyebrow="Продукция"
          title="Пять линеек под каждый класс объектов"
          description="От базовых АКП для жилого строительства до огнестойкого А2 для высоток и инфраструктуры. Все панели сертифицированы по ФЗ-123 и испытаны в собственной лаборатории."
          action={
            <a href="#price" className="btn-secondary">
              Скачать прайс 2026
              <ArrowUpRight size={16} />
            </a>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[color:var(--color-surface)] border border-[color:var(--color-border)] overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-bg-alt)]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[color:var(--color-fg)] text-[color:var(--color-bg)] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1.5">
                    {p.code}
                  </span>
                  {p.fire === "НГ" && (
                    <span className="bg-[color:var(--color-accent)] text-white text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1.5 inline-flex items-center gap-1">
                      <Flame size={10} /> НГ
                    </span>
                  )}
                </div>
              </div>

              <div className="p-7">
                <h3 className="h-display text-2xl mb-2">{p.name}</h3>
                <p className="text-sm text-[color:var(--color-fg-muted)] mb-6 min-h-[2.5em]">
                  {p.description}
                </p>

                <dl className="space-y-2 mb-6">
                  {p.highlights.map(h => (
                    <div key={h.label} className="flex justify-between text-sm pb-2 border-b border-[color:var(--color-border)] last:border-0">
                      <dt className="text-[color:var(--color-fg-muted)]">{h.label}</dt>
                      <dd className="font-semibold">{h.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.applications.map(a => (
                    <span key={a} className="text-[11px] font-medium px-2.5 py-1 bg-[color:var(--color-bg-alt)] text-[color:var(--color-fg-muted)] rounded-full">
                      {a}
                    </span>
                  ))}
                </div>

                <a href={`#product-${p.id}`} className="btn-ghost text-sm">
                  Технический лист
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.article>
          ))}

          {/* Карточка-CTA для дилеров */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative p-7 md:p-10 bg-[color:var(--color-dark)] text-white overflow-hidden"
          >
            <Shield size={32} className="text-[color:var(--color-accent)] mb-6" />
            <h3 className="h-display text-2xl md:text-3xl mb-3">
              Не знаете, какая линейка подойдёт?
            </h3>
            <p className="text-white/70 text-sm mb-8">
              Технический отдел сделает раскладку и подбор материала под ваш проект — бесплатно. Достаточно прислать чертёж или эскиз фасада.
            </p>
            <a href="#dealer" className="btn-primary bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white">
              Получить подбор
              <ArrowUpRight size={16} />
            </a>
            <div
              aria-hidden
              className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-30"
              style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

