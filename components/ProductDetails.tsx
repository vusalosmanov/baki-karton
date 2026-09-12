"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetails({
  mehsul,
  allImages,
  locale,
}: {
  mehsul: any;
  allImages: any[];
  locale: string;
}) {
  const [selectedImage, setSelectedImage] = useState(allImages[0] || mehsul?.image_url);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const getImageUrl = (image: string) => {
    if (!image) return "https://via.placeholder.com/600x600?text=Baki+Karton";
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return typeof window !== "undefined" && window.location.protocol === "https:"
        ? image.replace("http://", "https://")
        : image;
    }
    return `https://bakikarton.az${image.startsWith("/") ? image : `/${image}`}`;
  };

  const validImages =
    allImages && allImages.length > 0 ? allImages.filter(Boolean) : [mehsul?.image_url].filter(Boolean);

  const description: string = mehsul?.description || "";
  const isLong = description.length > 220;

  return (
    <main className="min-h-screen bg-[#0A1F3D] text-slate-100 relative overflow-hidden pb-24">
      {/* İncə diaqonal xətt toxuması — gofra kartonun rəflərinə işarə */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-[#004a99]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14 relative z-10">
        {/* Geri düyməsi — kraft etiket kimi */}
        <Link
          href={`/${locale}/mehsullar`}
          className={`group inline-flex items-center gap-2 px-4 py-2 bg-[#F7F2E4] text-[#0A1F3D] border border-dashed border-[#0A1F3D]/30 rounded-full text-sm font-semibold mb-8 sm:mb-12 shadow-sm transition-all duration-500 hover:border-[#004a99] hover:shadow-md ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          Kataloqa qayıt
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* SOL TƏRƏF: Şəkil */}
          <div
            className={`lg:col-span-6 space-y-4 lg:sticky lg:top-24 transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="relative">
              {/* Kateqoriya etiketi — bir qutuya bərkidilmiş kraft nişan kimi */}
              {mehsul?.category && (
                <div className="absolute -top-3 -left-3 z-20 -rotate-3">
                  <span className="relative inline-block bg-[#F7F2E4] text-[#0A1F3D] text-xs font-bold uppercase tracking-wide px-4 py-2 border border-dashed border-[#0A1F3D]/40 shadow-lg">
                    {mehsul.category}
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0A1F3D]/20 border border-[#0A1F3D]/30" />
                  </span>
                </div>
              )}

              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#071829] border border-white/10 shadow-2xl">
                <img
                  src={getImageUrl(selectedImage || validImages[0])}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.05]"
                  alt={mehsul?.name}
                />
              </div>
            </div>

            {validImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2.5">
                {validImages.map((img: string, i: number) => {
                  const active = selectedImage === img;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                        active
                          ? "ring-2 ring-[#F7F2E4] ring-offset-2 ring-offset-[#0A1F3D] scale-95"
                          : "opacity-50 hover:opacity-90"
                      }`}
                    >
                      <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SAĞ TƏRƏF: Məlumat + Sifariş */}
          <div
            className={`lg:col-span-6 space-y-6 w-full transition-all duration-700 ease-out delay-150 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Məlumat kartı — sol tərəfdə kraft rəngli "cild" xətti ilə */}
            <div className="relative bg-white/[0.04] border border-white/10 rounded-2xl pl-7 pr-8 py-8 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F7F2E4]" />

              <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                {mehsul?.name}
              </h1>

              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                  expanded ? "max-h-[999px]" : "max-h-28"
                }`}
              >
                <p className="text-slate-400 leading-relaxed text-base whitespace-pre-line">
                  {description}
                </p>
              </div>

              {isLong && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F7F2E4] hover:text-white transition-colors"
                >
                  {expanded ? "Qısalt" : "Ətraflı oxu"}
                  <span
                    className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                  >
                    ↓
                  </span>
                </button>
              )}
            </div>

            {/* Sifariş bloku — bilet / ştamp forması */}
            <div className="relative  bg-white text-[#0A1F3D] rounded-2xl px-8 pt-8 pb-7 shadow-2xl">
              {/* Bilet kəsikləri */}
              <span className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A1F3D]" />
              <span className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0A1F3D]" />

              <h3 className="text-xl font-black mb-2">Sifariş vermək istəyirsiniz?</h3>
              <p className="text-sm text-[#0A1F3D]/70 mb-6 leading-relaxed">
                Bu məhsul və ya onun nümunələri ilə bağlı xüsusi sifariş tələbiniz varsa, komandamız
                sizinlə tez əlaqə saxlayacaq.
              </p>
              {/* Qopara bilən xətt */}
              <div className="border-t border-dashed border-[#0A1F3D]/25 pt-6">
                <Link
                  href={`/${locale}/elaqe`}
                  className="group flex items-center justify-center gap-3 w-full py-4 bg-[#0A1F3D] text-white text-center rounded-xl font-bold shadow-lg transition-all duration-300 hover:rotate-[-1deg] hover:scale-[1.02] active:scale-95"
                >
                  Sifariş et / Əlaqə
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}