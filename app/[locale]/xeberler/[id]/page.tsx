import { notFound } from "next/navigation";
import Link from "next/link";

async function getNewsById(id: string) {
  try {
    const res = await fetch(`http://83.229.84.217:5000/api/news/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  // JSON-da 'image_url' və ya 'image' ola biləcəyini nəzərə alırıq
  const rawPath = news.image_url || news.image;
  const imageUrl = rawPath
    ? rawPath.startsWith("http")
      ? rawPath
      : `http://83.229.84.217:5000${rawPath}`
    : "/placeholder.jpg";

  return (
    <main className="min-h-screen bg-white pb-24">
      <article className="max-w-5xl mx-auto px-6">
        <header className="pt-16 pb-12 md:pt-24 md:pb-16 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#00509D]"></span>
            <span className="text-[#00509D] text-xs font-bold uppercase tracking-widest">
              {news.category || "Sənaye"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-8 max-w-4xl">
            {news.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
            <time>
              {news.createdAt
                ? new Date(news.createdAt).toLocaleDateString("az-AZ", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </time>
          </div>
        </header>

        <div className="py-12">
          <div className="relative aspect-[16/8] md:aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
            <img
              src={imageUrl}
              alt={news.title || "Xəbər şəkli"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto py-8">
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed pl-6 border-l-4 border-[#00509D]">
            {news.description}
          </p>
        </div>

        <footer className="max-w-3xl mx-auto mt-20 pt-12 border-t border-gray-100">
          <Link
            href={`/${locale}/xeberler`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#00509D] transition-colors"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Xəbərlərə qayıt
          </Link>
        </footer>
      </article>
    </main>
  );
}