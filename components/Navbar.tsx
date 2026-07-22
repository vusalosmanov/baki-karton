"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownItem {
  href: string;
  label: string;
}

interface NavLink {
  href: string;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

interface NavbarProps {
  locale: "az" | "en";
  dict: any;
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  
  const pathname = usePathname();
  const n = dict?.navigation || {};

const navLinks: NavLink[] = [
    { href: `/${locale}/haqqimizda`, label: n.about || "Haqqımızda" },
    { 
      href: `/${locale}/mehsullar`, 
      label: n.products || "Məhsullar",
      hasDropdown: true,
      dropdownItems: [
        { href: `/${locale}/mehsullar/3`, label: n.box || "Karton Qutu" },
        { href: `/${locale}/mehsullar/1`, label: n.sheet || "Karton List" },
        { href: `/${locale}/mehsullar/2`, label: n.tray || "Karton Tava" }
      ]
    },
    { href: `/${locale}/xidmetler`, label: n.services || "Xidmətlər" },
    { href: `/${locale}/xeberler`, label: n.news || "Xəbərlər" },
    { href: `/${locale}/media`, label: n.media || "Media" },
    { href: `/${locale}/karyera`, label: n.careers || "Karyera" },
    { href: `/${locale}/elaqe`, label: n.contact || "Əlaqə" },
  ];

  const getLanguageLink = (targetLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    return segments.join("/");
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 py-4 px-6 md:px-12 border-b border-gray-100">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between h-[60px]">

        {/* Loqo Bölməsi */}
        <div className="flex-shrink-0">
          <Link href={`/${locale}`}>
            <img 
              src="/images/brand/baku-krt-lg.png" 
              alt="Bakı Karton" 
              className="h-12 md:h-16 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* Masaüstü Menyu */}
        <nav className="hidden lg:flex items-center space-x-9 h-full">
          {navLinks.map((link) => (
            <div key={link.href} className="relative group h-full flex items-center">
              <Link
                href={link.href}
                className="text-[#1a2e35] group-hover:text-red-600 text-[16px] font-semibold flex items-center transition-colors py-2"
              >
                {link.label}
                {link.hasDropdown && (
                  <svg className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>

              {link.hasDropdown && (
                <div className="absolute top-full left-0 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden py-2">
                    {link.dropdownItems?.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-6 py-3 text-sm font-bold text-[#1a2e35] hover:bg-gray-50 hover:text-red-600 transition-all border-b border-gray-50 last:border-0"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Dil Seçimi & Mobil Düymə */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-[#1a2e35] font-bold text-sm border-l pl-6 border-gray-100">
            <Link href={getLanguageLink("az")} className={`transition-colors ${locale === "az" ? "text-red-600 underline" : "text-gray-400 hover:text-red-600"}`}>AZ</Link>
            <span className="w-[1px] h-3 bg-gray-200"></span>
            <Link href={getLanguageLink("en")} className={`transition-colors ${locale === "en" ? "text-red-600 underline" : "text-gray-400 hover:text-red-600"}`}>EN</Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-[#1a2e35] hover:text-red-600 transition-colors">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobil Menyu Paneli */}
      <div className={`lg:hidden fixed inset-x-0 top-[93px] bottom-0 bg-white z-40 border-t border-gray-100 transition-all duration-300 transform ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}>
        <div className="flex flex-col h-full overflow-y-auto p-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.href}>
              {link.hasDropdown ? (
                <div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-50">
                    {/* Yazının üzərinə basanda birbaşa məhsullar səhifəsinə gedir və menyunu bağlayır */}
                    <Link 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="text-lg font-semibold text-[#1a2e35] hover:text-red-600 flex-1"
                    >
                      {link.label}
                    </Link>
                    {/* Ox işarəsinə basanda yalnız alt menyu açılır/bağlanır */}
                    <button 
                      onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)} 
                      className="p-2 text-[#1a2e35] hover:text-red-600"
                    >
                      <svg className={`w-5 h-5 transition-transform duration-200 ${isMobileDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className={`pl-4 space-y-2 overflow-hidden transition-all duration-300 ${isMobileDropdownOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    {link.dropdownItems?.map((subLink) => (
                      <Link key={subLink.href} href={subLink.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-base font-medium text-gray-600 hover:text-red-600">
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-lg font-semibold text-[#1a2e35] hover:text-red-600 border-b border-gray-50">{link.label}</Link>
              )}
            </div>
          ))}

          {/* Mobil üçün Dil Seçimi */}
          <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-center space-x-6">
            <Link 
              href={getLanguageLink("az")} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-bold text-base px-4 py-2 rounded-lg ${locale === "az" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              AZ
            </Link>
            <Link 
              href={getLanguageLink("en")} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-bold text-base px-4 py-2 rounded-lg ${locale === "en" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700"}`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}