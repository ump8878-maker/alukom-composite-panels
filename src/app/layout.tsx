import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-unbounded",
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "АЛЮКОМ — производство композитных панелей. Дилерская сеть по России",
  description:
    "Завод алюминиевых и стальных композитных панелей. Огнестойкие материалы для фасадов. 200+ цветов и покрытий. Партнёрская программа для дилеров и подрядчиков в 47 регионах.",
  openGraph: {
    title: "АЛЮКОМ — производство композитных панелей",
    description:
      "Завод композитных панелей. Дилерская сеть от Калининграда до Владивостока.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`}>
      <body style={{
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}>
        {children}
      </body>
    </html>
  );
}
