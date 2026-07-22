// import { notFound } from "next/navigation";
// import ProductDetails from "@/components/ProductDetails";

// const API_URL = "http://83.229.84.217:5000";

// async function getMehsulById(id: string) {
//   try {
//     const res = await fetch(`${API_URL}/mehsullar/${id}`, { cache: 'no-store' });
//     if (!res.ok) return null;
//     return res.json();
//   } catch (error) {
//     console.error("Məhsul tapılmadı:", error);
//     return null;
//   }
// }

// export default async function SingleProductPage({
//   params,
// }: {
//   params: Promise<{ id: string; locale: string }>;
// }) {
//   const { id, locale } = await params;
//   if (!id) return notFound();

//   const mehsul = await getMehsulById(id);

//   if (!mehsul) return notFound();

//   // Bütün şəkilləri (əsas şəkil + əlavə nümunə şəkilləri) toplayırıq
//   const allImages: string[] = [];

//   if (mehsul.image_url) {
//     allImages.push(mehsul.image_url);
//   }

//   // Variantlardakı/əlavə şəkillərdəki nümunələri əlavə edirik
//   if (mehsul.product_variants && Array.isArray(mehsul.product_variants)) {
//     mehsul.product_variants.forEach((variant: any) => {
//       if (variant.image_url && !allImages.includes(variant.image_url)) {
//         allImages.push(variant.image_url);
//       }
//     });
//   }

//   return <ProductDetails mehsul={mehsul} allImages={allImages} locale={locale} />;
// }

import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

const API_URL = "http://83.229.84.217:5000";

async function getMehsulById(id: string) {
  try {
    const res = await fetch(`${API_URL}/mehsullar/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Məhsul tapılmadı:", error);
    return null;
  }
}

// Kateqoriyaya görə digər məhsulların şəkillərini də çəkmək üçün
async function getMehsullar() {
  try {
    const res = await fetch(`${API_URL}/mehsullar`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
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

  // Bütün məhsulları çəkirik ki, eyni kateqoriyaya aid olan digər şəkilləri də tapaq
  const allProducts = await getMehsullar();

  // Şəkilləri yığacağımız massiv
  const allImages: string[] = [];

  // 1. Əvvəlcə cari məhsulun öz əsas şəkli
  if (mehsul.image_url) {
    allImages.push(mehsul.image_url);
  }

  // 2. Əgər məhsulun variantları varsa onları əlavə edirik
  if (mehsul.product_variants && Array.isArray(mehsul.product_variants)) {
    mehsul.product_variants.forEach((variant: any) => {
      if (variant.image_url && !allImages.includes(variant.image_url)) {
        allImages.push(variant.image_url);
      }
    });
  }

  // 3. Eyni kateqoriyaya aid digər məhsulların şəkillərini də bura əlavə edirik
  if (allProducts && Array.isArray(allProducts)) {
    allProducts.forEach((item: any) => {
      if (item.category === mehsul.category && item.image_url) {
        if (!allImages.includes(item.image_url)) {
          allImages.push(item.image_url);
        }
      }
    });
  }

  return (
    <ProductDetails mehsul={mehsul} allImages={allImages} locale={locale} />
  );
}