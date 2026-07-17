// const STRAPI_URL =
//   process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// export async function postKaryeraForm(
//   fullname: string,
//   email: string,
//   file: File | null,
// ) {
//   try {
//     const formData = new FormData();
//     const bodyData = {
//       FullName: fullname,
//       Mail: email,
//     };

//     formData.append("data", JSON.stringify(bodyData));

//     if (file) {
//       formData.append("files.cv", file);
//     }

//     const res = await fetch(`${STRAPI_URL}/api/karyeras`, {
//       method: "POST",
//       body: formData,
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       throw new Error(result.error?.message || "Strapi xətası");
//     }

//     return { success: true, data: result.data };
//   } catch (error: any) {
//     return { success: false, error: error.message };
//   }
// }

// export async function getStrapiImageByTitle(title: string) {
//   try {
//     const res = await fetch(
//       `${STRAPI_URL}/api/galleries?filters[title][$eq]=${title}&populate=*`,
//       {
//         cache: "no-store",
//       },
//     );
//     const json = await res.json();
//     const imageUrl = json.data?.[0]?.image?.[0]?.url;
//     if (!imageUrl) return null;
//     return `${STRAPI_URL}${imageUrl}`;
//   } catch (error) {
//     return null;
//   }
// }
// export async function getNews(locale: string = "az") {
//   try {
//     // URL-ə locale parametrini əlavə etdik
//     const res = await fetch(
//       `${STRAPI_URL}/api/news?locale=${locale}&populate=*&sort=createdAt:desc`,
//       {
//         cache: "no-store",
//       },
//     );

//     if (!res.ok) return [];

//     const json = await res.json();
//     return json.data || [];
//   } catch (error) {
//     console.error("Xəbərləri çəkərkən xəta baş verdi:", error);
//     return [];
//   }
// }

// export async function getNewsBySlug(slug: string) {
//   const STRAPI_URL =
//     process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

//   try {
//     // 1. Slug-u URL-ə uyğunlaşdır (encoded)
//     const encodedSlug = encodeURIComponent(slug);

//     // 2. Strapi 5-də `filters` çox həssasdır.
//     const url = `${STRAPI_URL}/api/news?filters[slug][$eq]=${encodedSlug}&populate=*`;

//     const res = await fetch(url, { cache: "no-store" });
//     const json = await res.json();

//     // 3. LOG yazaraq cavabı yoxla (Səhv hardadır görmək üçün)
//     console.log("Strapi cavabı:", JSON.stringify(json, null, 2));

//     // 4. Strapi 5/4 fərqi: json.data yoxsa birbaşa json?
//     const newsItem = Array.isArray(json.data) ? json.data[0] : json.data;

//     if (!newsItem) return null;

//     // Əgər məlumatlar 'attributes' içindədirsə (Strapi 4), onları düzəlt:
//     return newsItem.attributes
//       ? { id: newsItem.id, ...newsItem.attributes }
//       : newsItem;
//   } catch (error) {
//     console.error("News fetch error:", error);
//     return null;
//   }
// }
// export async function getSingleNews(id: string) {
//   try {
//     const res = await fetch(`${STRAPI_URL}/api/news/${id}?populate=*`, {
//       cache: "no-store",
//     });
//     const json = await res.json();
//     return json.data || null;
//   } catch (error) {
//     return null;
//   }
// }

// export async function getMediyaQuery(category = null) {
//   // const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

//   const categoryFilter = category ? `&filters[category][$eq]=${category}` : "";

//   const response = await fetch(
//     `${STRAPI_URL}/api/mediyas?populate=*${categoryFilter}`,
//     { cache: "no-store" },
//   );

//   const data = await response.json();
//   return data.data;
// }

// export async function getVideos() {
//   // const baseUrl = "http://localhost:1337";
//   try {
//     const response = await fetch(`${STRAPI_URL}/api/videos?populate=*`, {
//       cache: "no-store",
//     });
//     const data = await response.json();
//     return data.data || [];
//   } catch (error) {
//     return [];
//   }
// }

// export async function getMehsullar() {
//   try {
//     const res = await fetch(
//       `${STRAPI_URL}/api/mehsullars?populate=*&sort=createdAt:asc`,
//       {
//         cache: "no-store",
//       },
//     );

//     if (!res.ok) {
//       return [];
//     }

//     const json = await res.json();

//     if (!json.data) return [];

//     return json.data.map((item: any) => {
//       const data = item.attributes ? item.attributes : item;

//       return {
//         id: item.id,
//         title: data.title || "",
//         description: data.description || "",
//         slug: data.slug || "",
//         features: data.features || [],
//         image: data.image?.url
//           ? `${STRAPI_URL}${data.image.url}`
//           : data.image?.data?.attributes?.url
//             ? `${STRAPI_URL}${data.image.data.attributes.url}`
//             : null,
//       };
//     });
//   } catch (error) {
//     return [];
//   }
// }

// export async function getMehsulBySlug(slug: string) {
//   try {
//     const res = await fetch(
//       `${STRAPI_URL}/api/mehsullars?filters[slug][$eq]=${slug}&populate=*`,
//       {
//         cache: "no-store",
//       },
//     );

//     const data = await res.json();
//     const item = data.data?.[0];

//     if (item) {
//       if (item.image) {
//         item.image.url = `${STRAPI_URL}${item.image.url}`;
//       }

//       if (item.Images && Array.isArray(item.Images)) {
//         item.Images = item.Images.map((img: any) => ({
//           ...img,
//           url: `${STRAPI_URL}${img.url}`,
//         }));
//       }
//     }

//     return item;
//   } catch (error) {
//     return null;
//   }
// }

// export async function postMessage(formData: any) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/messages`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data: formData }),
//     });
//     return await res.json();
//   } catch (error) {
//     return { error: "Xəta baş verdi" };
//   }
// }