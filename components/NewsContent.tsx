"use client";
import { useState } from "react";
import NewsCard from "@/components/NewCard";

export default function NewsContent({ initialNews }: { initialNews: any[] }) {
    const [selectedCategory, setSelectedCategory] = useState("Hamısı");

    // Düymələrdə göstəriləcək siyahı
    const categories = ["Hamısı", "Rəsmi", "İstehsalat", "Bloq", "Yenilik"];

    // Filtrləmə məntiqi
    const filteredNews = initialNews.filter((item: any) => {
        if (selectedCategory === "Hamısı") return true;
        
        const itemCategory = item.category?.trim().toLowerCase();
        const selectedCat = selectedCategory.trim().toLocaleLowerCase('az-AZ');

        if (selectedCat.includes("istehsalat") || selectedCat.includes("ıstehsalat")) {
            return itemCategory?.includes("istehsalat") || itemCategory?.includes("ıstehsalat");
        }

        if (selectedCat.includes("rəsmi") || selectedCat.includes("resmi")) {
            return itemCategory?.includes("rəsmi") || itemCategory?.includes("resmi");
        }

        return itemCategory === selectedCat;
    });

    return (

        <>
            {/* Kateqoriya Düymələri */}
            <div className="flex flex-wrap gap-3 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat
                                ? "bg-[#1a3352] text-white shadow-md scale-105"
                                : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Xəbərlər Grid */}
            {filteredNews.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">Bu kateqoriyada hələlik heç bir xəbər yoxdur.</p>
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
                                // Kateqoriya göstəriləndə də təmizlənmiş versiyanı göndəririk
                                category={item.category?.trim()}
                                description={item.description}
                                date={new Date(item.createdAt).toLocaleDateString('az-AZ')}
                                // DİQQƏT: Slug sisteminə keçdiyimiz üçün bunu dəyişdik
                                slug={item.slug}
                            />
                        );
                    })}
                </div>
            )}

            {/* Pagination (Statik) */}
            <div className="mt-16 flex justify-center space-x-2">
                <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center bg-white shadow-sm text-[#1a3352] font-bold">1</button>
                <button className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-white transition-all">2</button>
            </div>
        </>
    );
}