import NewsContent from "@/components/NewsContent";
import { getDictionary } from "@/lib/get-dictionary";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "az" | "en") as Record<string, any>;
  const t = dict?.news || {};
  
  // Flask API-dan xəbərləri canlı çəkirik
  let news = [];
  try {
    const res = await fetch("http://83.229.84.217:5000/api/news", {
      next: { revalidate: 60 } 
    });
    news = await res.json();
  } catch (error) {
    console.error("Xəbərləri çəkərkən xəta baş verdi:", error);
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* 1. Page Header */}
      <div className="relative bg-[#1a3352] py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {t.title || "Media və "} <span className="text-blue-400">{t.highlight || "Yeniliklər"}</span>
          </h1>
          <p className="mt-6 text-blue-100/70 max-w-2xl text-lg leading-relaxed">
            {t.description || "Bakı Karton MMC-nin ən son nailiyyətləri, istehsalat yenilikləri və sektorun gələcəyi ilə bağlı aktual xəbərlər."}
          </p>
        </div>
      </div>

      {/* 2. Xəbər Kontenti */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-24">
        <NewsContent initialNews={news} locale={locale} dict={dict} />
      </div>

      {/* 3. Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#1a3352] rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
           {/* Newsletter kodlarınız burada qalır */}
        </div>
      </div>
    </main>
  );
}