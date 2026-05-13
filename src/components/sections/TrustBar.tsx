import { Container } from "../ui/Container";

const partners = [
  "ПИК", "СУ-155", "ЛСР Group", "ДОН-СТРОЙ", "ИНТЕКО",
  "ГЛАВСТРОЙ", "ГАЛС", "RBI", "ЛенСпецСМУ", "ФСК",
  "Эталон", "Холдинг Setl", "Самолёт", "Брусника",
];

export function TrustBar() {
  return (
    <section className="border-y border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)] py-10 overflow-hidden">
      <Container>
        <p className="text-center text-xs tracking-[0.2em] uppercase text-[color:var(--color-fg-muted)] mb-8">
          Нам доверяют крупнейшие застройщики и подрядчики России
        </p>
      </Container>

      <div className="relative overflow-hidden">
        <div className="flex gap-12 md:gap-20 animate-marquee whitespace-nowrap w-max">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={`${p}-${i}`}
              className="font-display font-medium text-[color:var(--color-fg-muted)] text-xl md:text-2xl tracking-tight opacity-60 hover:opacity-100 transition-opacity"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
