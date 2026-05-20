import { getNewsBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) return notFound();

    const imageUrl = news.image?.[0]?.url
        ? `http://localhost:1337${news.image[0].url}`
        : "/placeholder.jpg";

    return (
        <main className="min-h-screen bg-white pb-24">
            <article className="max-w-5xl mx-auto px-6">
                {/* 2. Başlıq Bölməsi - Daha Zərif Tipoqrafiya */}
                <header className="pt-16 pb-12 md:pt-24 md:pb-16 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-[1px] bg-blue-600"></span>
                        <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                            {news.category || "Sənaye"}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-8 max-w-4xl">
                        {news.title}
                    </h1>

                    <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                        <time>{new Date(news.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                        <span>•</span>
                        <span>4 dəqiqəlik oxunuş</span>
                    </div>
                </header>

                {/* 3. Şəkil Bölməsi - Səliqəli Çərçivə */}
                <div className="py-12">
                    <div className="relative aspect-[16/8] md:aspect-[21/9] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                        <img
                            src={imageUrl}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                    <p className="mt-4 text-center text-xs text-gray-400 italic">Vizual: {news.title} haqqında təsvir</p>
                </div>

                {/* 4. Məzmun Bölməsi */}
                <div className="max-w-3xl mx-auto py-8">
                    {news.description && (
                        <div className="relative mb-12">
                            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-blue-600 rounded-full"></div>
                            <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed pl-4">
                                {news.description}
                            </p>
                        </div>
                    )}

                    <div className="text-gray-800 text-lg md:text-[20px] leading-[1.8] space-y-8 whitespace-pre-wrap font-serif">
                        {news.body}
                    </div>
                </div>

                {/* 5. Sonluq - İmzalı Stil */}
                <footer className="max-w-3xl mx-auto mt-20 pt-12 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">BK</div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">Bakı Karton</p>
                            <p className="text-xs text-gray-500">Rəsmi Xəbər Portalı</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/xeberler" className="group flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                            <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Xəbərlərə qayıt
                        </Link>
                    </div>
                </footer>
            </article>
        </main>
    );
}