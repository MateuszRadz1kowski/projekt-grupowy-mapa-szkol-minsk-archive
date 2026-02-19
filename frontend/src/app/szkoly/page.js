"use client";
import Navbar from "@/components/Navbar";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SchoolShowcase from "@/components/Schools/schoolShowcase";
import { useState, useEffect } from "react";
import { getSchools } from "@/lib/apimanager/apimanager";

export default function Home() {
	const [schools, setSchools] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSchools = async () => {
			try {
				const res = await getSchools();
				console.log("Strapi Data:", res);
				setSchools(res.data);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err.message);
			}
		};

		fetchSchools();
	}, []);

	return (
		<div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 text-center p-4 overflow-hidden '>
			<AnimatedGroup>
				<div className='w-[1500px] bg-white shadow-lg rounded-2xl relative p-6 translate-y-[-50px]'>
					<h1 className='text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 text-center uppercase tracking-wide'>
						Szkoły średnie
					</h1>
					<ScrollArea className='rounded-md w-full h-[715px]'>
						<AnimatedGroup
							className='flex flex-row justify-start items-center space-x-4'
							preset='scale'>
							{schools && schools.length > 0 ? (
								schools.map((school) => (
									<SchoolShowcase key={school.id} school={school} />
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
