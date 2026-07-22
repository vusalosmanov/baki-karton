import Link from "next/link";

export default function ProductCard({
  id,
  title,
  description,
  category,
  image,
  locale,
}: any) {
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `https://bakikarton.az${image}`
    : "/placeholder.png";

  // Brauzer HTTPS-də işləyirsə, HTTP linkini avtomatik HTTPS-ə çeviririk:
  const secureImageUrl =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? imageUrl.replace("http://", "https://")
      : imageUrl;

  return (
    <Link
      href={`/${locale}/mehsullar/${id}`}
      className="group relative block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004a99] focus-visible:ring-offset-4 focus-visible:ring-offset-slate-50"
    >
      {/* Arxa fondakı zərif kölgə effekti (Hover olanda çıxır) */}
      <div className="absolute -inset-3 bg-[#004a99]/5 rounded-[2rem] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out -z-10" />

      <div className="flex h-full flex-col bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(0,43,91,0.12)] group-hover:-translate-y-1.5 transition-all duration-500 ease-out">
        {/* Şəkil */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={secureImageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#004a99]/92 via-[#004a99]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />

          <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
            {category && (
              <span className="text-white/75 text-[11px] uppercase tracking-[0.18em] font-semibold">
                {category}
              </span>
            )}
            <p className="text-white text-sm leading-snug line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Başlıq və keçid düyməsi */}
        <div className="flex items-center justify-between gap-4 px-6 py-5">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#004a99] transition-colors duration-300 truncate">
            {title}
          </h3>

          <span className="shrink-0 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#004a99] group-hover:border-[#004a99] transition-all duration-500">
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
