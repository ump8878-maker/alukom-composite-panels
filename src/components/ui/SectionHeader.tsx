import { type ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-20"
          : "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20"
      }
    >
      <div className={align === "center" ? "" : "max-w-2xl"}>
        {eyebrow && <div className="h-eyebrow mb-4">{eyebrow}</div>}
        <h2 className="h-display text-[clamp(2rem,4.5vw,3.75rem)]">{title}</h2>
        {description && (
          <p className="text-[color:var(--color-fg-muted)] text-base md:text-lg mt-5 max-w-xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
