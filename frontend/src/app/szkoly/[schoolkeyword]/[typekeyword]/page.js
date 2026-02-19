"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, List } from "lucide-react";
import ProfileShowcase from "@/components/Schools/profileShowcase";
import { getSchoolDescriptionByKeyword } from "@/lib/apimanager/apimanager";
import { getProfilesShortDescriptionsByKeyword } from "@/lib/apimanager/apimanager";

export default function Home() {
	const { schoolkeyword, typekeyword } = useParams();

	console.log("schoolkeyword:", schoolkeyword);
	console.log("typekeyword:", typekeyword);

	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (schoolkeyword && typekeyword) {
			const fetchData = async () => {
				try {
					const response = await getSchoolDescriptionByKeyword(
						schoolkeyword,
						typekeyword
					);
					console.log("Strapi Data:", response);
					// Sprawdzamy, czy mamy odpowiedź z właściwością "data" zawierającą tablicę
					if (response && response.data && response.data.length > 0) {
						setData(response.data[0]);
					} else {
						setError("Brak danych w odpowiedzi API");
					}
				} catch (err) {
					console.error("Error fetching data:", err);
					setError(err.message);
				}
			};
			fetchData();
		}
	}, [schoolkeyword, typekeyword]);

	const [profiles, setProfiles] = useState([]); // Inicjalizacja stanu jako tablica
	const [profileError, setProfileError] = useState(null);

	useEffect(() => {
		const fetchProfiles = async () => {
			try {
				const res = await getProfilesShortDescriptionsByKeyword(
					schoolkeyword,
					typekeyword
				);
				console.log("Strapi Data: ", res);

				// Jeżeli res to obiekt, który ma pole data (z tablicą),
				// to pobierz właśnie tę tablicę:
				setProfiles(res.data);
			} catch (err) {
				console.error("Error fetching data:", err);
				setProfileError(err.message);
			}
		};

		fetchProfiles();
	}, [schoolkeyword, typekeyword]);


	// Pobieramy dane bezpiecznie
	const profileName = data?.name || "Brak nazwy profilu";
	const school =
		data?.schools && data.schools.length > 0 ? data.schools[0] : null;
	const schoolAddress = school?.address || "Brak adresu";
	const numberOfBranches = school?.number_of_branches || "Brak danych";
	const numberOfStudents = school?.number_of_students || "Brak danych";
	const numberOfProfiles = school?.profiles
		? school.profiles.length
		: "Brak danych";
	const schoolType =
		data?.school_types && data.school_types.length > 0
			? data.school_types[0]
			: null;
	const schoolDescription = schoolType?.description || "Brak opisu szkoły";

	return (
		<div className='flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-4'>
			<div className='flex flex-col justify-center items-center w-[1666px] h-[811px] bg-white shadow-lg rounded-2xl p-6 relative translate-y-[-50px]'>
				{/* Nagłówek */}
				<div className='flex flex-col justify-center items-center w-full h-[111px]'>
					<h1 className='text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 text-center uppercase tracking-wide'>
						{profileName}
					</h1>
				</div>
				<Separator />
				{/* Content */}
				<div className='flex flex-row justify-center items-center w-[1666px] h-[700px]'>
					{/* Główne informacje */}
					<div className='flex justify-center items-center w-[1600px] h-[700px]'>
						{/* Informacje ogólne */}
						<div className='flex flex-col justify-center items-center w-[1222px] h-[700px]'>
							<div className='flex flex-col w-[1222px] h-[700px] mr-3'>
								<div className='flex flex-row justify-center items-center mt-3'>
									<Info />
									<h2 className='text-lg font-semibold text-gray-700 ml-1'>
										Informacje ogólne
									</h2>
								</div>
								<div className='flex flex-col gap-2'>
									<div className='flex flex-row justify-center items-center'>
										{/* Adres szkoły */}
										<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
											<h2>{schoolAddress}</h2>
										</div>
										{/* Liczba profili */}
										{/* <div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
											<h2>Liczba profili: {numberOfProfiles}</h2>
										</div> */}
										{/* Liczba przewidzianych klas */}
										<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
											<h2>Liczba przewidzianych klas: {numberOfBranches}</h2>
										</div>
										{/* Liczba przewidzianych miejsc */}
										<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
											<h2>Liczba przewidzianych miejsc: {numberOfStudents}</h2>
										</div>
									</div>
									<Separator />
									{/* Opis szkoły */}
									<div className='flex flex-col justify-center items-center'>
										<div className='flex flex-row justify-center items-center mt-3'>
											<Info />
											<h2 className='text-lg font-semibold text-gray-700 ml-1'>
												Opis szkoły
											</h2>
										</div>
										<div className='flex justify-center items-center w-[555px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-1'>
											<h2>{schoolDescription}</h2>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Separator orientation='vertical' />
						{/* Profile */}
						<div className='flex flex-col justify-center items-center w-[444px] h-[700px]'>
							<ScrollArea className='rounded-md p-4 w-[470px] mr-[25px]'>
								<div className='flex flex-row justify-center items-center'>
									<List />
									<h2 className='text-lg font-semibold text-gray-700 ml-1 mr-2'>
										Lista profili
									</h2>
								</div>
								<div className='flex flex-col mt-3'>
									{profiles && profiles.length > 0 ? (
										profiles.map((profile, index) => (
											<ProfileShowcase
												key={profile.id || index}
												profile={profile}
											/>
										))
									) : profileError ? (
										<p className='text-red-500 font-semibold'>
											Błąd w pobieraniu danych: {profileError}
										</p>
									) : (
										<p className='text-gray-500'>
											Ładowanie lub brak danych...
										</p>
									)}
								</div>
							</ScrollArea>
						</div>
					</div>
				</div>
			</div>
			<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md'>
				<Navbar />
			</div>
		</div>
	);
}
