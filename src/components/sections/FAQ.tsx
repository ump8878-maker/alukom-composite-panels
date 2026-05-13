"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { faq } from "@/data/faq";
import { Plus, MessageCircle } from "lucide-react";

export function FAQ() {
  const [open, setOpen] = useState<string | null>("min-order");

  return (
    <section id="faq" className="py-24 md:py-36 bg-[color:var(--color-bg-alt)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Левая колонка — заголовок */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="h-eyebrow mb-4">Частые вопросы</div>
              <h2 className="h-display text-[clamp(2rem,3.5vw,3.25rem)] mb-6 text-balance">
                Что спрашивают будущие дилеры
              </h2>
              <p className="text-[color:var(--color-fg-muted)] mb-10">
                Если не нашли ответа — задайте вопрос менеджеру дилерского отдела, ответим в течение часа в рабочее время.
              </p>

              <a href="#dealer-form" className="inline-flex items-center gap-3 group">
                <span className="w-12 h-12 rounded-full bg-[color:var(--color-fg)] text-[color:var(--color-bg)] flex items-center justify-center group-hover:bg-[color:var(--color-accent)] transition-colors">
                  <MessageCircle size={18} />
                </span>
                <span>
                  <span className="block text-xs text-[color:var(--color-fg-muted)]">Задать вопрос</span>
                  <span className="block font-semibold">dealer@alukom.ru</span>
                </span>
              </a>
            </div>
          </div>

          {/* Правая колонка — аккордеон */}
          <div className="lg:col-span-8">
            <div className="border-t border-[color:var(--color-border-strong)]">
              {faq.map(item => {
                const isOpen = open === item.id;
                return (
                  <div key={item.id} className="border-b border-[color:var(--color-border-strong)]">
                    <button
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
                    >
                      <span className="font-display text-lg md:text-xl pr-4 group-hover:text-[color:var(--color-accent)] transition-colors">
                        {item.question}
                      </span>
                      <span
                        className={`shrink-0 w-10 h-10 rounded-full border border-[color:var(--color-border-strong)] flex items-center justify-center transition-all ${
                          isOpen ? "bg-[color:var(--color-fg)] text-[color:var(--color-bg)] border-[color:var(--color-fg)] rotate-45" : ""
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pr-14 text-[color:var(--color-fg-muted)] leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
