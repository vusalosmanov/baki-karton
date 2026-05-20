const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function postKaryeraForm(fullname: string, email: string, file: File | null) {
  try {
    const formData = new FormData();
    const bodyData = {
      FullName: fullname,
      Mail: email,
    };

    formData.append("data", JSON.stringify(bodyData));

    if (file) {
      formData.append("files.cv", file);
    }

    const res = await fetch(`${STRAPI_URL}/api/karyeras`, {
      method: "POST",
      body: formData,

    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error?.message || "Strapi xətası");
    }

    return { success: true, data: result.data };
  } catch (error: any) {

    return { success: false, error: error.message };
  }
}


export async function getStrapiImageByTitle(title: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/galleries?filters[title][$eq]=${title}&populate=*`, {
      cache: 'no-store'
    });
    const json = await res.json();
    const imageUrl = json.data?.[0]?.image?.[0]?.url;
    if (!imageUrl) return null;
    return `${STRAPI_URL}${imageUrl}`;
  } catch (error) {
    return null;
  }
}


export async function getNews() {
  try {

    const res = await fetch(`${STRAPI_URL}/api/news?populate=*&sort=createdAt:desc`, {
      cache: 'no-store'
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json.data || [];
  } catch (error) {

    return [];
  }
}

export async function getNewsBySlug(slug: string) {
  // const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const decodedSlug = decodeURIComponent(slug);


    const url = `${STRAPI_URL}/api/news?filters[slug][$eq]=${decodedSlug}&populate=*`;

    const res = await fetch(url, { cache: 'no-store' });
    const json = await res.json();



    if (json.data && json.data.length > 0) {
      return json.data[0];
    }

    return null;
  } catch (error) {
    return null;
  }
}
export async function getSingleNews(id: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/news/${id}?populate=*`, {
      cache: 'no-store'
    });
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    return null;
  }
}

export async function getMediyaQuery(category = null) {
  // const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const categoryFilter = category
    ? `&filters[category][$eq]=${category}`
    : "";

  const response = await fetch(
    `${STRAPI_URL}/api/mediyas?populate=*${categoryFilter}`,
    { cache: 'no-store' }
  );

  const data = await response.json();
  return data.data;
}

export async function getVideos() {
  // const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(`${STRAPI_URL}/api/videos?populate=*`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export async function getMehsullar() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/mehsullars?populate=*&sort=createdAt:asc`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();

    if (!json.data) return [];

    return json.data.map((item: any) => {
      const data = item.attributes ? item.attributes : item;

      return {
        id: item.id,
        title: data.title || "",
        description: data.description || "",
        slug: data.slug || "",
        features: data.features || [],
        image: data.image?.url
          ? `${STRAPI_URL}${data.image.url}`
          : data.image?.data?.attributes?.url
            ? `${STRAPI_URL}${data.image.data.attributes.url}`
            : null,
      };
    });
  } catch (error) {
    return [];
  }
}

export async function getMehsulBySlug(slug: string) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/mehsullars?filters[slug][$eq]=${slug}&populate=*`, {
      cache: 'no-store'
    });

    const data = await res.json();
    const item = data.data?.[0];

    if (item) {
      if (item.image) {
        item.image.url = `${STRAPI_URL}${item.image.url}`;
      }

      if (item.Images && Array.isArray(item.Images)) {
        item.Images = item.Images.map((img: any) => ({
          ...img,
          url: `${STRAPI_URL}${img.url}`
        }));
      }
    }

    return item;
  } catch (error) {
    return null;
  }
}