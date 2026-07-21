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
  const categories = dict?.news?.categories || [
    "All",
    "Official",
    "Production",
    "Blog",
    "News",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredNews = initialNews.filter((item: any) => {
    // 1. Əgər "Hamısı / All" seçilibsə hamısını göstər
    if (
      selectedCategory === categories[0] ||
      selectedCategory === "All" ||
      selectedCategory === "Hamısı"
    ) {
      return true;
    }

    // Əgər xəbərin kateqoriyası ümumiyyətlə yoxdursa
    if (!item.category) return false;

    // Hərfləri və boşluqları kiçildib müqayisə edirik
    const itemCat = String(item.category).toLowerCase().trim();
    const selectedCat = String(selectedCategory).toLowerCase().trim();

    return (
      itemCat === selectedCat ||
      itemCat.includes(selectedCat) ||
      selectedCat.includes(itemCat)
    );
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
            const rawPath = item.image_url;
            const imageUrl = rawPath
              ? rawPath.startsWith("http")
                ? rawPath.replace(
                    "http://83.229.84.217:5000",
                    "https://bakikarton.az",
                  )
                : `https://bakikarton.az${rawPath}`
              : null;

            return (
              <NewsCard
                key={item.id}
                title={item.title}
                category={item.category?.trim()}
                description={item.description}
                date={
                  item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("az-AZ")
                    : item.date || ""
                }
                id={item.id}
                locale={locale}
                image={imageUrl}
              />
            );
          })}
        </div>
      )}

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
