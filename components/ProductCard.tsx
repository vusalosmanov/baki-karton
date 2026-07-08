"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  features: any;
  slug: string;
  index: number;
  locale: string;
  Productname: string;
}

export default function ProductCard({
  title,
  description,
  image,
  features,
  slug,
  index,
  Productname

}: ProductCardProps) {
  const params = useParams(); // URL parametrlərini götür
  const locale = params.locale || "az";
  const colors = [
    "from-blue-600 to-blue-800",
    "from-gray-700 to-gray-900",
    "from-emerald-600 to-emerald-800",
    "from-slate-700 to-slate-900",
  ];
  const currentColor = colors[index % colors.length];

  return (
    <div className="group relative">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentColor} rounded-[3rem] transform transition-all duration-500 group-hover:scale-[1.02] shadow-2xl`}
      />

      <div className="relative p-10 h-full flex flex-col justify-between min-h-[550px] overflow-hidden rounded-[3rem]">
        <div className="absolute -right-10 -top-10 w-64 h-64 opacity-20 group-hover:opacity-40 transition-all duration-500 pointer-events-none group-hover:rotate-0 -rotate-12 scale-110">
          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        <div>
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <span className="text-white/30 font-black text-6xl select-none">
              0{index + 1}
            </span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight uppercase">
            {title}
          </h2>
          <p className="text-white/80 text-lg mb-8 font-medium leading-relaxed line-clamp-3">
            {description
              ? description
              : "Məhsul haqqında məlumat daxil edilməyib."}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {features && Array.isArray(features)
              ? features.map((f: any, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-black/20 backdrop-blur-sm rounded-full text-white/90 text-xs font-bold uppercase tracking-widest border border-white/5"
                  >
                    {typeof f === "string" ? f : f.feature_item || f.text}
                  </span>
                ))
              : null}
          </div>
        </div>
        <Link
          href={`/${locale}/mehsullar/${slug}`}
          className="inline-flex items-center justify-between w-full p-6 bg-white rounded-2xl group/btn hover:bg-gray-50 transition-all duration-300"
        >
          <span className="text-gray-900 font-black uppercase tracking-widest text-sm">
            Məhsullara bax
          </span>
          <div className="bg-gray-900 p-2 rounded-lg transition-transform duration-300 group-hover/btn:translate-x-2">
            <svg
              className="w-5 h-5 text-white"
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
        </Link>
      </div>
    </div>
  );
}
