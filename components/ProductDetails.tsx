"use client";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetails({
  mehsul,
  allImages,
  locale,
}: {
  mehsul: any;
  allImages: any[];
  locale: string;
}) {
  // Seçilmiş aktiv şəkli idarə etmək üçün state
  const [selectedImage, setSelectedImage] = useState(allImages[0] || mehsul?.image_url);

  // Şəkil yolunu düzgün formaya salan funksiya
  const getImageUrl = (image: string) => {
    if (!image) return "https://via.placeholder.com/600x600?text=Baki+Karton";
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return typeof window !== "undefined" && window.location.protocol === "https:"
        ? image.replace("http://", "https://")
        : image;
    }
    return `https://bakikarton.az${image.startsWith("/") ? image : `/${image}`}`;
  };

  const validImages = allImages && allImages.length > 0 ? allImages.filter(Boolean) : [mehsul?.image_url].filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        <Link
          href={`/${locale}/mehsullar`}
          className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-[#002B5B] hover:text-white hover:border-[#002B5B] transition-all duration-300 text-sm font-semibold mb-8 sm:mb-12 shadow-sm"
        >
          Kataloqa qayıt
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* SOL TƏRƏF: Böyük Şəkil və Qalereya */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl bg-slate-50 relative flex items-center justify-center">
                <img
                  src={getImageUrl(selectedImage || validImages[0])}
                  className="w-full h-full object-cover transition-all duration-300"
                  alt={mehsul?.name}
                />
              </div>
            </div>

            {/* Kiçik Şəkillərin Grid Siyahısı (Qalereya) */}
            {validImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {validImages.map((img: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden bg-slate-50 border-2 cursor-pointer transition-all ${
                      selectedImage === img ? "border-[#002B5B] scale-95 shadow-md" : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SAĞ TƏRƏF: Məlumatlar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                {mehsul?.category && (
                  <span className="inline-block px-3 py-1 bg-blue-50 text-[#002B5B] text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                    {mehsul.category}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-black text-[#002B5B] mb-4 leading-tight">
                  {mehsul?.name}
                </h1>
                <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                  {mehsul?.description}
                </p>
              </div>

              <div className="p-8 bg-gradient-to-br from-[#002B5B] to-[#004a99] rounded-3xl text-white shadow-xl">
                <h3 className="text-xl font-bold mb-3">Sifariş vermək istəyirsiniz?</h3>
                <p className="text-sm text-blue-100 mb-8 leading-relaxed">
                  Bu məhsul və ya onun nümunələri ilə bağlı xüsusi sifariş tələbiniz varsa, bizimlə əlaqə saxlayın.
                </p>
                <Link
                  href={`/${locale}/elaqe`}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-white text-[#002B5B] hover:bg-slate-50 text-center rounded-xl font-bold shadow-lg"
                >
                  Sifariş et / Əlaqə
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}