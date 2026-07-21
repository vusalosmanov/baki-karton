import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

const API_URL = "http://83.229.84.217:5000";

async function getMehsulById(id: string) {
  try {
    const res = await fetch(`${API_URL}/mehsullar/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Məhsul tapılmadı:", error);
    return null;
  }
}

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  if (!id) return notFound();
  
  const mehsul = await getMehsulById(id);

  if (!mehsul) return notFound();

  // Şəkil məntiqi: 'image_url' sütununu yoxlayırıq
  const allImages = [];
  if (mehsul.image_url) {
    allImages.push(mehsul.image_url);
  }
  
  // Əgər bazada başqa şəkillər də varsa və onlar ayrıca massivdirsə, 
  // onları da əlavə edə bilərsən, amma hazırda sadəcə image_url-i götürürük.

  return <ProductDetails mehsul={mehsul} allImages={allImages} locale={locale} />;
}