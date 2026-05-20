export interface Global {
  site_name: string;
  slogan: string;
  about_short: string;
  phone: number;
  email: string;
  maps_link: string;
  adress: string;
  logo: StrapiMedia;
}

export interface About {
  title: string;
  description: string;
  image: StrapiMedia;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
  category: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
}

export interface News {
  id: number;
  title: string;
  description: string;
  image: StrapiMedia;
  createdAt: string;
}

export interface Gallery {
  id: number;
  title: string;
  image: StrapiMedia;
}

export interface Career {
  id: number;
  title: string;
  description: string;
  requirements: string;
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface StrapiMedia {
  url: string;
  alternativeText: string | null;
}
