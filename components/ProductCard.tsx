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

  const secureImageUrl =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? imageUrl.replace("http://", "https://")
      : imageUrl;

  return (
    <Link
      href={`/${locale}/mehsullar/${id}`}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,43,91,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-out"
    >
      {/* Şəkil və Kateqoriya Etiketi */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <img
          src={secureImageUrl}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-[#004a99] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Məzmun Hissəsi */}
      <div className="flex flex-col flex-grow p-6 justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#004a99] transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Keçid Düyməsi və Alt Hissə */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <span className="text-xs font-semibold text-[#004a99] tracking-wider uppercase">
            Ətraflı bax
          </span>
          <span className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 group-hover:bg-[#004a99] group-hover:border-[#004a99] group-hover:text-white transition-all duration-300">
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
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