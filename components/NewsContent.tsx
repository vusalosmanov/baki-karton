"use client";
import { useState } from "react";
import NewsCard from "@/components/NewCard";

export default function NewsContent({
  initialNews,
  locale,
  dict,
}: {
  initialNews: any[];
  locale: string;
  dict: Record<string, any>;
}) {
  // JSON-dan kateqoriyaları alırıq
  const categories = dict?.news?.categories || [
    "All",
    "Official",
    "Production",
    "Blog",
    "News",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);


  const filteredNews = initialNews.filter((item: any) => {
    if (selectedCategory === categories[0]) return true;
    const itemCat = item.category
      ?.toLowerCase()
      .trim()
      .replace(/ə/g, "e")
      .replace(/ı/g, "i");
    const selectedCat = selectedCategory
      .toLowerCase()
      .trim()
      .replace(/ə/g, "e")
      .replace(/ı/g, "i");
    return itemCat === selectedCat;
  });

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        {categories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              selectedCategory === cat
                ? "bg-[#1a3352] text-white shadow-md scale-105"
                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      {filteredNews.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
          <p className="text-gray-400 font-medium">
            {dict?.news?.noNews ||
              "Bu kateqoriyada hələlik heç bir xəbər yoxdur."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredNews.map((item: any) => {
            const strapiPath = item.image?.[0]?.url;
            const imageUrl = strapiPath
              ? `http://localhost:1337${strapiPath}`
              : "/placeholder-news.jpg";

            return (
              <NewsCard
                key={item.id}
                title={item.title}
                image={imageUrl}
                category={item.category?.trim()}
                description={item.description}
                date={new Date(item.createdAt).toLocaleDateString(
                  locale === "az" ? "az-AZ" : "en-US",
                )}
                slug={item.slug}
                locale={locale}
              />
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-16 flex justify-center space-x-2">
        <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center bg-white shadow-sm text-[#1a3352] font-bold">
          1
        </button>
        <button className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-white transition-all">
          2
        </button>
      </div>
    </>
  );
}
