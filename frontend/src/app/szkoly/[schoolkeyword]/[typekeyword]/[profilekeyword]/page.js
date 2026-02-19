"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Target,
	Search,
	Lightbulb,
	BriefcaseBusiness,
	Info,
	Diamond,
	Dot,
} from "lucide-react";
import WhatYouLearn from "@/components/Profiles/whatYouLearn";
import WhatWorkIsLike from "@/components/Profiles/whatWorkIsLike";
import WhatYouWillBeAbleToDo from "@/components/Profiles/whatYouWillBeAbleToDo";
import WhereYouWillFindEmployment from "@/components/Profiles/whereYouWillFindEmployment";
import { getProfile } from "@/lib/apimanager/apimanager";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Home() {
	const params = useParams();
	const { profilekeyword } = params;

	console.log("keyword: " + profilekeyword);

	const [profile, setProfile] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await getProfile(profilekeyword);
				console.log("Strapi Data:", res);

				if (Array.isArray(res.data) && res.data.length > 0) {
					setProfile(res.data[0]);
				} else {
					setProfile(res.data);
				}
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (profilekeyword) {
			fetchProfile();
		}
	}, [profilekeyword]);

	return (
		<div className='flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-4'>
			<div className='flex flex-col justify-center items-center w-[1666px] h-[811px] bg-white shadow-lg rounded-2xl p-6  relative translate-y-[-50px]'>
				{isLoading && <p>Ładowanie danych...</p>}
				{error && <p className='text-red-500'>Błąd: {error}</p>}
				{!isLoading && !error && (
					<>
						{/* Nagłówek */}
						<div className='flex justify-center items-center w-[1666px] h-[111px]'>
							<h1 className='text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 text-center uppercase tracking-wide'>
								<h1 className='text-2xl sm:text-3xl font-extrabold text-gray-800 text-center uppercase tracking-wide'>
									{profile?.name || "Brak danych"}
								</h1>
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
												<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
													<h2>Przedmioty Punktowane</h2>
													<h3>{profile.scored_subject}</h3>
												</div>
												<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
													<h2>przedmioty rozszerzone</h2>
													<h3>{profile.extended_subject}</h3>
												</div>
												<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
													<h2>Liczba klas</h2>
													<h3>{profile.number_of_branches}</h3>
												</div>
												<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
													<h2>Liczba miejsc</h2>
													<h3>{profile.number_of_students}</h3>
												</div>
											</div>
											<Separator />
											<div className='flex flex-col justify-center items-center'>
												<div className='flex flex-row justify-center items-center mt-3'>
													<Info />
													<h2 className='text-lg font-semibold text-gray-700 ml-1'>
														Opis profilu
													</h2>
												</div>
												<div className='flex justify-center items-center w-[555px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-1'>
													<h2>{profile.description}</h2>
												</div>
											</div>
											<Separator />
											<div className='flex justify-center items-center h-[125px]'>
												<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow'>
													<h1 className='text-xl font-extrabold text-gray-800 text-center'>
														{profile.encouraging_text}
													</h1>
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
											<Info />
											<h2 className='text-lg font-semibold text-gray-700 ml-1 mr-2'>
												Informacje dodatkowe
											</h2>
										</div>

										<div className='flex flex-col mt-3'>
											{profile.what_you_learn ||
											profile.what_you_will_be_able_to_do ||
											profile.where_you_will_find_employment ||
											profile.what_work_is_like ? (
												<>
													{profile.what_you_learn && (
														<WhatYouLearn data={profile.what_you_learn} />
													)}
													{profile.what_you_will_be_able_to_do && (
														<WhatYouWillBeAbleToDo
															data={profile.what_you_will_be_able_to_do}
														/>
													)}
													{profile.where_you_will_find_employment && (
														<WhereYouWillFindEmployment
															data={profile.where_you_will_find_employment}
														/>
													)}
													{profile.what_work_is_like && (
														<WhatWorkIsLike data={profile.what_work_is_like} />
													)}
												</>
											) : (
												<p className='text-center text-gray-500'>
													Brak dodatkowych danych dla tego profilu.
												</p>
											)}
										</div>
									</ScrollArea>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md'>
				<Navbar />
			</div>
		</div>
	);
}
