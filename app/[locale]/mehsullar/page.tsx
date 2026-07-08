import { getMehsullar } from "@/lib/strapi";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // locale-ni buradan al
  const mehsullar = await getMehsullar();
  return (
    <main className="min-h-screen bg-white">
      {/* HEADER BÖLMƏSİ (Eynilə qalır) */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Məhsul <span className="text-blue-400">Kataloqumuz</span>
          </h1>
        </div>
      </section>

      {/* MƏHSUL SİYAHISI */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {mehsullar && mehsullar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {mehsullar.map((item: any, index: number) => (
              <ProductCard
                key={item.id || index}
                index={index}
                title={item.title}
                Productname={item.Productname}
                description={item.description}
                image={item.image}
                features={item.features}
                slug={item.slug}
                locale={locale}
                // slug={item.slug || "karton-qutu"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Məhsul tapılmadı.
          </div>
        )}
      </section>
    </main>
  );
}
