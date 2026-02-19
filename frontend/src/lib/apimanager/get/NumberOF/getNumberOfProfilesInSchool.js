export default async function getNumberOfProfilesInSchool(schoolId, schoolTypeId) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PB_URL}/api/profiles?filters[school][$eq]=${schoolId}&filters[school_type]=${schoolTypeId}&pagination[pageSize]=1`, {
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
      const totalProfilesInSchool = data?.meta?.pagination?.total || 0;
      console.log("getNumberOfProfilesInSchool response:", totalProfilesInSchool);
      return totalProfilesInSchool;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
