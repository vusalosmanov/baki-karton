import Link from "next/link";
import React from "react";
import { getStrapiImageByTitle } from "@/lib/strapi";

interface FooterProps {
  locale: string;
  dict: any;
}

export default async function Footer({ locale, dict }: FooterProps) {
  const logoUrl = await getStrapiImageByTitle("Logo");
  const f = dict?.footer || {};
  const nav = dict?.navigation || {};

  // Dinamik menyu linkləri strukturu
  const menuItems = [
    { name: nav.home || "Ana Səhifə", path: "/" },
    { name: nav.products || "Məhsullarımız", path: "/mehsullar" },
    { name: nav.newsTitle || "Xəbərlər", path: "/xeberler" },
    { name: nav.about || "Haqqımızda", path: "/haqqimizda" },
    { name: nav.contact || "Əlaqə", path: "/elaqe" },
  ];

  return (
    <footer className="bg-white text-slate-900 pt-24 pb-12 border-t border-slate-100">
      <div className="max-w-[1700px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* 1. Logo və Şirkət Haqqında */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Bakı Karton Logo"
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#004a99] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    B
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-[#004a99]">
                    BAKI KARTON
                  </span>
                </div>
              )}
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {f.desc ||
                "Azərbaycanın qablaşdırma sənayesində dözümlülüyün və innovasiyanın mərkəzi..."}
            </p>
          </div>

          {/* 2. Sürətli Keçidlər */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
              {f.menuTitle || "Menyu"}
            </h4>
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {/* Linklərin əvvəlinə dili (/az və ya /en) avtomatik əlavə edirik */}
                  <Link
                    href={`/${locale}${item.path}`}
                    className="text-slate-600 hover:text-[#004a99] font-semibold transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Əlaqə Bölməsi */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">
              {f.contactTitle || "Bizimlə Əlaqə"}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="group">
                  <p className="text-[10px] font-black text-[#004a99] uppercase mb-1">
                    {f.phone || "Telefon"}
                  </p>
                  <a
                    href="tel:+994103182222"
                    className="text-lg font-bold text-slate-800 group-hover:text-[#004a99] transition-colors"
                  >
                    +994 (10) 318 22 22
                  </a>
                </div>
                <div className="group">
                  <p className="text-[10px] font-black text-[#004a99] uppercase mb-1">
                    {f.email || "E-poçt"}
                  </p>
                  <a
                    href="mailto:info@bakikarton.az"
                    className="text-lg font-bold text-slate-800 group-hover:text-[#004a99] transition-colors"
                  >
                    info@bakikarton.az
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-[#004a99] uppercase mb-1">
                  {f.addressTitle || "Ünvanımız"}
                </p>
                <p className="text-slate-700 font-bold leading-relaxed">
                  {f.address || "Azərbaycan, Sumqayıt Sənaye Zonası..."}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-xs font-black text-[#004a99] border-b-2 border-[#004a99]/20 hover:border-[#004a99] pb-1 transition-all"
                >
                  {f.mapBtn || "XƏRİTƏDƏ BAX"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Hissə - Copyright & Credits */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Sol tərəf: Müəllif hüquqları */}
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()}{" "}
            {f.copyright || "Baki Karton MMC. Bütün Hüquqlar Qorunur."}
          </p>

          {/* Sağ tərəf: Hazırlayan və Şərtlər */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">
                Site by:
              </span>
              <a
                href="https://www.linkedin.com/in/vusalosmanov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-800 hover:text-[#004a99] text-[11px] font-black uppercase tracking-widest transition-all duration-300 border-b border-transparent hover:border-[#004a99]"
              >
                Vusal Osmanov
              </a>
            </div>

            {/* Digər linklər */}
            <div className="flex gap-8 border-l border-slate-200 pl-8 hidden md:flex">
              <Link
                href={`/${locale}/mexfilik`}
                className="text-slate-400 hover:text-[#004a99] text-[11px] font-bold uppercase tracking-widest transition-colors"
              >
                {f.privacy || "Məxfilik"}
              </Link>
              <Link
                href={`/${locale}/sartlar`}
                className="text-slate-400 hover:text-[#004a99] text-[11px] font-bold uppercase tracking-widest transition-colors"
              >
                {f.terms || "Şərtlər"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
