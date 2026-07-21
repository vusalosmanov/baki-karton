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

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Məhsul <span className="text-blue-400">Kataloqumuz</span>
          </h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        {mehsullar && mehsullar.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {mehsullar.map((item: any, index: number) => (
              <ProductCard
                key={item.id}
                title={item.name}
                Productname={item.name}
                description={item.description}
                image={item.image_url}
                features={item.category}
                id={item.id.toString()} // ID-ni string-ə çeviririk
                locale={locale}
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
