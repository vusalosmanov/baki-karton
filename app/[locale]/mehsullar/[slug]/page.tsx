import { getMehsulBySlug } from "@/lib/strapi";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const mehsul = await getMehsulBySlug(slug);

  if (!mehsul) return notFound();

  const allImages = [];
  if (mehsul.Image) allImages.push(mehsul.Image);
  if (Array.isArray(mehsul.Images)) allImages.push(...mehsul.Images);

  return <ProductDetails mehsul={mehsul} allImages={allImages} locale={locale} />;
}