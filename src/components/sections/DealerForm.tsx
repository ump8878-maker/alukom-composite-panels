"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import clsx from "clsx";

type Profile = "dealer" | "construction" | "designer" | "monter";
type Volume = "<1000" | "1000-5000" | "5000-20000" | "20000+";

const steps = [
  { id: "region", title: "Регион" },
  { id: "profile", title: "Ваш профиль" },
  { id: "volume", title: "Объём" },
  { id: "contacts", title: "Контакты" },
];

const profiles: { id: Profile; label: string; description: string }[] = [
  { id: "dealer", label: "Дилер / поставщик", description: "Продаю стройматериалы, есть своя клиентская база" },
  { id: "construction", label: "Строительная компания", description: "Выполняю фасадные работы под ключ" },
  { id: "designer", label: "Проектное бюро", description: "Спецификация и закладка материалов в проекты" },
  { id: "monter", label: "Монтажная бригада", description: "Бригада на сдельной оплате, ищу постоянного поставщика" },
];

const volumes: { id: Volume; label: string; hint: string }[] = [
  { id: "<1000", label: "до 1000 м²", hint: "Проектные продажи" },
  { id: "1000-5000", label: "1000–5000 м²", hint: "Скидка 12–18%" },
  { id: "5000-20000", label: "5000–20 000 м²", hint: "Скидка 18–24%" },
  { id: "20000+", label: "от 20 000 м²", hint: "Скидка 30% + эксклюзив" },
];

const regions = [
  "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань",
  "Нижний Новгород", "Челябинск", "Самара", "Уфа", "Ростов-на-Дону",
  "Краснодар", "Воронеж", "Пермь", "Волгоград", "Красноярск",
  "Хабаровск", "Владивосток", "Тюмень", "Иркутск", "Калининград",
];

export function DealerForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    region: "",
    profile: null as Profile | null,
    volume: null as Volume | null,
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const canProceed =
    (step === 0 && data.region) ||
    (step === 1 && data.profile) ||
    (step === 2 && data.volume) ||
    (step === 3 && data.name && data.phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;
    // В production здесь: отправка в CRM/Telegram-бота
    setSubmitted(true);
  };

  return (
    <section id="dealer-form" className="py-24 md:py-36 bg-[color:var(--color-dark)] text-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-white/85 text-xs font-semibold tracking-wider uppercase mb-6">
              <ShieldCheck size={14} className="text-[color:var(--color-accent)]" />
              Открыты квоты 2026
            </div>
            <h2 className="h-display text-white text-[clamp(2rem,4.5vw,3.75rem)] mb-4 text-balance">
              Стать дилером АЛЮКОМ
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              4 коротких шага. Прозрачные условия. Без обязательств — узнайте дилерскую цену прежде, чем подписывать договор.
            </p>
          </div>

          {submitted ? (
            <SuccessScreen onReset={() => { setSubmitted(false); setStep(0); }} />
          ) : (
            <div className="bg-[color:var(--color-dark-alt)] border border-white/10 p-8 md:p-12">
              {/* Прогресс */}
              <div className="flex items-center gap-2 mb-10">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex-1 flex items-center gap-2">
                    <div
                      className={clsx(
                        "h-1 flex-1 rounded-full transition-colors",
                        i <= step ? "bg-[color:var(--color-accent)]" : "bg-white/10"
                      )}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-white/50 mb-8">
                <span>Шаг {step + 1} из {steps.length}</span>
                <span className="text-[color:var(--color-accent)] font-semibold">
                  {steps[step].title}
                </span>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 0 && (
                      <Step title="В каком регионе вы работаете?">
                        <div className="relative">
                          <input
                            list="regions"
                            value={data.region}
                            onChange={e => setData({ ...data, region: e.target.value })}
                            placeholder="Начните вводить город или регион"
                            className="w-full bg-[color:var(--color-dark)] border border-white/15 px-5 py-4 text-white placeholder:text-white/30 focus:border-[color:var(--color-accent)] outline-none transition-colors"
                          />
                          <datalist id="regions">
                            {regions.map(r => <option key={r} value={r} />)}
                          </datalist>
                        </div>
                        <p className="text-xs text-white/40 mt-4">
                          Подбираем условия с учётом региональной квоты и текущей дилерской сетки.
                        </p>
                      </Step>
                    )}

                    {step === 1 && (
                      <Step title="Кто вы по профилю?">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {profiles.map(p => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setData({ ...data, profile: p.id })}
                              className={clsx(
                                "text-left p-5 border transition-all",
                                data.profile === p.id
                                  ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10"
                                  : "border-white/15 hover:border-white/40"
                              )}
                            >
                              <div className="font-display text-lg mb-1.5">{p.label}</div>
                              <div className="text-xs text-white/60">{p.description}</div>
                            </button>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 2 && (
                      <Step title="Какой объём планируете в год?">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {volumes.map(v => (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => setData({ ...data, volume: v.id })}
                              className={clsx(
                                "text-left p-5 border transition-all",
                                data.volume === v.id
                                  ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10"
                                  : "border-white/15 hover:border-white/40"
                              )}
                            >
                              <div className="font-display text-xl mb-1.5">{v.label}</div>
                              <div className="text-xs text-[color:var(--color-accent)] font-semibold">{v.hint}</div>
                            </button>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 3 && (
                      <Step title="Куда отправить дилерское КП?">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <FormField
                            label="Имя"
                            value={data.name}
                            onChange={v => setData({ ...data, name: v })}
                            placeholder="Иван Иванов"
                            required
                          />
                          <FormField
                            label="Компания"
                            value={data.company}
                            onChange={v => setData({ ...data, company: v })}
                            placeholder="ООО или ИП"
                          />
                          <FormField
                            label="Телефон"
                            value={data.phone}
                            onChange={v => setData({ ...data, phone: v })}
                            placeholder="+7 ___ ___ __ __"
                            required
                            type="tel"
                          />
                          <FormField
                            label="Email"
                            value={data.email}
                            onChange={v => setData({ ...data, email: v })}
                            placeholder="vy@company.ru"
                            type="email"
                          />
                        </div>
                        <p className="text-xs text-white/40 mt-6">
                          Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных. Менеджер свяжется с вами в рабочее время.
                        </p>
                      </Step>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Навигация */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={16} />
                    Назад
                  </button>

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => canProceed && setStep(s => s + 1)}
                      disabled={!canProceed}
                      className="btn-primary bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Дальше
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canProceed}
                      className="btn-primary bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Отправить заявку
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="h-display text-2xl md:text-3xl mb-8 text-balance">{title}</h3>
      {children}
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-white/50 mb-2">
        {label} {required && <span className="text-[color:var(--color-accent)]">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[color:var(--color-dark)] border border-white/15 px-4 py-3 text-white placeholder:text-white/30 focus:border-[color:var(--color-accent)] outline-none transition-colors"
      />
    </label>
  );
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[color:var(--color-dark-alt)] border border-white/10 p-12 md:p-16 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[color:var(--color-accent)] flex items-center justify-center mx-auto mb-8">
        <Check size={28} className="text-white" />
      </div>
      <h3 className="h-display text-3xl md:text-4xl mb-4">Заявка отправлена</h3>
      <p className="text-white/70 max-w-md mx-auto mb-8">
        Менеджер дилерского отдела свяжется в течение 2 рабочих часов. Уточним детали и пришлём дилерское КП с актуальной ценой по вашему региону.
      </p>
      <button onClick={onReset} className="btn-ghost text-white">
        Заполнить ещё одну
        <ArrowRight size={14} />
      </button>
    </motion.div>
  );
}
