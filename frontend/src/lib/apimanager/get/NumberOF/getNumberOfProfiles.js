export default async function getNumberOfProfiles() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PB_URL}/api/profiles?pagination[page]=1&pagination[pageSize]=1`, {
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
      const totalProfiles = data?.meta?.pagination?.total || 0;
      console.log("getNumberOfProfilesInSchool response:", totalProfiles);
      return totalProfiles;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
