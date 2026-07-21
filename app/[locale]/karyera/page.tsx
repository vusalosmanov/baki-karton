
import { getDictionary } from "@/lib/get-dictionary";
import KaryeraPage from "@/components/KaryeraPage";

interface KaryeraPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "az" | "en");
  
  console.log("Dictionary məzmunu:", dict); // Bura bax! 
  
  // Əgər konsolda 'careerPage' açarını görmürsənsə, deməli JSON faylın yanlışdır.
  return <KaryeraPage dict={dict?.careerPage || {}} />;
}
