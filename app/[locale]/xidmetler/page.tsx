import { getDictionary } from "@/lib/get-dictionary";
import ServicesClient from "@/components/ServicesClient";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "az" | "en");

  return <ServicesClient dict={dict?.servicesPage || {}} />;
}
