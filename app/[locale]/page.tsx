import AboutSection from "@/components/AboutSection";
import { getDictionary } from "@/lib/get-dictionary";
import Link from "next/link";

// Backend-dən xəbərləri çəkmək üçün funksiya
async function getNews() {
  try {
    const res = await fetch("https://bakikarton.az/api/news", {
      cache: "no-store", // Həmişə ən təzə məlumatı çəkmək üçün
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Xəbərləri çəkərkən xəta baş verdi:", error);
    return [];
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = (await getDictionary(locale as "az" | "en")) as Record<
    string,
    any
  >;
  const t = dict?.home || {};

  // Backend-dən xəbərləri alırıq
  const initialNews = await getNews();
  const latestNews = initialNews.slice(0, 3);
 const BACKEND_URL = "https://bakikarton.az";
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[500px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/haqqimizda/Baki karton-ust.jpg" // Buranı öz şəkil yolunla dəyiş
            alt="Bakı Karton İstehsalat"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-26">
          <div className="max-w-[1700px] text-left bg-black/30 backdrop-blur-[2px] p-8 md:p-12 border-l-4 border-red-600">
            <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-[20px] mb-4 block">
              {t.industryLeader}
            </span>

            <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight uppercase drop-shadow-lg">
              {t.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {t.heroTitle2}
              </span>{" "}
              <br />
              {t.heroTitle3}
            </h2>

            <p className="text-gray-100 mt-6 text-lg border-t border-white/10 pt-6 font-medium italic">
              {t.heroQuote}
            </p>

            <div className="mt-10">
              <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl">
                {t.discoverBtn}
              </button>
            </div>
          </div>
        </div>
      </section>
      <AboutSection dict={dict} />

      {/* Dayanıqlılıq Bölməsi */}
      <section className="relative py-28 group overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
            style={{ backgroundImage: `url('/images/about/eco.webp')` }}
            role="img"
            aria-label="Dayanıqlılıq və Ekologiya"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-emerald-950/40 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-24 border-white/10 pb-16">
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-[2px] bg-red-600"></div>
                <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[14px]">
                  {t.responsibility}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-none">
                {t.sustainability}
              </h2>
            </div>
            <div className="md:col-span-2 md:pl-12 pt-4">
              <p className="text-xl text-gray-200 leading-relaxed font-light italic border-l-4 border-[#004a99]/50 pl-8">
                {t.sustainabilityQuote}
              </p>
            </div>
          </div>

          {/* Kartlar */}
          <div className="relative space-y-16 md:space-y-0 md:grid md:grid-cols-4 md:gap-4 md:items-start">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 hidden md:block transform -translate-y-1/2"></div>

            {/* 1. İstehsalata Dəstək */}
            <div className="relative z-10 md:translate-y-[-30px] group">
              <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:bg-[#004a99]/10 group-hover:border-[#004a99]/30">
                <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-[#004a99] shadow-[0_0_30px_rgba(0,74,153,0.3)] transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t.supportProductionTitle}
                </h4>
                <p className="text-base text-gray-300 leading-relaxed font-normal">
                  {t.supportProductionDesc}
                </p>
              </div>
            </div>

            {/* 2. Sektora Dəstək */}
            <div className="relative z-10 md:translate-y-[60px] group">
              <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:bg-[#004a99]/10 group-hover:border-[#004a99]/30">
                <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-[#004a99] shadow-[0_0_30px_rgba(0,74,153,0.3)] transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t.supportSectorTitle}
                </h4>
                <p className="text-base text-gray-300 leading-relaxed font-normal">
                  {t.supportSectorDesc}
                </p>
              </div>
            </div>

            {/* 3. Daxili Bazara Dəstək */}
            <div className="relative z-10 md:translate-y-[-10px] group">
              <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:bg-[#004a99]/10 group-hover:border-[#004a99]/30">
                <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-[#004a99] shadow-[0_0_30px_rgba(0,74,153,0.3)] transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t.supportMarketTitle}
                </h4>
                <p className="text-base text-gray-300 leading-relaxed font-normal">
                  {t.supportMarketDesc}
                </p>
              </div>
            </div>

            {/* 4. Təkrar Emal */}
            <div className="relative z-10 md:translate-y-[80px] group">
              <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:bg-red-900/20 group-hover:border-red-600/30">
                <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-transform duration-500 group-hover:scale-110">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {t.recyclingTitle}
                </h4>
                <p className="text-base text-gray-300 leading-relaxed font-normal">
                  {t.recyclingDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Məhsul Kateqoriyaları */}
      <section className="py-28 bg-[#f8f9fa]">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-[#004a99]"></div>
                <span className="text-[#004a99] font-bold uppercase tracking-widest text-sm">
                  {t.catalog}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                {t.productGroups.split(" ")[0]}{" "}
                <span className="text-[#004a99]">
                  {t.productGroups.split(" ")[1] || ""}
                </span>
              </h2>
            </div>
            <p className="max-w-md text-slate-500 font-medium leading-relaxed border-l-2 border-slate-200 pl-6">
              {t.productDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 1. Karton Qutu */}
            <div className="group relative cursor-pointer">
              <div className="absolute -inset-4 bg-[#004a99]/5 rounded-[2rem] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-0"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#004a99] transition-colors">
                    {t.boxTitle}
                  </h3>

                  {/* Linki birbaşa bura verdik */}
                  <Link
                    href={`/${locale}/mehsullar/karton-qutu`}
                    className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#004a99] group-hover:border-[#004a99] transition-all duration-500"
                  >
                    <svg
                      className="w-5 h-5 text-slate-400 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Şəkil və Gradient hissəsi */}
                <div className="relative h-[500px] overflow-hidden rounded-xl shadow-xl border border-slate-100">
                  {/* Şəkil buraya əlavə olundu */}
                  <img
                    src="/images/about/Karton-qutu.jpg" // Şəkil yolunu bura qoy
                    alt={t.boxTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover zamanı çıxan yazı və gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004a99]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <span className="text-white/70 text-sm uppercase tracking-widest mb-2">
                      {t.production}
                    </span>
                    <p className="text-white text-lg font-light leading-snug max-w-xs">
                      {t.boxDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Karton List */}
            <div className="group relative cursor-pointer">
              <div className="absolute -inset-4 bg-[#004a99]/5 rounded-[2rem] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-0"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#004a99] transition-colors">
                    {t.listTitle}
                  </h3>
                  <Link href={`/${locale}/mehsullar/karton-list`}>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#004a99] group-hover:border-[#004a99] transition-all duration-500 cursor-pointer">
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="relative h-[500px] overflow-hidden rounded-xl shadow-xl border border-slate-100">
                  <img
                    src="/images/brand/karton-list.jpg" // Şəkil yolunu bura qoy
                    alt={t.listTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004a99]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <span className="text-white/70 text-sm uppercase tracking-widest mb-2">
                      {t.rawMaterial}
                    </span>
                    <p className="text-white text-lg font-light leading-snug max-w-xs">
                      {t.listDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Xəbərlər Bölməsi */}
      <section className="py-28 bg-[#0a192f] overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="h-[2px] w-12 bg-white/30"></span>
                <span className="text-white/60 uppercase tracking-[0.4em] text-xs font-bold">
                  {t?.newsSubtitle || "XƏBƏRLƏR"}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                {t?.newsTitle || "Son Yeniliklər"}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {latestNews.map((news: any) => {
              const rawPath = news.image_url || news.image;
              const imageUrl = rawPath
                ? rawPath.startsWith("http")
                  ? rawPath
                  : `${BACKEND_URL}${rawPath}`
                : null;

              // Tarix formatı
              const formattedDate = news.createdAt
                ? new Date(news.createdAt).toLocaleDateString("az-AZ")
                : news.date || "";

              return (
                <Link
                  key={news.id}
                  href={`/${locale}/xeberler/${news.id}`}
                  className="group relative flex flex-col h-full bg-[#112240] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 shadow-2xl block"
                >
                  <div className="relative h-72 overflow-hidden bg-slate-800">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={news.title || "Xəbər şəkli"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs italic">
                        Şəkil yoxdur
                      </div>
                    )}

                    {/* Tarix etiketi */}
                    {formattedDate && (
                      <div className="absolute top-4 left-4 px-4 py-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 shadow-lg">
                        <span className="text-white text-xs font-bold tracking-wider">
                          {formattedDate}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow space-y-4">
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {news.description}
                    </p>

                    <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">
                        {t?.more || "Ətraflı"}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                        <svg
                          className="w-4 h-4 text-white group-hover:text-[#0a192f] transform group-hover:translate-x-0.5 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bütün xəbərlərə keçid düyməsi */}
          <div className="flex justify-center">
            <Link
              href={`/${locale}/xeberler`}
              className="relative group overflow-hidden px-12 py-4 rounded-full border border-white/20 text-white font-bold tracking-widest uppercase text-xs transition-all duration-500 hover:border-white inline-block text-center"
            >
              <span className="relative z-10 group-hover:text-[#0a192f] transition-colors duration-500">
                {t?.allNewsBtn || "Bütün Xəbərlər"}
              </span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
