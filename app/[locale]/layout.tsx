// import type { Metadata } from "next";
// import { Geist } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import type { ReactNode } from "react";
// import { getStrapiImageByTitle } from "@/lib/strapi";

// const geist = Geist({ subsets: ["latin"] });

// const isMaintenanceMode = false;

// // 1. DÜZƏLİŞ: params-ı asinxron (Promise) olaraq qəbul edirik
// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;
//   const favIconUrl = await getStrapiImageByTitle("icon");

//   return {
//     title: isMaintenanceMode
//       ? "Texniki İşlər | Bakı Karton"
//       : "Bakı Karton Fabrikası",
//     description: "Azərbaycanın ən böyük karton qablaşdırma istehsalçısı",
//     icons: {
//       icon: favIconUrl || "/favicon.ico",
//     },
//   };
// }

// // 2. DÜZƏLİŞ: RootLayout-da da params-ı Promise olaraq təyin edirik
// export default async function RootLayout({
//   children,
//   params,
// }: {
//   children: ReactNode;
//   params: Promise<{ locale: string }>;
// }) {
//   const { locale } = await params; // params-ı unwrap edirik (açırıq)

//   return (
//     <html lang={locale || "az"} suppressHydrationWarning>
//       <body className={geist.className} suppressHydrationWarning>
//         {isMaintenanceMode ? (
//           <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 text-center">
//             <div className="max-w-2xl">
//               <div className="mb-10 flex justify-center">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-blue-600 blur-3xl opacity-20 animate-pulse"></div>
//                   <div className="relative p-6 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl">
//                     <svg
//                       className="w-16 h-16 text-blue-500 animate-spin-slow"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1.5"
//                         d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="1.5"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
//                 SAYTDA <span className="text-blue-500">TEXNİKİ YENİLƏNMƏ</span>
//               </h1>

//               <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
//                 Hörmətli ziyarətçi, sizə daha peşəkar xidmət göstərmək üçün
//                 sistemlərimizdə profilaktik işlər aparılır. Tezliklə görüşərik!
//               </p>

//               <div className="mt-16 flex flex-col items-center gap-4">
//                 <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
//                 <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">
//                   Bakı Karton Fabrikası — 2026
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <Navbar />
//             <main>{children}</main>
//             <Footer />
//           </>
//         )}
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css"; 
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";
import type { ReactNode } from "react";
import { getStrapiImageByTitle } from "@/lib/strapi";
import { getDictionary } from "@/lib/get-dictionary";

const geist = Geist({ subsets: ["latin"] });

const isMaintenanceMode = false;

// Metadata hissəsini də çoxdilli edirik
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const favIconUrl = await getStrapiImageByTitle("icon");
  const dict = await getDictionary(locale as "az" | "en") as Record<string, any>;
  
  // JSON-da metadata üçün sahələr varsa istifadə et, yoxdursa defolt qalsın
  const m = dict?.metadata || {};

  return {
    title: isMaintenanceMode
      ? (locale === "en" ? "Maintenance Mode | Baku Cardboard" : "Texniki İşlər | Bakı Karton")
      : (m.title || (locale === "en" ? "Baku Cardboard Factory" : "Bakı Karton Fabrikası")),
    description: m.description || (locale === "en" ? "Azerbaijan's largest cardboard packaging manufacturer" : "Azərbaycanın ən böyük karton qablaşdırma istehsalçısı"),
    icons: {
      icon: favIconUrl || "/favicon.ico",
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
  const { locale } = await params; // Dinamik gələn dili açırıq
  

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
            {/* İndi həm locale, həm də dict problemsiz ötürülür */}
            <Navbar locale={locale as "az" | "en"} dict={dict} />
            <main>{children}</main>
            <Footer locale={locale} dict={dict} />
          </>
        )}
      </body>
    </html>
  );
}