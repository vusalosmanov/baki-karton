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

  const openModal = (album: any) => {
    setActiveAlbum(album);
    setCurrentImgIdx(0);
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="py-16 px-6 max-w-7xl mx-auto border-b">
        <h1 className="text-5xl font-black tracking-tighter text-gray-900">
          Media <span className="text-blue-600">Mərkəzi</span>
        </h1>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-16 space-y-24 pb-20">
        {/* VİDEO BÖLMƏSİ */}
        {videoItems.length > 0 && (
          <section className="bg-gray-950 -mx-6 px-10 py-24 rounded-[4rem] shadow-3xl">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <span className="text-red-500 font-black tracking-widest uppercase text-xs">
                  Video İcmal
                </span>
                <h2 className="text-4xl font-black text-white mt-2 italic">
                  Sinematik Görüntülər
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {videoItems.map((item: any) => (
                  <div key={item.id} className="group">
                    <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black border border-white/5 ring-1 ring-white/10 shadow-2xl">
                      <video
                        controls
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        <source src={item.files[0].url} type="video/mp4" />
                      </video>
                    </div>
                    <p className="text-gray-500 mt-6 font-medium uppercase text-center text-xs tracking-[0.3em]">
                      Bakı Karton İstehsalat Videosu
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FOTO BÖLMƏSİ 1 */}
        {presidentPhotos.length > 0 && (
          <section>
            <h2 className="text-2xl font-black uppercase mb-10 border-l-4 border-blue-600 pl-4">
              Bakı Karton Açılış
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {presidentPhotos.map((album: any) => (
                <div
                  key={album.id}
                  onClick={() => openModal(album)}
                  className="group cursor-pointer relative overflow-hidden rounded-[2.5rem] aspect-video bg-gray-100 shadow-xl"
                >
                  <img
                    src={album.images[0].url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt={album.title}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                    <div>
                      <h3 className="text-white text-2xl font-bold">
                        {album.title}
                      </h3>
                      <p className="text-white/70 text-sm font-bold tracking-widest uppercase mt-1">
                        {album.images.length} Şəkil
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOTO BÖLMƏSİ 2 */}
        {companyPhotos.length > 0 && (
          <section>
            <h2 className="text-xl font-black uppercase mb-8 text-gray-400">
              Zavod Daxili
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyPhotos.map((album: any) => (
                <div
                  key={album.id}
                  onClick={() => openModal(album)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden border transition-all hover:shadow-2xl">
                    <img
                      src={album.images[0].url}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt=""
                    />
                  </div>
                  <h3 className="mt-5 font-bold text-gray-800 text-center">
                    {album.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* MODAL */}
      {isOpen && activeAlbum && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/98 backdrop-blur-3xl"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-xl font-bold"
            >
              ✕
            </button>
            <div className="relative flex items-center justify-center w-full">
              <button
                onClick={() =>
                  setCurrentImgIdx((prev) =>
                    prev > 0
                      ? prev - 1
                      : getAlbumImages(activeAlbum).length - 1,
                  )
                }
                className="absolute -left-12 p-4 text-white/30 hover:text-white"
              >
                ❮
              </button>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                <img
                  src={getAlbumImages(activeAlbum)[currentImgIdx].url}
                  className="max-h-[75vh] w-auto object-contain"
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
                className="absolute -right-12 p-4 text-white/30 hover:text-white"
              >
                ❯
              </button>
            </div>
            <div className="mt-8 text-center">
              <p className="text-blue-500 font-bold uppercase text-xs mb-2">
                {currentImgIdx + 1} / {getAlbumImages(activeAlbum).length}
              </p>
              <h4 className="text-white text-2xl font-bold">
                {activeAlbum.title}
              </h4>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
