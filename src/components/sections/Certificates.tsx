"use client";

import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { certificates } from "@/data/certificates";
import { FileText, Download } from "lucide-react";

export function Certificates() {
  return (
    <section id="certificates" className="py-24 md:py-36 bg-[color:var(--color-bg)]">
      <Container>
        <SectionHeader
          eyebrow="Документы и сертификаты"
          title="Полный комплект документов на каждую партию"
          description="Сертификаты для прохождения экспертизы проектной документации, протоколы испытаний, паспорта качества — всё в едином пакете при отгрузке."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)]">
          {certificates.map((c, i) => (
            <motion.a
              key={c.id}
              href={`#cert-${c.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-[color:var(--color-surface)] p-6 hover:bg-[color:var(--color-bg-alt)] transition-colors"
            >
              {/* Превью документа */}
              <div className="relative aspect-[3/4] mb-5 bg-gradient-to-br from-[color:var(--color-bg-alt)] to-[color:var(--color-border)] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent 0 8px, rgba(0,0,0,0.04) 8px 9px), repeating-linear-gradient(90deg, transparent 0 20px, rgba(0,0,0,0.025) 20px 21px)",
                  }}
                />
                <FileText size={32} className="absolute top-4 left-4 text-[color:var(--color-fg-subtle)]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] tracking-widest uppercase text-[color:var(--color-accent)] mb-1">
                    Действует до {c.validUntil}
                  </div>
                  <div className="font-mono text-[10px] text-[color:var(--color-fg-muted)] truncate">
                    {c.number}
                  </div>
                </div>

                {/* Goldfoil-эффект */}
                <div
                  className="absolute top-3 right-3 w-10 h-10 rounded-full opacity-80"
                  style={{
                    background: "radial-gradient(circle, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                    boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.3)",
                  }}
                />

                {/* Hover-эффект */}
                <div className="absolute inset-0 bg-[color:var(--color-fg)]/0 group-hover:bg-[color:var(--color-fg)]/85 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white inline-flex items-center gap-2 text-sm font-semibold">
                    <Download size={16} />
                    Скачать PDF
                  </div>
                </div>
              </div>

              <h3 className="font-display text-sm leading-tight mb-2 line-clamp-2 min-h-[2.5em]">
                {c.title}
              </h3>
              <div className="text-xs text-[color:var(--color-fg-muted)] line-clamp-1">{c.issuer}</div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
