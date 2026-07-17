import Link from "next/link";
import React from "react";

interface FooterProps {
  locale: string;
  dict: any;
}

export default function Footer({ locale, dict }: FooterProps) {
  // Strapi çağırışı silindi
  const f = dict?.footer || {};
  const nav = dict?.navigation || {};

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
              <img
                src="/images/brand/baku-krt-lg.png" 
                alt="Bakı Karton Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              {f.desc || "Azərbaycanın qablaşdırma sənayesində dözümlülüyün və innovasiyanın mərkəzi..."}
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
                  <p className="text-[10px] font-black text-[#004a99] uppercase mb-1">{f.phone || "Telefon"}</p>
                  <a href="tel:+994103182222" className="text-lg font-bold text-slate-800 group-hover:text-[#004a99] transition-colors">
                    +994 (10) 318 22 22
                  </a>
                </div>
                <div className="group">
                  <p className="text-[10px] font-black text-[#004a99] uppercase mb-1">{f.email || "E-poçt"}</p>
                  <a href="mailto:info@bakikarton.az" className="text-lg font-bold text-slate-800 group-hover:text-[#004a99] transition-colors">
                    info@bakikarton.az
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-[#004a99] uppercase mb-1">{f.addressTitle || "Ünvanımız"}</p>
                <p className="text-slate-700 font-bold leading-relaxed">{f.address || "Azərbaycan, Sumqayıt Sənaye Zonası..."}</p>
                <a href="#" className="inline-flex items-center text-xs font-black text-[#004a99] border-b-2 border-[#004a99]/20 hover:border-[#004a99] pb-1 transition-all">
                  {f.mapBtn || "XƏRİTƏDƏ BAX"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Hissə */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {f.copyright || "Baki Karton MMC. Bütün Hüquqlar Qorunur."}
          </p>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Site by:</span>
              <a href="https://www.linkedin.com/in/vusalosmanov/" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-[#004a99] text-[11px] font-black uppercase tracking-widest transition-all duration-300">
                Vusal Osmanov
              </a>
            </div>
            <div className="flex gap-8 border-l border-slate-200 pl-8 hidden md:flex">
              <Link href={`/${locale}/mexfilik`} className="text-slate-400 hover:text-[#004a99] text-[11px] font-bold uppercase tracking-widest transition-colors">
                {f.privacy || "Məxfilik"}
              </Link>
              <Link href={`/${locale}/sartlar`} className="text-slate-400 hover:text-[#004a99] text-[11px] font-bold uppercase tracking-widest transition-colors">
                {f.terms || "Şərtlər"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}