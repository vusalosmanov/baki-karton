"use client";
import { useState } from "react";

export function MediaGallery({ album }: { album: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImg, setCurrentImg] = useState(0);

    const photos = album.image || album.images || [];

    return (
        <>
            {/* Albom Kartı */}
            <div 
                onClick={() => setIsOpen(true)}
                className="group cursor-pointer"
            >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-gray-100 border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <img
                        src={`http://localhost:1337${photos[0]?.url}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={album.title}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-sm text-black px-6 py-2 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            Albomu Aç
                        </span>
                    </div>
                </div>
                <div className="mt-6 px-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {album.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium mt-1">{photos.length} Fotoşəkil</p>
                </div>
            </div>

            {/* MODAL (Lightview) */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10">
                    {/* Bağla Düyməsi */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Sağa-Sola Düymələri */}
                    {photos.length > 1 && (
                        <>
                            <button 
                                onClick={() => setCurrentImg((prev) => (prev === 0 ? photos.length - 1 : prev - 1))}
                                className="absolute left-4 md:left-10 text-white/50 hover:text-white p-2"
                            >
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                            </button>
                            <button 
                                onClick={() => setCurrentImg((prev) => (prev === photos.length - 1 ? 0 : prev + 1))}
                                className="absolute right-4 md:right-10 text-white/50 hover:text-white p-2"
                            >
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                            </button>
                        </>
                    )}

                    {/* Əsas Şəkil */}
                    <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center">
                        <img 
                            src={`http://localhost:1337${photos[currentImg]?.url}`}
                            className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
                            alt="Görüntü"
                        />
                        <div className="mt-8 text-white text-center">
                            <p className="text-sm uppercase tracking-widest font-bold text-blue-400 mb-2">{album.title}</p>
                            <p className="text-lg opacity-80">{currentImg + 1} / {photos.length}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}