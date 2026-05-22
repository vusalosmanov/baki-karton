"use client";
import React, { useState } from 'react';

export default function ServicesClient({ dict }: { dict: any }) {
    // Sənin orijinal dizayn strukturunu qoruyuruq
    const servicesData = [
        {
            id: "design",
            title: dict.services?.design?.title,
            shortDesc: dict.services?.design?.shortDesc,
            fullDesc: (
                <>
                    {dict.services?.design?.fullDesc}
                    <br /><br />
                    <strong>{dict.services?.design?.listTitle}</strong>
                    <ul className="mt-4 space-y-2 list-disc pl-5">
                        {dict.services?.design?.items?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <br />
                    {dict.services?.design?.footerText}
                </>
            ),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-1.494-3.14c-.53-.282-1.065-.542-1.6-.786a3.293 3.293 0 00-3.328.232c-.038.012-.077.02-.115.023a4.29 4.29 0 011.603-7.792c.633-.243 1.258-.458 1.872-.647a4.291 4.291 0 013.111.002z" />
                </svg>
            )
        },
        {
            id: "die",
            title: dict.services?.die?.title,
            shortDesc: dict.services?.die?.shortDesc,
            fullDesc: (
                <>
                    {dict.services?.die?.fullDesc}
                    <br /><br />
                    <strong>{dict.services?.die?.listTitle}</strong>
                    <ul className="mt-4 space-y-2 list-disc pl-5">
                        {dict.services?.die?.items?.map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <br />
                    {dict.services?.die?.footerText}
                </>
            ),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
    const activeService = servicesData.find(service => service.id === activeServiceId) || servicesData[0];

    return (
        <main className="min-h-screen bg-white">
            <section className="relative h-[91vh] flex items-center overflow-hidden bg-[#004a99]">
                <div className="absolute inset-0 z-0">
                    <div className="absolute -left-[10%] -top-[20%] w-[60%] h-[140%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                </div>
                <div className="relative z-20 max-w-[1700px] mx-auto w-full px-10">
                    <div className="max-w-4xl space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 animate-in slide-in-from-left duration-700">
                                <span className="w-12 h-[2px] bg-white/40"></span>
                                <span className="text-white/80 font-black uppercase tracking-[0.4em] text-xs">{dict.heroLabel}</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000">
                                BAKI KARTON<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">XİDMƏTLƏR</span>
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-blue-100/80 max-w-2xl leading-relaxed font-medium border-l-2 border-white/20 pl-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            {dict.heroSubtitle}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-32 relative mt-16">
                <div className="max-w-[1700px] mx-auto px-10">
                    <div className="flex flex-col lg:flex-row gap-24 items-start">
                        <div className="lg:w-1/3 w-full space-y-6 pt-4">
                            {servicesData.map((service) => (
                                <button key={service.id} onClick={() => setActiveServiceId(service.id)}
                                    className={`w-full flex items-center gap-8 p-8 rounded-3xl border-2 transition-all duration-500 ${activeServiceId === service.id ? "bg-[#004a99] border-[#004a99] text-white shadow-2xl shadow-blue-900/30 scale-[1.03]" : "bg-white border-slate-100 text-slate-800 hover:border-slate-200"}`}>
                                    <div className={`p-5 rounded-2xl transition-colors ${activeServiceId === service.id ? "bg-white/20 text-white" : "bg-slate-50 text-[#004a99]"}`}>{service.icon}</div>
                                    <div className="text-left">
                                        <h3 className="font-black uppercase tracking-widest text-sm mb-1">{service.title}</h3>
                                        <p className={`text-xs leading-tight line-clamp-1 ${activeServiceId === service.id ? "text-white/70" : "text-slate-400"}`}>{service.shortDesc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="lg:w-2/3 w-full flex flex-col min-h-[750px] md:flex-row gap-16 bg-slate-50 border border-slate-200 rounded-[3rem] p-10 md:p-20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-bl-full -z-0"></div>
                            <div className="md:w-full space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-1 bg-[#004a99] rounded-full"></span>
                                        <span className="text-[#004a99] font-black uppercase tracking-[0.4em] text-[11px]">{dict.specializedTitle}</span>
                                    </div>
                                    <h2 className="text-5xl font-black text-slate-900 leading-tight">{activeService.title}</h2>
                                </div>
                                <div className="text-slate-600 text-xl leading-relaxed font-medium">{activeService.fullDesc}</div>
                                <div className="pt-8">
                                    <button className="group flex items-center gap-6 px-12 py-6 bg-[#004a99] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#003d80] transition-all shadow-2xl shadow-blue-900/20">
                                        {dict.applyBtn}
                                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}