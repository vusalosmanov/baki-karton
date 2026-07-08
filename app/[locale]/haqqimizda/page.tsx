import { getDictionary } from "@/lib/get-dictionary";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  // `params` obyektini Next.js 15 standartına uyğun olaraq təhlükəsiz şəkildə await edirik
  const { locale } = await params;

    const { getStrapiImageByTitle } = await import("@/lib/strapi");
    const homeImage = await getStrapiImageByTitle("Home-image");
    const fabricVizual = await getStrapiImageByTitle("fabric-vizual");

  const dict = await getDictionary(locale as "az" | "en") as Record<string, any>;
  const ap = dict?.aboutPage || {};
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          {homeImage ? (
            <img
              src={homeImage}
              alt={ap.title || "Haqqımızda"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a192f]/95 via-[#0a192f]/80 to-transparent z-10"></div>
        </div>

        <div className="relative z-20 max-w-[1700px] mx-auto w-full px-6 sm:px-10 md:px-12">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            <div className="inline-block">
              <span className="text-red-700 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm bg-white/10 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded">
                {ap.whoWeAre || "Biz Kimik?"}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight md:leading-none">
              {ap.title || "HAQQIMIZDA"}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-medium max-w-xl">
              {ap.subTitle || "Bakı Karton: Qablaşdırmada Keyfiyyət..."}
            </p>
            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-medium max-w-xl">
              {ap.ecoFriendly || "100% TƏBİƏT DOSTU"}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-24 relative overflow-hidden px-6 sm:px-10 md:px-12">
        <div className="max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            {/* Sol Sütun - Mətnlər */}
            <div className="lg:col-span-8 space-y-10 md:space-y-16">
              <div className="space-y-4 md:space-y-8">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium border-l-4 border-[#004a99] pl-4 md:pl-8">
                    <span className="font-black text-[#004a99]">
                      Bakı Karton
                    </span>{" "}
                    {ap.leadText?.replace("Bakı Karton", "") ||
                      "ölkəmizin aparıcı karton qutu istehsalçısıdır..."}
                  </p>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed pl-5 md:pl-9">
                    {ap.subText ||
                      "Müasir texnologiyalar və peşəkar komandamızın təcrübəsi ilə..."}
                  </p>
                </div>
              </div>

              {/* Blok 1: İqtisadiyyat */}
              <div className="group p-6 md:p-10 rounded-2xl md:rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                  <span className="w-8 md:w-12 h-[2px] bg-[#004a99]"></span>
                  {ap.economyTitle || "Ölkə İqtisadiyyatına Dəstək"}
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                    {ap.economyDesc1 ||
                      "Bakı Karton olaraq fəaliyyətimizlə ölkə iqtisadiyyatına..."}
                  </p>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                    {ap.economyDesc2 ||
                      "Əməkdaşlarımızın məşğulluğunu təmin etməklə yanaşı..."}
                  </p>
                </div>
              </div>

              {/* Blok 2: Geri Dönüşüm */}
              <div className="group p-6 md:p-10 rounded-2xl md:rounded-3xl bg-[#004a99]/5 border border-[#004a99]/10 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 flex items-center gap-3 md:gap-4">
                  <span className="w-8 md:w-12 h-[2px] bg-green-600"></span>
                  {ap.recycleTitle || "Təbiəti Qorumaq üçün Geri Dönüşüm"}
                </h2>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                    {ap.recycleDesc1 ||
                      "Ətraf mühitin mühafizəsi Bakı Karton-un əsas prioritetidir..."}
                  </p>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                    {ap.recycleDesc2 ||
                      "Məhsullarımızın əsas xammalı olan karton tam təkrar emal..."}
                  </p>
                </div>
              </div>

              {/* Sitat Hissəsi */}
              <div className="pt-4 md:pt-8 space-y-4 md:space-y-6">
                <p className="text-lg md:text-xl font-bold text-slate-800 leading-relaxed italic">
                  {ap.quote || "Bakı Karton-u seçməklə siz..."}
                </p>
                <p className="text-[#004a99] font-black tracking-wider md:tracking-widest uppercase text-xs md:text-sm">
                  {ap.target ||
                    "Bizim məqsədimiz – biznesinizi inkişaf etdirməkdir."}
                </p>
              </div>
            </div>

            {/* Sağ Sütun - Şəkil və Komanda Sitatı */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8">
              <div className="aspect-square bg-slate-100 rounded-2xl md:rounded-3xl overflow-hidden relative group max-w-md mx-auto lg:max-w-none w-full">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                  {fabricVizual ? (
                    <img
                      src={fabricVizual}
                      alt="Bakı Karton Fabriki"
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900" />
                  )}
                </div>
              </div>
              <div className="p-6 md:p-8 bg-[#0a192f] rounded-2xl md:rounded-3xl text-white max-w-md mx-auto lg:max-w-none w-full">
                <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 italic">
                  {ap.teamQuote || '"Gələcəyi birlikdə paketləyirik."'}
                </h4>
                <p className="text-slate-400 text-xs md:text-sm italic">
                  {ap.teamSign || "- Bakı Karton Komandası"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

