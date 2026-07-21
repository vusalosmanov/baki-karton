"use client";

import React, { useState, useEffect } from "react";

interface KaryeraPageProps {
  dict: any;
}

export default function KaryeraPage({ dict }: KaryeraPageProps) {
  const t = dict;

  const [activeCareerId, setActiveCareerId] = useState("recruitment");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const careerData = [
    {
      id: "recruitment",
      title: t.recruitment.title,
      shortDesc: t.recruitment.shortDesc,
      fullDesc: (
        <>
          {t.recruitment.headDesc}
          <br />
          <br />
          {t.recruitment.mainDescPart1}
          <br />
          <span className="font-bold text-slate-800">Bakı Karton</span>
          {t.recruitment.mainDescPart2}
        </>
      ),
      icon: (
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: "education",
      title: t.education.title,
      shortDesc: t.education.shortDesc,
      fullDesc: (
        <>
          {t.education.descPart1}
          <br />
          <br />
          {t.education.descPart2}{" "}
          <span className="font-bold text-slate-800">
            {t.education.academyName}
          </span>
          {t.education.descPart3}
          <br />
          <br />
          {t.education.descPart4}{" "}
          <span className="font-bold text-slate-800">
            {t.education.training1}
          </span>
          ,{" "}
          <span className="font-bold text-slate-800">
            {t.education.training2}
          </span>{" "}
          {t.education.training3}{" "}
          <span className="font-bold text-slate-800">
            {t.education.training4}
          </span>{" "}
          {t.education.descPart5}
        </>
      ),
      icon: (
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
  ];

  const activeCareer =
    careerData.find((item) => item.id === activeCareerId) || careerData[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    try {
      const fullnameVal = (
        form.elements.namedItem("fullname") as HTMLInputElement
      ).value;
      const emailVal = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const fileInput = form.elements.namedItem("cv") as HTMLInputElement;
      const file = fileInput.files?.[0] || null;

      const formData = new FormData();
      formData.append("type", "cv");
      formData.append("name", fullnameVal);
      formData.append("email", emailVal);
      formData.append(
        "message",
        `Karyera bölməsindən yeni müraciət var. Seçilən bölmə: ${activeCareer.title}`,
      );
      if (file) {
        formData.append("cv-file", file);
      }

      const res = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        alert(t.form.success);
        setIsModalOpen(false);
        form.reset();
        setSelectedFileName("");
      } else {
        alert(`Xəta: ${result.error}`);
      }
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      alert("Sistemdə gözlənilməz xəta baş verdi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-24 relative bg-white">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="relative mb-8 sm:mb-12 md:mb-20 overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] bg-slate-900 p-6 sm:p-10 md:p-16 lg:p-24 shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#004a99]/10 skew-x-12 translate-x-20 hidden md:block"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-3 md:mb-6">
              <span className="h-px w-6 md:w-12 bg-blue-500"></span>
              <span className="text-blue-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs">
                {t.careerOpportunity}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.15] mb-4 md:mb-8">
              {t.heroTitle} <br />
              <span className="text-[#004a99]">{t.heroHighlight}</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl">
              {t.subTitle}
            </p>
          </div>
        </div>

        {/* Main Section Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Navigation Buttons */}
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="mb-2 lg:mb-6 ml-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 md:w-6 h-[2px] bg-[#004a99]"></div>
                <span className="text-[#004a99] font-bold uppercase tracking-widest text-[9px] md:text-[10px]">
                  Bakı Karton
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                {t.hrTitle}
              </h2>
            </div>

            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none snap-x w-full">
              {careerData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveCareerId(item.id)}
                  className={`flex-shrink-0 snap-start w-[260px] sm:w-[300px] lg:w-full flex items-center gap-3 sm:gap-4 md:gap-6 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 ${
                    activeCareerId === item.id
                      ? "bg-[#004a99] border-[#004a99] text-white shadow-lg lg:shadow-xl shadow-blue-900/20 lg:scale-[1.02]"
                      : "bg-white border-slate-100 text-slate-800 hover:border-slate-200 hover:bg-slate-50/50"
                  }`}
                >
                  <div
                    className={`p-2.5 sm:p-3 md:p-4 rounded-xl flex-shrink-0 ${
                      activeCareerId === item.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-50 text-[#004a99]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <h3 className="font-black uppercase tracking-widest text-xs md:text-sm mb-0.5 sm:mb-1 truncate">
                      {item.title}
                    </h3>
                    <p
                      className={`text-[11px] md:text-xs line-clamp-1 ${
                        activeCareerId === item.id
                          ? "text-white/70"
                          : "text-slate-400"
                      }`}
                    >
                      {item.shortDesc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Display Box */}
          <div className="w-full lg:w-2/3 bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-5 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              <div className="space-y-2">
                <span className="text-[#004a99] font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[10px] md:text-[11px]">
                  Bakı Karton Karyera
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  {activeCareer.title}
                </h2>
              </div>
              <div className="text-slate-600 text-xs sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                {activeCareer.fullDesc}
              </div>
              <div className="pt-5 sm:pt-6 border-t border-slate-200">
                <p className="text-slate-400 text-xs md:text-sm italic mb-3 sm:mb-4">
                  Bizimlə gələcəyini qurmağa başla.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto text-center px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-5 bg-[#004a99] text-white rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs hover:shadow-lg transition-all"
                >
                  CV {t.form.sendBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-5 sm:p-8 md:p-10 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 mb-1 uppercase tracking-tight">
              {t.form.title}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mb-5 sm:mb-6">
              {t.form.desc}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-[9px] md:text-[10px] font-black uppercase text-[#004a99] tracking-widest mb-1 ml-1">
                  {t.form.nameLabel}
                </label>
                <input
                  name="fullname"
                  required
                  type="text"
                  placeholder="Ad Soyad"
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:border-[#004a99] focus:outline-none transition-all text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] font-black uppercase text-[#004a99] tracking-widest mb-1 ml-1">
                  {t.form.emailLabel}
                </label>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:border-[#004a99] focus:outline-none transition-all text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-[9px] md:text-[10px] font-black uppercase text-[#004a99] tracking-widest mb-1 ml-1">
                  {t.form.cvLabel}
                </label>
                <div className="relative h-16 sm:h-20 group">
                  <input
                    name="cv"
                    required
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      setSelectedFileName(e.target.files?.[0]?.name || "")
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div
                    className={`absolute inset-0 w-full h-full border-2 border-dashed rounded-xl md:rounded-2xl flex flex-col items-center justify-center pointer-events-none z-10 transition-all ${
                      selectedFileName
                        ? "border-green-500 bg-green-50/30"
                        : "border-slate-200 bg-slate-50 group-hover:border-[#004a99]"
                    }`}
                  >
                    <span className="text-xs text-slate-400 font-bold px-3 text-center line-clamp-1">
                      {selectedFileName
                        ? `✅ ${selectedFileName}`
                        : "Seçmək üçün klikləyin"}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 sm:py-4 bg-[#004a99] text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#003d80]"
                }`}
              >
                {isSubmitting ? t.form.sending : t.form.sendBtn}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}