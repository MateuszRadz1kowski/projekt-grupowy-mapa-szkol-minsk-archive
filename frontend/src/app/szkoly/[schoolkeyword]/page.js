"use client";
import Navbar from "@/components/Navbar";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SchoolTypeShowcase from "@/components/Schools/schoolTypeShowcase";
import { getSchoolTypeNamesByKeyword } from "@/lib/apimanager/apimanager";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Home() {
	const params = useParams();
	const { schoolkeyword } = params;

	console.log("keyword: " + schoolkeyword);

	const [schoolTypes, setSchoolTypes] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSchools = async () => {
			try {
				const res = await getSchoolTypeNamesByKeyword(schoolkeyword);
				console.log("Strapi Data:", res);

				// Pobranie i spłaszczenie `school_types`
				const extractedSchoolTypes = res.data.flatMap(
					(school) => school.school_types
				);

				setSchoolTypes(extractedSchoolTypes);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err.message);
			}
		};

		fetchSchools();
	}, [schoolkeyword]);

	return (
		<div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 text-center p-4 overflow-hidden '>
			<AnimatedGroup>
				<div className='w-[1500px] bg-white shadow-lg rounded-2xl relative p-6 translate-y-[-50px]'>
					<h1 className='text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 text-center uppercase tracking-wide'>
						Typ szkoły w {schoolkeyword}
					</h1>
					<ScrollArea className='rounded-md w-full h-[715px]'>
						<AnimatedGroup
							className='flex flex-row justify-center items-center space-x-4'
							preset='scale'>
							{schoolTypes && schoolTypes.length > 0 ? (
								schoolTypes.map((schoolType) => (
									<SchoolTypeShowcase
										key={schoolType.id}
										schoolType={schoolType}
									/>
								))
							) : error ? (
								<p className='text-red-500 font-semibold'>
									Błąd w pobieraniu danych: {error}
								</p>
							) : (
								<p className='text-gray-500'>Ładowanie lub brak danych...</p>
							)}
						</AnimatedGroup>
						<ScrollBar orientation='horizontal' className='overflow-y-hidden' />
					</ScrollArea>
				</div>
			</AnimatedGroup>
			<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md'>
				<Navbar />
			</div>
		</div>
	);
}
