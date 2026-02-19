export default async function getSchoolTypeNamesByKeyword(keyword) {
    try {
      const url =
        `${process.env.NEXT_PUBLIC_PB_URL}/api/school-type-names?filters[schools][keyword][$eq]=${keyword}` +
        `&filters[school_types][schools][keyword][$eq]=${keyword}` +
        `&populate[school_types][populate]=profiles` +
        `&populate[school_types][populate][profiles][filters][$and][0][school][keyword][$eq]=${keyword}` +
        `&populate[school_types][populate][profiles][filters][$and][1][school_type][schools][keyword][$eq]=${keyword}`;
  
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data = await res.json();
      console.log("getSchoolTypeNamesByKeyword response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }