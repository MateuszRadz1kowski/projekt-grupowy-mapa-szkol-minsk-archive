export default async function getSchoolDescriptionByKeyword(
	schoolKeyword,
	schoolTypeKeyword
) {
	try {
		// Budujemy parametry zapytania do Strapi za pomocą URLSearchParams
		const query = new URLSearchParams({
			"filters[schools][keyword][$eq]": schoolKeyword,
			"filters[school_types][keyword][$eq]": schoolTypeKeyword,
			populate: "*",
		});

		// Wykonujemy zapytanie do API Strapi
		const res = await fetch(
			`${
				process.env.NEXT_PUBLIC_PB_URL
			}/api/school-type-names?${query.toString()}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);

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
