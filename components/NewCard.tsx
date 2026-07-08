"use client";
import Link from "next/link";

interface NewsCardProps {
  title?: string;
  image?: string;
  date?: string;
  category?: string;
  description?: string;
  slug?: string;
  locale: string;
}

export default function NewsCard({
  title,
  image,
  date,
  category,
  description,
  slug,
  locale,
}: NewsCardProps) {
  
  // Kateqoriya rəngləri üçün dinamik funksiya
  const getCategoryColor = (cat: string) => {
    const c = cat.toLowerCase().trim();
    if (c === "rəsmi" || c === "resmi" || c === "official") return "bg-blue-600";
    if (c === "istehsal" || c === "production") return "bg-emerald-600";
    if (c === "blog") return "bg-purple-600";
    return "bg-gray-600";
  };

  const trimmedCategory = category?.trim() || "";
  const categoryBgColor = getCategoryColor(trimmedCategory);

  return (
    <Link href={`/${locale}/xeberler/${slug}`} className="h-full block">
      <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
        
        {/* 1. Şəkil Bölümü */}
        <div className="relative h-60 w-full overflow-hidden bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={title || "News image"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-xs">
              Şəkil yoxdur
            </div>
          )}

          {trimmedCategory && (
            <div className={`absolute top-4 left-4 ${categoryBgColor} text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-lg z-10`}>
              {trimmedCategory}
            </div>
          )}
        </div>

        {/* 2. Mətn və Məlumat Bölümü */}
        <div className="p-6 flex flex-col flex-grow space-y-3">
          {date && (
            <div className="flex items-center text-gray-400 text-[11px] font-medium italic">
              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </div>
          )}

          <h3 className="text-xl font-bold text-[#1a3352] leading-[1.3] group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[52px]">
            {title || "Başlıq tapılmadı"}
          </h3>

          {description && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          )}

          <div className="pt-4 mt-auto border-t border-gray-50 flex justify-between items-center">
            <span className="text-[#1a3352] text-xs font-extrabold uppercase tracking-tighter group-hover:tracking-normal transition-all flex items-center">
              Ətraflı Oxu
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}