"use client";

import { useEffect, useState } from "react";
import { Container } from "./ui/Container";
import { Menu, Phone, X } from "lucide-react";
import clsx from "clsx";

const nav = [
  { href: "#products", label: "Продукция" },
  { href: "#colors", label: "Цвета" },
  { href: "#portfolio", label: "Объекты" },
  { href: "#dealer", label: "Дилерам" },
  { href: "#calculator", label: "Расчёт" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[color:var(--color-bg)]/85 backdrop-blur-xl border-b border-[color:var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <Container className="flex items-center justify-between h-[72px]">
        <a href="#top" className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight">
          <LogoMark />
          <span>АЛЮКОМ</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map(n => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-[color:var(--color-fg)] hover:text-[color:var(--color-accent)] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+78005003366" className="flex items-center gap-2 text-sm font-semibold">
            <Phone size={16} />
            8 800 500-33-66
          </a>
          <a href="#dealer" className="btn-primary text-sm py-3 px-5">Стать дилером</a>
        </div>

        <button
          aria-label="Меню"
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden bg-[color:var(--color-bg)] border-t border-[color:var(--color-border)]">
          <Container className="py-6 flex flex-col gap-4">
            {nav.map(n => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium py-2"
              >
                {n.label}
              </a>
            ))}
            <a href="tel:+78005003366" className="flex items-center gap-2 font-semibold py-2">
              <Phone size={16} />
              8 800 500-33-66
            </a>
            <a href="#dealer" className="btn-primary justify-center mt-2">Стать дилером</a>
          </Container>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="24" height="24" rx="4" fill="currentColor" />
      <path d="M8 18.5L14 7.5L20 18.5H17L14 13L11 18.5H8Z" fill="var(--color-bg)" />
      <rect x="11.5" y="15" width="5" height="1.5" fill="var(--color-bg)" />
    </svg>
  );
}
