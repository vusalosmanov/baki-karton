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
    <div className="group relative">
      {/* Arxa fondakı zərif kölgə effekti (Hover olanda çıxır) */}
      <Link href={`/${locale}/mehsullar/${id}`}>
        <div className="absolute -inset-4 bg-[#004a99]/5 rounded-[2rem] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-0"></div>

        <div className="relative z-10 flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-500">
          {/* Üst hissə: Başlıq və Keçid Düyməsi */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-[#004a99] transition-colors">
              {title}
            </h3>

            <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#004a99] group-hover:border-[#004a99] transition-all duration-500 cursor-pointer">
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors"
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
            </div>
          </div>

          {/* Şəkil və üzərindəki məlumat hissəsi */}
          <div className="relative h-[380px] overflow-hidden mx-6 mb-6 rounded-2xl shadow-md">
            <img
              src={secureImageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Şəkil üzərindəki mavi gradient və hover zamanı açılan açıq mavi fon */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#004a99]/90 via-[#004a99]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-white/80 text-xs uppercase tracking-widest font-semibold mb-2">
                {category}
              </span>
              <p className="text-white text-base font-medium leading-snug line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
