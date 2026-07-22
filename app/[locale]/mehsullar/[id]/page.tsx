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

  // Bütün şəkilləri (əsas şəkil + əlavə nümunə şəkilləri) toplayırıq
  const allImages: string[] = [];
  
  if (mehsul.image_url) {
    allImages.push(mehsul.image_url);
  }

  // Variantlardakı/əlavə şəkillərdəki nümunələri əlavə edirik
  if (mehsul.product_variants && Array.isArray(mehsul.product_variants)) {
    mehsul.product_variants.forEach((variant: any) => {
      if (variant.image_url && !allImages.includes(variant.image_url)) {
        allImages.push(variant.image_url);
      }
    });
  }
  
  return <ProductDetails mehsul={mehsul} allImages={allImages} locale={locale} />;
}