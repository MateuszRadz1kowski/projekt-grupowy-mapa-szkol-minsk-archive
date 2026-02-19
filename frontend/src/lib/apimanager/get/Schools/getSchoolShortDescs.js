export default async function getSchoolShortDescs() {
	try {
		const res = await fetch(
			`http://51.38.130.72:1337/api/schools?populate=school_types&fields[0]=name&fields[1]=address&fields[2]=media&fields[3]=keyword`,
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
		console.log("getSchoolShortDesc response:", data);
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}
