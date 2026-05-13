import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { Products } from "@/components/sections/Products";
import { Colors } from "@/components/sections/Colors";
import { Production } from "@/components/sections/Production";
import { Portfolio } from "@/components/sections/Portfolio";
import { DealerTerms } from "@/components/sections/DealerTerms";
import { Calculator } from "@/components/sections/Calculator";
import { Certificates } from "@/components/sections/Certificates";
import { Geography } from "@/components/sections/Geography";
import { CaseStory } from "@/components/sections/CaseStory";
import { FAQ } from "@/components/sections/FAQ";
import { DealerForm } from "@/components/sections/DealerForm";
import { Footer } from "@/components/sections/Footer";
import { FullScreenBanner } from "@/components/sections/FullScreenBanner";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ScrollStory />
        <Products />

        {/* Полноэкранный баннер — фактура champagne фасада */}
        <FullScreenBanner
          image="/images/banners/material-macro.webp"
          eyebrow="Материал"
          title={
            <>
              200+ цветов, <br />4 типа покрытия, <br />одно качество
            </>
          }
          body="От базового PE до огнестойкого А2. Толщина 3, 4 и 6 мм. Гладкие, рустованные, 3D-кассеты. Подбираем материал под класс объекта и бюджет."
          align="left"
          height="85vh"
        />

        <Colors />
        <Production />
        <Portfolio />

        {/* Полноэкранный баннер — премиум-объект на закате */}
        <FullScreenBanner
          image="/images/banners/grand-facade.webp"
          eyebrow="Объекты"
          title={
            <>
              340+ зданий по всей <br />России, от&nbsp;Калининграда <br />до Владивостока
            </>
          }
          body="Жилые комплексы, бизнес-центры, аэропорты, спортивные арены и культурные объекты. Полный каталог — 92 страницы с фото, метражом и заказчиками."
          cta="Каталог объектов 2026"
          ctaHref="#objects-pdf"
          stats={[
            { value: "340+", label: "объектов" },
            { value: "2,3 млн м²", label: "общая площадь" },
            { value: "47", label: "регионов РФ" },
          ]}
          align="right"
          height="95vh"
          tone="warm"
        />

        <DealerTerms />
        <Calculator />
        <CaseStory />

        {/* Полноэкранный баннер — лаборатория, доверие через цифры */}
        <FullScreenBanner
          image="/images/production/lab.webp"
          eyebrow="Контроль качества"
          title={<>Каждая партия — паспорт<br />и протокол испытаний</>}
          body="Собственная аккредитованная лаборатория проверяет 23 параметра на каждой выпускаемой партии: огнестойкость, адгезия, цветостойкость, морозоустойчивость, ударная прочность."
          stats={[
            { value: "23", label: "параметра проверки" },
            { value: "0,3%", label: "процент брака" },
            { value: "25 лет", label: "гарантия покрытия" },
          ]}
          align="right"
          height="90vh"
        />

        <Certificates />
        <Geography />
        <FAQ />

        {/* Финальный манифест перед формой дилера */}
        <FullScreenBanner
          image="/images/banners/manifesto.webp"
          eyebrow="Квоты 2026"
          title={
            <>
              Открыто 32 региональных <span className="text-[color:var(--color-accent)]">квоты</span>
            </>
          }
          body="Эксклюзивное право на регион — с подтверждённым годовым оборотом от 8000 м². Закроем первых 32 партнёра, остальные регионы — на общих условиях. Подайте заявку, пока ваш регион свободен."
          cta="Подать заявку дилера"
          ctaHref="#dealer-form"
          align="center"
          height="95vh"
          tone="warm"
        />

        <DealerForm />
      </main>
      <Footer />
    </>
  );
}
