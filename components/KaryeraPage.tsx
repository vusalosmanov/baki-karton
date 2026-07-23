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
  
  // Xidmətlər səhifəsindəki kimi daxili uğur mesajı üçün state
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
          <span className="font-bold text-slate-800">{t.education.academyName}</span>
          {t.education.descPart3}
          <br />
          <br />
          {t.education.descPart4}{" "}
          <span className="font-bold text-slate-800">{t.education.training1}</span>,{" "}
          <span className="font-bold text-slate-800">{t.education.training2}</span>{" "}
          {t.education.training3}{" "}
          <span className="font-bold text-slate-800">{t.education.training4}</span>{" "}
          {t.education.descPart5}
        </>
      ),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  const activeCareer = careerData.find((item) => item.id === activeCareerId) || careerData[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const form = e.currentTarget;

    try {
      const fullnameVal = (form.elements.namedItem("fullname") as HTMLInputElement).value;
      const emailVal = (form.elements.namedItem("email") as HTMLInputElement).value;
      const fileInput = form.elements.namedItem("cv") as HTMLInputElement;
      const file = fileInput.files?.[0] || null;

      const formData = new FormData();
      formData.append("type", "cv");
      formData.append("name", fullnameVal);
      formData.append("email", emailVal);
      formData.append(
        "message",
        `Karyera bölməsindən yeni müraciət var. Seçilən bölmə: ${activeCareer.title}`
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
        setSuccessMessage(true);
        form.reset();
        setSelectedFileName("");
        setTimeout(() => {
          setSuccessMessage(false);
          setIsModalOpen(false);
        }, 3000);
      } else {
        setErrorMessage(result.error || "Göndərilə bilmədi");
      }
    } catch (err) {
      console.error("Xəta baş verdi:", err);
      setErrorMessage("Sistemdə gözlənilməz xəta baş verdi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white relative">
      {/* Hero Banner */}
      <section className="relative min-h-[70vh] md:h-[91vh] flex items-center overflow-hidden bg-[#004a99] py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-[10%] -top-[20%] w-[60%] h-[140%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>
        <div className="relative z-20 max-w-[1700px] mx-auto w-full px-4 sm:px-6 md:px-10">
          <div className="max-w-4xl space-y-6 md:space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="w-8 sm:w-12 h-[2px] bg-white/40"></span>
                <span className="text-white/80 font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs">
                  {t.careerOpportunity}
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter">
                {t.heroTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t.heroHighlight}</span>
              </h1>
            </div>
            <p className="text-base sm:text-xl md:text-2xl text-blue-100/80 max-w-2xl leading-relaxed font-medium border-l-2 border-white/20 pl-4 sm:pl-8">
              {t.subTitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Section Layout */}
      <section className="py-16 md:py-32 relative mt-8 md:mt-16">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            {/* Left Navigation Buttons */}
            <div className="w-full lg:w-1/3 space-y-4 md:space-y-6">
              {careerData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveCareerId(item.id)}
                  className={`w-full flex items-center gap-5 sm:gap-8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 ${
                    activeCareerId === item.id
                      ? "bg-[#004a99] border-[#004a99] text-white shadow-xl md:shadow-2xl shadow-blue-900/30 lg:scale-[1.03]"
                      : "bg-white border-slate-100 text-slate-800 hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl transition-colors shrink-0 ${
                      activeCareerId === item.id
                        ? "bg-white/20 text-white"
                        : "bg-slate-50 text-[#004a99]"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-black uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm mb-1">
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs leading-tight line-clamp-1 ${
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

            {/* Right Content Display Box */}
            <div className="w-full lg:w-2/3 flex flex-col min-h-auto lg:min-h-[750px] bg-slate-50 border border-slate-200 rounded-3xl md:rounded-[3rem] p-6 sm:p-10 md:p-20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-bl-full -z-0"></div>
              <div className="w-full space-y-6 md:space-y-10 relative z-10 flex flex-col justify-between h-full">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-1 bg-[#004a99] rounded-full"></span>
                    <span className="text-[#004a99] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-[11px]">
                      Bakı Karton Karyera
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                    {activeCareer.title}
                  </h2>
                </div>
                
                <div className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                  {activeCareer.fullDesc}
                </div>

                <div className="pt-6 sm:pt-8 border-t border-slate-200/80">
                  <p className="text-slate-400 text-xs sm:text-sm italic mb-4">
                    Bizimlə gələcəyini qurmağa başla.
                  </p>
                  <button
                    onClick={() => {
                      setSuccessMessage(false);
                      setErrorMessage("");
                      setIsModalOpen(true);
                    }}
                    className="w-full sm:w-auto group flex items-center justify-center gap-4 sm:gap-6 px-8 sm:px-12 py-5 sm:py-6 bg-[#004a99] text-white rounded-2xl sm:rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#003d80] transition-all shadow-xl shadow-blue-900/20 cursor-pointer"
                  >
                    CV {t.form.sendBtn}
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modal Popup (Xidmətlər səhifəsindəki dizayn strukturunda) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-[#004a99] uppercase tracking-widest">Karyera Müraciəti</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{activeCareer.title}</h3>
            </div>

            {successMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <svg className="w-12 h-12 text-emerald-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="font-bold text-lg">Müraciətiniz göndərildi!</h4>
                <p className="text-sm text-emerald-600">Tezliklə sizinlə əlaqə saxlanılacaqdır.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.form.nameLabel} *</label>
                  <input
                    name="fullname"
                    required
                    type="text"
                    placeholder="Ad Soyad"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#004a99] text-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.form.emailLabel} *</label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#004a99] text-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">{t.form.cvLabel} *</label>
                  <div className="relative h-20 group">
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
                      className={`absolute inset-0 w-full h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center pointer-events-none z-10 transition-all ${
                        selectedFileName
                          ? "border-emerald-500 bg-emerald-50/30"
                          : "border-slate-200 bg-slate-50 group-hover:border-[#004a99]"
                      }`}
                    >
                      <span className="text-xs text-slate-500 font-bold px-3 text-center line-clamp-1">
                        {selectedFileName
                          ? `✅ ${selectedFileName}`
                          : "Seçmək üçün klikləyin (.pdf, .doc)"}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#004a99] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#003d80] transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Göndərilir...
                    </>
                  ) : (
                    t.form.sendBtn
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}