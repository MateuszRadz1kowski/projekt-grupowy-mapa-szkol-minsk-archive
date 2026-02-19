export default async function getSchoolByType(typeId) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PB_URL}/api/school-types?filters[id][$eq]=${typeId}&populate=*`, {
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
      console.log("getSchoolByType response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
