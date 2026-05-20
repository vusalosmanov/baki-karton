"use client";
import { useState } from "react";

interface AboutProps {
  image: string | null;
  dict: any; // Server tərəfdən gələn lüğət datası
}

export default function AboutSection({ image, dict }: AboutProps) {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");

  // JSON daxilindəki mətnləri çəkirik (əgər tapılmazsa sənin köhnə kodundakı mətnlər defolt olaraq qalır)
  const info = dict?.aboutSection || {};
  
  const visionText = info.visionText || '"Güvənli, keyfiyyətli və zamanında istehsal" sloqanıyla modern texnologiyaya sahib avadanlıqlarla müştəri məmnuniyyətini ən üst səviyyəyə çıxarmaq...';
  const missionText = info.missionText || "Keyfiyyət və qiymətdə rəqabət edilə bilinməyəcək bir məqama çataraq, karlı və davamlı böyüməni dayanıqlı bir hala gətirmək. Büzməli karton və ambalaj sektorunda güvənilən, seçilən və kağız karton sektorunda lider olmaqdır.";

  return (
    <section className="py-12 md:py-24 bg-[#fdfdfd] overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 md:px-12 my-6 md:my-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-40 items-center">
          
          {/* Sol Tərəf: Şəkil */}
          <div className="relative group lg:col-span-1 flex justify-center lg:justify-start">
            <div className="relative z-10 p-2 md:p-4 rounded-sm overflow-hidden w-full max-w-[700px]">
              <div className="overflow-hidden rounded-sm">
                {image ? (
                  <img
                    src={image}
                    alt="Bakı Karton İstehsalat Prosesi"
                    className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover transform hover:scale-110 transition-transform duration-1000 ease-in-out"
                  />
                ) : (
                  <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] bg-gray-50 flex items-center justify-center italic text-gray-400 border border-gray-100 rounded-sm">
                    {dict?.locale === "en" ? "Loading image..." : "Şəkil yüklənir..."}
                  </div>
                )}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 md:-bottom-8 md:-right-8 bg-red-600 text-white p-4 md:p-7 hidden sm:block z-30 shadow-[0_15px_40px_rgba(220,38,38,0.3)] rounded-sm group-hover:scale-105 transition-transform duration-300">
              <p className="text-2xl md:text-3xl font-extrabold tracking-tight">100%</p>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mt-1">
                {info.localProduction || "Yerli İstehsal"}
              </p>
            </div>
          </div>

          {/* Sağ Tərəf: Mətnlər */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 md:w-12 h-[3px] bg-red-600"></div>
                <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                  {info.futureTitle || "İstehsalatın Gələcəyi"}
                </span>
              </div>

              <h3 className="text-3xl md:text-5xl font-light text-gray-800 leading-tight">
                Bakı <span className="font-extrabold text-[#004a99] uppercase tracking-tighter">Karton</span>
              </h3>
            </div>
            
            <div className="relative group">
              <span className="absolute -top-6 -left-4 md:-top-10 md:-left-6 text-[100px] md:text-[150px] font-black text-gray-100 select-none -z-10 opacity-50">
                B
              </span>

              <div className="space-y-4 md:space-y-6 border-l-4 border-[#004a99] pl-4 md:pl-6 py-1 md:py-2">
                <p className="text-lg md:text-2xl font-semibold text-gray-700 leading-snug italic">
                  {info.subQuote || '"2025-ci ildə Dövlət dəstəyi ilə fəaliyyətə başlayan müəssisəmiz..."'}
                </p>

                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {info.mainDesc || "Azərbaycanın ən müasir və ən böyük karton istehsalçıları arasında..."}
                </p>
              </div>
            </div>

            {/* Tab Sistemi (Vizyon / Missiya) */}
            <div className="pt-2">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("vision")}
                  className={`px-4 md:px-6 py-3 font-bold text-xs md:text-sm uppercase tracking-wider transition-all ${activeTab === "vision" ? "border-b-2 border-[#004a99] text-[#004a99]" : "text-gray-400"}`}
                >
                  {info.visionTab || "Vizyonumuz"}
                </button>
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`px-4 md:px-6 py-3 font-bold text-xs md:text-sm uppercase tracking-wider transition-all ${activeTab === "mission" ? "border-b-2 border-[#004a99] text-[#004a99]" : "text-gray-400"}`}
                >
                  {info.missionTab || "Missiyamız"}
                </button>
              </div>

              <div className="py-4 md:py-6 italic text-gray-500 flex items-start space-x-3 md:space-x-4 min-h-[140px] md:min-h-[180px] animate-fadeIn">
                <span className="text-3xl md:text-4xl text-[#004a99] opacity-20 font-serif">"</span>
                <p className="text-sm md:text-base leading-relaxed transition-opacity duration-300">
                  {activeTab === "vision" ? visionText : missionText}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}