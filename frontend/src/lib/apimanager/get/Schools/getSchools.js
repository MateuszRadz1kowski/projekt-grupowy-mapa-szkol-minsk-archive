export default async function getSchools() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PB_URL}/api/schools?populate=*`, {
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
      console.log("getSchools response:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
