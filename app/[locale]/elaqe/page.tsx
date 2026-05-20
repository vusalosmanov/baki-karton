"use client";
import { useState } from "react";

export default function ContactSection() {
    return (
        <section className="w-full bg-[#f4f7fa] px-4 sm:px-6 lg:px-8 py-10">
            <div className="group relative w-full h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                <div className="absolute top-4 left-4 z-10 bg-[#1a3352] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Bizim Məkan
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.5396438245257!2d49.60282256472744!3d40.60767379266899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403097007188445b%3A0x5ba4e8bcbe7a0fe4!2sBaki%20karton%20ve%20qutu%20fabriki!5e1!3m2!1saz!2saz!4v1777222301940!5m2!1saz!2saz"
                    className="w-full h-full border-0 transition-all duration-700 ease-in-out"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto mt-10 lg:mt-0">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:-mt-24 relative z-10">
                    <div className="w-full lg:w-1/3 bg-[#1a3352] text-white p-6 sm:p-10 rounded-3xl shadow-2xl space-y-6 sm:space-y-8 flex flex-col justify-center">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Bizimlə Danışın</h3>
                            <p className="text-blue-100 opacity-80 text-sm sm:text-base">
                                Sifariş, məlumat və ya təklifləriniz üçün komandamız hər zaman xidmətinizdədir.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4 group">
                                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Ünvan</p>
                                    <p className="font-medium text-base sm:text-lg">Bakı, Azərbaycan</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 group">
                                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Email</p>
                                    <p className="font-medium text-base sm:text-lg italic truncate">info@bakikarton.az</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 group">
                                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Telefon</p>
                                    <p className="font-medium text-base sm:text-lg">+994 10 318 22 22</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 group">
                                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors shrink-0">
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4v1m-3 3h2m3 3h2m-9 3h2m3 3h2M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 15h2v2h-2v-2zM12 12h2v2h-2v-2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Qr kod</p>
                                    <p className="font-medium text-lg"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 bg-white p-6 sm:p-12 rounded-3xl shadow-xl border border-gray-100">
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Müraciət Formu</h2>
                            <p className="text-gray-400 mt-2 italic text-sm">Bütün sahələri doldurmağınız xahiş olunur.</p>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:grid-cols-2 sm:gap-8">
                            <div className="relative group">
                                <input type="text" id="name" className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352] transition-colors placeholder-transparent" placeholder="Ad Soyad" />
                                <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#1a3352]">Adınız və Soyadınız</label>
                            </div>

                            <div className="relative group">
                                <input type="email" id="email" className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352] transition-colors placeholder-transparent" placeholder="E-mail" />
                                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#1a3352]">E-mail ünvanınız</label>
                            </div>

                            <div className="relative group">
                                <input type="tel" id="tel" className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352] transition-colors placeholder-transparent" placeholder="Telefon" />
                                <label htmlFor="tel" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#1a3352]">Əlaqə nömrəsi</label>
                            </div>

                            <div className="relative group">
                                <div className="absolute right-0 bottom-4 pointer-events-none text-gray-400 group-focus-within:text-[#1a3352] transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                <select
                                    name="subject"
                                    className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 pr-8 outline-none focus:border-[#1a3352] transition-all appearance-none cursor-pointer text-gray-700 font-medium bg-white"
                                >
                                    <option value="Mövzu" disabled>Mövzu seçin</option>
                                    <option value="Karton list sifarişi">Karton list sifarişi</option>
                                    <option value="Karton sifarişi">Karton sifarişi</option>
                                    <option value="Məlumat tələbi">Məlumat tələbi</option>
                                    <option value="Təklif və şikayət">Təklif və şikayət</option>
                                </select>

                                <label className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-wider text-gray-400 peer-focus:text-[#1a3352] transition-all">
                                    Sifariş növü
                                </label>

                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1a3352] transition-all duration-300 peer-focus:w-full"></div>
                            </div>

                            <div className="md:col-span-2 relative group mt-4">
                                <textarea id="msg" rows={3} className="peer w-full bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-[#1a3352] transition-colors placeholder-transparent resize-none" placeholder="Mesaj"></textarea>
                                <label htmlFor="msg" className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#1a3352]">Mesajınız</label>
                            </div>

                            <div className="md:col-span-2 pt-4">
                                <button className="w-full bg-[#1a3352] text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:shadow-[0_20px_50px_rgba(26,51,82,0.3)] hover:-translate-y-1 active:scale-95 transition-all duration-300">
                                    GÖNDƏR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}