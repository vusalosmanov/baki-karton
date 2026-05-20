import { getMehsulBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SingleProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const mehsul = await getMehsulBySlug(slug);

    if (!mehsul) return notFound();

    const allImages = [];
    if (mehsul.Image) allImages.push(mehsul.Image);
    if (Array.isArray(mehsul.Images)) allImages.push(...mehsul.Images);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <Link href="/mehsullar" className="text-gray-400 hover:text-blue-600 font-bold mb-8 sm:mb-12 inline-block text-sm sm:text-base">
                ← Kataloqa qayıt
            </Link>

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 sm:gap-12">

                {/* Şəkillər */}
                <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                    {allImages.map((img: any, i: number) => (
                        <div key={i} className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-gray-100 shadow-sm">
                            <div className="aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50">
                                <img
                                    src={img.url}
                                    className="w-full h-full object-contain"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                                    {img.caption || `${mehsul.title} - Görünüş ${i + 1}`}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {img.alternativeText || "Məhsulun bu hissəsi haqqında texniki məlumat və ya xüsusi qeydlər bura əlavə edilə bilər."}
                                </p>
                                <div className="pt-3 sm:pt-4 border-t border-gray-100">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                        Detallı Baxış
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sağ panel */}
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24 space-y-6 sm:space-y-8">
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">{mehsul.title}</h1>
                            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">{mehsul.description}</p>
                        </div>

                        {mehsul.features && (
                            <div className="space-y-2 sm:space-y-3">
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Texniki Göstəricilər</h4>
                                {mehsul.features.map((f: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl border border-gray-100 text-sm font-bold shadow-sm">
                                        {f.text || f.feature_item}
                                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 ml-2" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="p-6 sm:p-8 bg-gray-900 rounded-2xl sm:rounded-[2rem] text-white">
                            <p className="text-sm text-gray-400 mb-4 sm:mb-6">Bu məhsul üçün xüsusi ölçü və ya miqdar tələbiniz varsa, bizimlə əlaqə saxlayın.</p>
                            <Link href="/elaqe" className="block w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-center rounded-xl font-bold transition-all text-sm sm:text-base">
                                WhatsApp ilə Sifariş
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
};