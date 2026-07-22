"use client";
import { useState } from "react";

interface AboutProps {
  dict: any; // Server tərəfdən gələn lüğət datası
}

export default function AboutSection({ dict }: AboutProps) {
  const [activeTab, setActiveTab] = useState<"vision" | "mission">("vision");

  const info = dict?.aboutSection || {};

  const visionText = info.visionText || "...";
  const missionText = info.missionText || "...";

  return (
    <section className="py-12 md:py-24 bg-[#fdfdfd] overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 sm:px-10 md:px-12 my-6 md:my-[40px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-40 items-center">
          {/* Sol Tərəf: Şəkil */}
          <div className="relative group lg:col-span-1 flex justify-center lg:justify-start my-8">
            <div className="relative w-full max-w-[700px]">
              {/* Sol tərəfdəki göy dekorativ element şəklin arxasına atıldı */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-4/5 bg-[#004a99] rounded-l-md z-10 hidden md:block shadow-lg"></div>

              {/* Əsas şəkil qutusu */}
              <div className="relative overflow-hidden rounded-lg shadow-2xl bg-white border border-slate-200 z-10">
                <img
                  src="/images/about/Karton-qutu.jpg"
                  alt="Bakı Karton İstehsalat Prosesi"
                  className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>

              {/* Sağ aşağı küncdəki qırmızı "100% Yerli İstehsal" bloku */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-red-600 text-white px-6 py-4 shadow-2xl z-30 flex flex-col items-center justify-center border-b-4 border-red-800">
                <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-1">
                  YERLİ İSTEHSAL
                </span>
              </div>
            </div>
          </div>

          {/* Sağ Tərəf: Mətnlər */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            {/* ... məzmun hissəsi dəyişməz qaldı ... */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 md:w-12 h-[3px] bg-red-600"></div>
                <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                  {info.futureTitle || "İstehsalatın Gələcəyi"}
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-light text-gray-800 leading-tight">
                Bakı{" "}
                <span className="font-extrabold text-[#004a99] uppercase tracking-tighter">
                  Karton
                </span>
              </h3>
            </div>

            <div className="relative group">
              {/* ... */}
              <div className="space-y-4 md:space-y-6 border-l-4 border-[#004a99] pl-4 md:pl-6 py-1 md:py-2">
                <p className="text-lg md:text-2xl font-semibold text-gray-700 leading-snug italic">
                  {info.subQuote ||
                    "2025-ci ildə Dövlət dəstəyi ilə fəaliyyətə başlayan müəssisəmiz..."}
                </p>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {info.mainDesc ||
                    "Azərbaycanın ən müasir və ən böyük karton istehsalçıları arasında..."}
                </p>
              </div>
            </div>

            {/* Tab Sistemi */}
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
                <span className="text-3xl md:text-4xl text-[#004a99] opacity-20 font-serif">
                  "
                </span>
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
