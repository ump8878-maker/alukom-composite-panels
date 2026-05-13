import { Container } from "../ui/Container";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const navColumns = [
  {
    title: "Продукция",
    links: [
      { label: "АКП РФ", href: "#akp" },
      { label: "АКП А2", href: "#akp-a2" },
      { label: "СКП Сталь", href: "#skp" },
      { label: "СКП А2", href: "#skp-a2" },
      { label: "3D-кассеты", href: "#cassette-3d" },
    ],
  },
  {
    title: "Цвета",
    links: [
      { label: "METAL / BRUSHED", href: "#metal" },
      { label: "WOOD DESIGN", href: "#wood" },
      { label: "ART-RUSTY", href: "#rusty" },
      { label: "ARTSIB", href: "#artsib" },
      { label: "Все коллекции", href: "#colors" },
    ],
  },
  {
    title: "Дилерам",
    links: [
      { label: "Условия партнёрства", href: "#dealer" },
      { label: "Скидочная лестница", href: "#dealer" },
      { label: "Маркетинг-фонд", href: "#dealer" },
      { label: "Обучение монтажников", href: "#dealer" },
      { label: "Стать дилером", href: "#dealer-form" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О заводе", href: "#production" },
      { label: "Сертификаты", href: "#certificates" },
      { label: "Портфолио", href: "#portfolio" },
      { label: "Кейсы 2025", href: "#cases" },
      { label: "Контакты", href: "#contacts" },
    ],
  },
];

const downloads = [
  { label: "Каталог продукта 2026", size: "12 МБ" },
  { label: "Каталог объектов 2025", size: "28 МБ" },
  { label: "Каталог цвета 2026", size: "9 МБ" },
  { label: "Инструкция по монтажу", size: "4 МБ" },
  { label: "Методы монтажа", size: "6 МБ" },
  { label: "Прайс 2026", size: "1 МБ" },
];

export function Footer() {
  return (
    <footer id="contacts" className="bg-[color:var(--color-dark)] text-white">
      {/* Контактный блок */}
      <Container className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-5">
            <h3 className="h-display text-3xl md:text-5xl mb-6 text-balance">
              Готовы обсудить ваш проект?
            </h3>
            <p className="text-white/70 max-w-md mb-10">
              Звоните в любой офис, пишите в почту или WhatsApp. Дилерский отдел работает Пн–Пт, 9:00–18:00 по местному времени.
            </p>

            <div className="space-y-5">
              <ContactRow
                icon={Phone}
                label="Единый номер"
                value="8 800 500-33-66"
                href="tel:+78005003366"
                accent
              />
              <ContactRow
                icon={Mail}
                label="Дилерский отдел"
                value="dealer@alukom.ru"
                href="mailto:dealer@alukom.ru"
              />
              <ContactRow
                icon={MapPin}
                label="Завод и центральный офис"
                value="Новосибирск, платформа 3307 км, дом 17, к.2"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-6">
              Материалы для скачивания
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
              {downloads.map(d => (
                <a
                  key={d.label}
                  href="#"
                  className="bg-[color:var(--color-dark)] p-5 flex items-center justify-between gap-4 group hover:bg-[color:var(--color-dark-alt)] transition-colors"
                >
                  <div>
                    <div className="font-medium text-sm">{d.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">PDF · {d.size}</div>
                  </div>
                  <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent)] transition-colors">
                    <ArrowUpRight size={14} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Навигация */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/10">
          {navColumns.map(col => (
            <div key={col.title}>
              <div className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-5">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-white/80 hover:text-[color:var(--color-accent)] transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Подвал */}
      <div className="border-t border-white/10">
        <Container className="py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-white/50">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span>© 2014–2026 АЛЮКОМ · Производство композитных панелей</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="#privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#offer" className="hover:text-white transition-colors">Публичная оферта</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie</a>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
  accent?: boolean;
}) {
  const content = (
    <>
      <span className="w-11 h-11 rounded-full bg-white/8 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-[color:var(--color-accent)]" />
      </span>
      <span>
        <span className="block text-xs text-white/40 mb-0.5">{label}</span>
        <span className={`font-display ${accent ? "text-xl md:text-2xl" : "text-base"} text-white`}>
          {value}
        </span>
      </span>
    </>
  );

  return href ? (
    <a href={href} className="flex items-center gap-4 group">
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-4">{content}</div>
  );
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="2" width="24" height="24" rx="4" fill="currentColor" />
      <path d="M8 18.5L14 7.5L20 18.5H17L14 13L11 18.5H8Z" fill="var(--color-dark)" />
      <rect x="11.5" y="15" width="5" height="1.5" fill="var(--color-dark)" />
    </svg>
  );
}
