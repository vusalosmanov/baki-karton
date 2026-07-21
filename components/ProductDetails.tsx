"use client";
import Link from "next/link";

export default function ProductDetails({
  mehsul,
  allImages,
  locale,
}: {
  mehsul: any;
  allImages: any[];
  locale: string;
}) {
  const BACKEND_URL = "http://83.229.84.217:5000";

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Geri Qayıt Düyməsi */}
        <Link
          href={`/${locale}/mehsullar`}
          className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-[#002B5B] hover:text-white hover:border-[#002B5B] transition-all duration-300 text-sm font-semibold mb-8 sm:mb-12 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kataloqa qayıt
        </Link>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* SOL TƏRƏF: Məhsul Növləri (Variants) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#002B5B] mb-2">Məhsul Çeşidləri</h2>
              <div className="w-16 h-1 bg-[#00509D] rounded-full"></div>
            </div>

            {mehsul.product_variants?.map((variant: any, i: number) => (
              <div
                key={i}
                className="group flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#00509D]/20 transition-all duration-300"
              >
                {/* Şəkil */}
                <div className="sm:w-2/5 aspect-[4/3] sm:aspect-square overflow-hidden rounded-2xl bg-slate-50 relative flex items-center justify-center">
                  <img
                    src={variant.image_url ? `${BACKEND_URL}${variant.image_url}` : "/placeholder.png"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={variant.title || "Məhsul şəkli"}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>

                {/* Məlumat */}
                <div className="sm:w-3/5 flex flex-col justify-center py-2">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#00509D] transition-colors mb-3">
                    {variant.title || "Növün adı"}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {variant.description || "Təsvir əlavə olunmayıb."}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* SAĞ TƏRƏF: Sticky Məlumat Paneli */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-8">
              
              {/* Başlıq və Ümumi Təsvir */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h1 className="text-3xl sm:text-4xl font-black text-[#002B5B] mb-4 leading-tight">
                  {mehsul.title}
                </h1>
                <p className="text-slate-600 leading-relaxed text-base">
                  {mehsul.description}
                </p>
              </div>

              {/* Texniki Göstəricilər */}
              {mehsul.features && mehsul.features.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-3">
                    <span className="w-6 h-px bg-slate-300"></span>
                    Texniki Göstəricilər
                    <span className="w-6 h-px bg-slate-300"></span>
                  </h4>
                  <div className="space-y-3">
                    {mehsul.features.map((f: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="mt-0.5">
                          {/* Mavi Check İkonu */}
                          <svg className="w-5 h-5 text-[#00509D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700 text-sm font-semibold">
                          {typeof f === 'string' ? f : (f.text || f.feature_item)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sifariş / Əlaqə Qutusu */}
              <div className="p-8 bg-gradient-to-br from-[#002B5B] to-[#004a99] rounded-3xl text-white shadow-xl relative overflow-hidden">
                {/* Arxa fon bəzəyi (Decorative circle) */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                
                <h3 className="text-xl font-bold mb-3 relative z-10">Sifariş vermək istəyirsiniz?</h3>
                <p className="text-sm text-blue-100 mb-8 relative z-10 leading-relaxed">
                  Bu məhsul üçün xüsusi ölçü, dizayn və ya toplu sifariş tələbiniz varsa, bizimlə dərhal əlaqə saxlayın.
                </p>
                
                <Link
                  href={`/${locale}/elaqe`}
                  className="relative z-10 flex items-center justify-center gap-3 w-full py-4 bg-white text-[#002B5B] hover:bg-slate-50 text-center rounded-xl font-bold transition-transform duration-300 hover:scale-[1.02] shadow-lg"
                >
                  <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  WhatsApp ilə Sifariş
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}