export default async function getProfilesShortDescriptionsByKeyword(
	schoolKeyword,
	schoolTypeKeyword
) {
	try {
		// Konstruowanie parametrów zapytania
		const queryParams = new URLSearchParams({
			"filters[school][keyword][$eq]": schoolKeyword,
			"filters[school_type][keyword][$eq]": schoolTypeKeyword,
			populate: "*",
		});

		const url = `${
			process.env.NEXT_PUBLIC_PB_URL
		}/api/profiles?${queryParams.toString()}`;
		console.log("Request URL:", url);

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
		console.log("Full API response:", data);

		// Zwracamy cały obiekt data bez dodatkowej modyfikacji
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}
