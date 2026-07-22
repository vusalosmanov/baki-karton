import NewsContent from "@/components/NewsContent";
import { getDictionary } from "@/lib/get-dictionary";

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  const dict = (await getDictionary(locale as "az" | "en")) as Record<
    string,
    any
  >;
  const t = dict?.news || {};

  let news = [];
  try {
    const res = await fetch("http://83.229.84.217:5000/api/news", {
      next: { revalidate: 60 },
    });
    news = await res.json();
  } catch (error) {
    console.error("Xəbərləri çəkərkən xəta baş verdi:", error);
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* 1. Page Header */}
      <div className="relative bg-[#1a3352] py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-tight">
            {t.title || "Media və "}{" "}
            <span className="text-blue-400">{t.highlight || "Yeniliklər"}</span>
          </h1>
          <p className="mt-4 md:mt-6 text-blue-100/70 max-w-2xl text-base md:text-lg leading-relaxed">
            {t.description ||
              "Bakı Karton MMC-nin ən son nailiyyətləri, istehsalat yenilikləri və sektorun gələcəyi ilə bağlı aktual xəbərlər."}
          </p>
        </div>
      </div>

      {/* 2. Xəbər Kontenti */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-10 relative z-20 pb-16 md:pb-24">
        <NewsContent initialNews={news} locale={locale} dict={dict} />
      </div>

      {/* 3. Newsletter Section (Mobile Optimized) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-24">
        <div className="bg-[#1a3352] rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-2xl">
          {/* Arxa plan üçün zərif işıq effekti */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>

          {/* Sol tərəf: Başlıq və açıqlama */}
          <div className="relative z-10 mb-8 md:mb-0 md:max-w-xl text-center md:text-left">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-2 md:mb-3">
              Abunə olun
            </span>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white leading-snug md:leading-tight mb-3 md:mb-4">
              Ən son yeniliklərdən və elanlardan xəbərdar olun
            </h3>
            <p className="text-blue-100/70 text-sm md:text-lg">
              İstehsalat, məhsullar və şirkət xəbərləri birbaşa e-poçt ünvanınıza gəlsin.
            </p>
          </div>

          {/* Sağ tərəf: Email formu (Mobil uyğunlaşdırılmış) */}
          <div className="relative z-10 w-full md:w-auto">
            <form
              action={async (formData) => {
                "use server";
                const email = formData.get("email");
                console.log("Abunə olan email:", email);
              }}
              className="flex flex-col sm:flex-row gap-3 w-full md:w-[420px]"
            >
              <input
                name="email"
                type="email"
                placeholder="E-poçt ünvanınızı daxil edin"
                className="w-full bg-white/10 border border-white/25 text-white placeholder-blue-200/50 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/15 text-sm transition-all"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#00509D] hover:bg-blue-600 text-white font-semibold px-6 py-3.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 shadow-lg shadow-blue-900/30 text-sm whitespace-nowrap active:scale-95 cursor-pointer"
              >
                Abunə Ol
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}