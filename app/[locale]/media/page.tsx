"use client";
import { useState } from "react";

// Məlumatları bura statik olaraq əlavə edirsən
const mediaData = [
  {
    id: 1,
    title: "Video",
    category: "video",
    files: [{ url: "/video/production.mp4" }],
  },
  {
    id: 2,
    title: "Bakı Kartonun Rəsmi Açılışı",
    category: "prezident",
    images: [
      { url: "/images/open/3-1.jpg" },
      { url: "/images/open/4-1.jpg" },
      { url: "/images/open/6-1.jpg" },
      { url: "/images/open/7-1.jpg" },
      { url: "/images/open/8-1.jpg" },
      { url: "/images/open/9-1 (1).jpg" },
      { url: "/images/open/10-1.jpg" },
      { url: "/images/open/12.jpg" },
      { url: "/images/open/11-1.jpg" },
    ],
  },
  {
    id: 3,
    title: "İstehsalat Xətti",
    category: "daxili",
    images: [
      { url: "/images/zavod/13.jpg" },
      { url: "/images/zavod/15-1.jpg" },
      { url: "/images/zavod/16-1.jpg" },
      { url: "/images/zavod/17-1.jpg" },
      { url: "/images/zavod/18-1.jpg" },
      { url: "/images/zavod/19-1.jpg" },
      { url: "/images/zavod/20-1.jpg" },
      { url: "/images/zavod/21-1.jpg" },
      { url: "/images/zavod/22-1.jpg" },
      { url: "/images/zavod/23-1.jpg" },
      { url: "/images/zavod/24.jpg" },
    ],
  },
];

export default function MediaPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState<any>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const getAlbumImages = (album: any) => {
    return album.images || [];
  };

  const videoItems = mediaData.filter((item: any) => item.category === "video");
  const presidentPhotos = mediaData.filter(
    (item: any) => item.category === "prezident",
  );
  const companyPhotos = mediaData.filter(
    (item: any) => item.category === "daxili",
  );

  const openModal = (album: any, idx = 0) => {
    setActiveAlbum(album);
    setCurrentImgIdx(idx);
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto border-b">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-gray-900">
          Media <span className="text-blue-600">Mərkəzi</span>
        </h1>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 md:mt-16 space-y-16 md:space-y-24 pb-24">
        {/* VİDEO BÖLMƏSİ (Mobil üçün düzəldilmiş arxa plan və padding) */}
        {videoItems.length > 0 && (
          <section className="bg-gray-950 mx-0 sm:-mx-6 px-4 sm:px-10 py-12 sm:py-24 rounded-3xl sm:rounded-[4rem] shadow-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 sm:mb-12">
                <span className="text-red-500 font-black tracking-widest uppercase text-xs">
                  Video İcmal
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 italic">
                  Sinematik Görüntülər
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                {videoItems.map((item: any) => (
                  <div key={item.id} className="group">
                    <div className="relative aspect-video rounded-2xl sm:rounded-[3rem] overflow-hidden bg-black border border-white/5 ring-1 ring-white/10 shadow-2xl">
                      <video
                        controls
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      >
                        <source src={item.files[0].url} type="video/mp4" />
                      </video>
                    </div>
                    <p className="text-gray-400 mt-4 sm:mt-6 font-medium uppercase text-center text-[10px] sm:text-xs tracking-[0.3em]">
                      Bakı Karton İstehsalat Videosu
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FOTO BÖLMƏSİ 1 (Açılış - Mobil üçün uzun grid dizaynı) */}
        {presidentPhotos.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-black uppercase mb-6 sm:mb-10 border-l-4 border-blue-600 pl-4">
              Bakı Karton Açılış
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
              {presidentPhotos.map((album: any) => (
                <div key={album.id} className="space-y-4">
                  {/* Əsas başlıq kartı */}
                  <div
                    onClick={() => openModal(album, 0)}
                    className="group cursor-pointer relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] aspect-video bg-gray-100 shadow-xl"
                  >
                    <img
                      src={album.images[0].url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={album.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
                      <div>
                        <h3 className="text-white text-xl sm:text-2xl font-bold">
                          {album.title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm font-bold tracking-widest uppercase mt-1">
                          {album.images.length} Şəkil — Hamısına bax
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobil üçün alt-alta uzun görünüş yaradan şəbəkə */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {album.images.slice(1, 4).map((img: any, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => openModal(album, idx + 1)}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-gray-100 border border-gray-100"
                      >
                        <img
                          src={img.url}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt=""
                        />
                        {idx === 2 && album.images.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center text-white font-black text-xs sm:text-sm">
                            +{album.images.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOTO BÖLMƏSİ 2 (Zavod Daxili - Mobil üçün uzun grid dizaynı) */}
        {companyPhotos.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-black uppercase mb-6 sm:mb-8 text-gray-500">
              Zavod Daxili
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              {companyPhotos.map((album: any) => (
                <div key={album.id} className="space-y-4">
                  <div
                    onClick={() => openModal(album, 0)}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-video sm:aspect-square rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-gray-200 transition-all hover:shadow-2xl relative">
                      <img
                        src={album.images[0].url}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                          {album.images.length} Şəkil
                        </span>
                      </div>
                    </div>
                    <h3 className="mt-4 font-bold text-gray-800 text-base sm:text-lg">
                      {album.title}
                    </h3>
                  </div>

                  {/* Mobil üçün uzunluğu təmin edən əlavə kiçik fotolar */}
                  <div className="grid grid-cols-4 gap-2">
                    {album.images.slice(1, 5).map((img: any, idx: number) => (
                      <div
                        key={idx}
                        onClick={() => openModal(album, idx + 1)}
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-gray-100"
                      >
                        <img
                          src={img.url}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* MODAL (Responsive və Mobil Uyğun) */}
      {isOpen && activeAlbum && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 sm:-top-12 right-0 text-white/70 hover:text-white text-2xl font-bold p-2"
            >
              ✕
            </button>
            <div className="relative flex items-center justify-center w-full px-2 sm:px-12">
              <button
                onClick={() =>
                  setCurrentImgIdx((prev) =>
                    prev > 0
                      ? prev - 1
                      : getAlbumImages(activeAlbum).length - 1,
                  )
                }
                className="absolute left-1 sm:-left-4 z-20 p-2 sm:p-4 bg-black/40 sm:bg-transparent rounded-full text-white/70 hover:text-white text-lg sm:text-2xl"
              >
                ❮
              </button>
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 max-h-[70vh] flex items-center justify-center">
                <img
                  src={getAlbumImages(activeAlbum)[currentImgIdx].url}
                  className="max-h-[70vh] w-auto object-contain"
                  alt="media"
                />
              </div>
              <button
                onClick={() =>
                  setCurrentImgIdx((prev) =>
                    prev < getAlbumImages(activeAlbum).length - 1
                      ? prev + 1
                      : 0,
                  )
                }
                className="absolute right-1 sm:-right-4 z-20 p-2 sm:p-4 bg-black/40 sm:bg-transparent rounded-full text-white/70 hover:text-white text-lg sm:text-2xl"
              >
                ❯
              </button>
            </div>
            <div className="mt-4 sm:mt-8 text-center px-4">
              <p className="text-blue-400 font-bold uppercase text-[10px] sm:text-xs mb-1">
                {currentImgIdx + 1} / {getAlbumImages(activeAlbum).length}
              </p>
              <h4 className="text-white text-lg sm:text-2xl font-bold">
                {activeAlbum.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}