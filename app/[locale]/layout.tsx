import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css"; 
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import { getDictionary } from "@/lib/get-dictionary";

const geist = Geist({ subsets: ["latin"] });

const isMaintenanceMode = false;

// Metadata hissəsindən Strapi çıxarıldı
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as "az" | "en") as Record<string, any>;
  
  const m = dict?.metadata || {};

  return {
    title: isMaintenanceMode
      ? (locale === "en" ? "Maintenance Mode | Baku Cardboard" : "Texniki İşlər | Bakı Karton")
      : (m.title || (locale === "en" ? "Baku Cardboard Factory" : "Bakı Karton Fabrikası")),
    description: m.description || (locale === "en" ? "Azerbaijan's largest cardboard packaging manufacturer" : "Azərbaycanın ən böyük karton qablaşdırma istehsalçısı"),
    icons: {
      icon: "/images/about/Baki karton fav.png",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "az" | "en");

  return (
    <html lang={locale || "az"} suppressHydrationWarning>
      <body className={geist.className} suppressHydrationWarning>
        {isMaintenanceMode ? (
          <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
            <h1>{locale === "en" ? "UNDER MAINTENANCE" : "SAYTDA TEXNİKİ YENİLƏNMƏ"}</h1>
          </div>
        ) : (
          <>
            <Navbar locale={locale as "az" | "en"} dict={dict} />
            <main>{children}</main>
            <Footer locale={locale} dict={dict} />
          </>
        )}
      </body>
    </html>
  );
}