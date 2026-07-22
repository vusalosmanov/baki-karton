import ProductCard from "@/components/ProductCard";

const API_URL = "http://83.229.84.217:5000";

async function getMehsullar() {
  try {
    const res = await fetch(`${API_URL}/mehsullar`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Məhsulları çəkərkən xəta baş verdi:", error);
    return [];
  }
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const mehsullar = await getMehsullar();

  // Yalnız əsas məhsulları saxlayırıq (ID 1, 2, 3 və ya əsas adlar)
  const mainProducts = mehsullar.filter((item: any) =>
    [1, 2, 3].includes(item.id) ||
    ["Karton List", "Karton Tava", "Karton Qutu"].includes(item.name)
  );

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Hero Banner */}
      <section className="relative h-[42vh] md:h-[48vh] min-h-[340px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-[#002B5B] to-slate-900 py-16">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/10 text-blue-300 border border-blue-400/20 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Keyfiyyət və Etibarlılıq
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
            Məhsul{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Kataloqumuz
            </span>
          </h1>
          <p className="mt-5 text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            Sənaye standartlarına uyğun yüksək keyfiyyətli qablaşdırma həlləri
            və karton məhsulları.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {mainProducts && mainProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {mainProducts.map((item: any) => (
              <ProductCard
                key={item.id}
                title={item.name}
                Productname={item.name}
                description={item.description}
                image={item.image_url}
                features={item.category}
                id={item.id.toString()}
                locale={locale}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 px-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-50 text-[#002B5B] rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              📦
            </div>
            <p className="text-slate-500 text-base font-semibold">
              Heç bir məhsul tapılmadı.
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Zəhmət olmasa bir az sonra yenidən yoxlayın.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}