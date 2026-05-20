import "server-only";

const dictionaries = {
  az: () => import("../dictionaries/az.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

// json faylının daxili strukturunun tipini avtomatic çıxarırıq
type DictionaryData = typeof import("../dictionaries/az.json");

export const getDictionary = async (locale: "az" | "en"): Promise<DictionaryData> => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.az();
};