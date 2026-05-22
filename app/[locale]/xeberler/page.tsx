import { getNews } from "@/lib/strapi";
import NewsContent from "@/components/NewsContent";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  // 1. Locale-i parametrlərdən alırıq
  const { locale } = await params;
  
  // 2. getNews funksiyasına bu locale-i ötürürük ki, 
  // Strapi-dən məhz həmin dildə olan xəbərlər gəlsin
  const newsFromStrapi = await getNews(locale);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* 1. Page Header (Hero Section) */}
      <div className="relative bg-[#1a3352] py-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Media və <span className="text-blue-400">Yeniliklər</span>
          </h1>
          <p className="mt-6 text-blue-100/70 max-w-2xl text-lg leading-relaxed">
            Bakı Karton MMC-nin ən son nailiyyətləri, istehsalat yenilikləri və
            sektorun gələcəyi ilə bağlı aktual xəbərlər.
          </p>
        </div>
      </div>

      {/* 2. Xəbər Kontenti */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-24">
        <NewsContent initialNews={newsFromStrapi} locale={locale} />
      </div>

      {/* 3. Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#1a3352] rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="relative z-10 text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-white">
              Yenilikləri qaçırmayın
            </h2>
            <p className="text-blue-200 mt-2">
              E-poçtunuzu qeyd edin, ən son xəbərlər sizə gəlsin.
            </p>
          </div>
          <div className="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="E-mail ünvanınız"
              className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white outline-none focus:bg-white/20 transition-all w-full md:w-80 placeholder:text-blue-200/50"
            />
            <button className="bg-white text-[#1a3352] px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
              Abunə ol
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}