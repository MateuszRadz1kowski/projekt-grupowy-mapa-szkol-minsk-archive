export default async function getNumberOfProfilesInSchoolType(schoolTypeId) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PB_URL}/api/profiles?filters[school_type][$eq]=${schoolTypeId}&pagination[pageSize]=1`, {
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
      const totalProfilesInSchoolType = data?.meta?.pagination?.total || 0;
      console.log("getNumberOfProfilesInSchool response:", totalProfilesInSchoolType);
      return totalProfilesInSchoolType;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
