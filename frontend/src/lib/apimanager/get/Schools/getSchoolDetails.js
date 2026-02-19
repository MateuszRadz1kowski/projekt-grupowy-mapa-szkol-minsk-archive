export default async function getSchoolDetails(schoolId) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PB_URL}/api/school-type-names?filters[schools][id][$eq]=${schoolId}&fields[0]=name&populate[school_types][fields][1]=description`, {
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
      console.log("getSchoolDetails response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
