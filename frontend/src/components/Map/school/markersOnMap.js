"use client";
import { MapContainer, Marker } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getSchoolShortDesc } from "@/lib/apimanager/apimanager";
import Link from "next/link";
import { PanelTop, Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function MarkersMapped() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedSchool, setSelectedSchool] = useState(null);
	const [schoolShortDesc, setSchoolShortDesc] = useState({});
	const [error, setError] = useState(null);

	const createIcon = (imagePath) => {
		return new L.Icon({
			iconUrl: `/pictures/${imagePath}`,
			iconSize: [80, 80],
			iconAnchor: [40, 80],
			popupAnchor: [0, -30],
		});
	};

	const budulIkona = createIcon("budulpin.png");
	const chemikIkona = createIcon("chemikpin.png");
	const ekonomIkona = createIcon("ekonompin.png");
	const mechanikIkona = createIcon("mechanpin.png");
	const pieknaIkona = createIcon("pieknapin.png");
	const zstgIkona = createIcon("zstgpin.png");

	const handleMarkerClick = async (schoolName) => {
		setSelectedSchool(schoolName);
		setIsDialogOpen(true);

		try {
			const res = await getSchoolShortDesc(schoolName);
			if (res.data && res.data.length > 0) {
				setSchoolShortDesc(res.data[0]);
			} else {
				setSchoolShortDesc({});
			}
		} catch (err) {
			console.error("Error fetching data:", err);
			setError(err.message);
			setSchoolShortDesc({});
		}
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
		setSchoolShortDesc({});
		setSelectedSchool(null);
		setError(null);
	};

	useEffect(() => {
		console.log(schoolShortDesc);
	}, [schoolShortDesc]);

	const mediaLinks = schoolShortDesc?.media
		? [
				{ icon: PanelTop, name: "Strona WWW", url: schoolShortDesc.media.page },
				{
					icon: Facebook,
					name: "Facebook",
					url: schoolShortDesc.media.facebook,
				},
				{
					icon: Instagram,
					name: "Instagram",
					url: schoolShortDesc.media.instagram,
				},
				{ icon: FaTiktok, name: "TikTok", url: schoolShortDesc.media.tiktok },
		  ].filter((media) => media.url)
		: [];

	return (
		<>
			<Marker
				icon={budulIkona}
				position={[52.18717278530837, 21.57126901308764]}
				eventHandlers={{
					click: () =>
						handleMarkerClick(
							"Zespół Szkół nr 1 im. Kazimierza Wielkiego w Mińsku Mazowieckim"
						),
				}}
			/>
			<Marker
				icon={chemikIkona}
				position={[52.17559189675974, 21.574479761360685]}
				eventHandlers={{
					click: () =>
						handleMarkerClick("Zespół Szkół im. Marii Skłodowskiej-Curie"),
				}}
			/>
			<Marker
				icon={ekonomIkona}
				position={[52.17922901190921, 21.56087714104334]}
				eventHandlers={{
					click: () =>
						handleMarkerClick(
							"Zespół Szkół Ekonomicznych w Mińsku Mazowieckim"
						),
				}}
			/>
			<Marker
				icon={mechanikIkona}
				position={[52.171574471748265, 21.544956312773877]}
				eventHandlers={{
					click: () =>
						handleMarkerClick(
							"Zespół Szkół Zawodowych nr 2 im. Powstańców Warszawy"
						),
				}}
			/>
			<Marker
				icon={pieknaIkona}
				position={[52.17717349662901, 21.550543832743024]}
				eventHandlers={{
					click: () =>
						handleMarkerClick(
							"Liceum Ogólnokształcące im. Polskiej Macierzy Szkolnej"
						),
				}}
			/>
			<Marker
				icon={zstgIkona}
				position={[52.18542324248727, 21.57252870657523]}
				eventHandlers={{
					click: () =>
						handleMarkerClick(
							"Zespół Szkół Turystyczno - Gastronomicznych w Mińsku Mazowieckim"
						),
				}}
			/>
			<Dialog open={isDialogOpen} onOpenChange={closeDialog} asChild>
				<DialogContent className='w-[900px] h-auto'>
					<DialogHeader>
						<DialogTitle>
							<div className='text-center'>
								<h1 className='text-1xl font-extrabold text-gray-900 mb-1 drop-shadow-md mt-5'>
									{schoolShortDesc?.name || "Brak nazwy"}
								</h1>
							</div>
						</DialogTitle>

						<DialogDescription>
							{/* Adres szkoły */}
							<div className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
								<p className='text-center text-gray-700'>
									{schoolShortDesc?.address || "Nie podano adresu"}
								</p>
							</div>

							{/* Typy szkół */}
							<div className='flex flex-row justify-center items-center flex-wrap gap-1 mt-3'>
								{schoolShortDesc?.school_types?.length > 0 ? (
									schoolShortDesc.school_types.map((type) => (
										<Badge
											key={type.id}
											variant='secondary'
											className='bg-blue-100 text-blue-800'>
											{type.name}
										</Badge>
									))
								) : (
									<p className='text-gray-700'>Brak informacji</p>
								)}
							</div>

							{/* Linki do mediów społecznościowych */}
							<div className='flex flex-col text-blue-600 underline'>
								{mediaLinks.length > 0 ? (
									mediaLinks.map((media, index) => (
										<div
											key={index}
											className='flex items-center text-gray-600 dark:text-gray-400 mt-2'>
											<media.icon className='w-4 h-4 mr-2' />
											<Link
												href={media.url}
												target='_blank'
												rel='noopener noreferrer'
												className='text-bg no-underline'>
												{media.name}
											</Link>
										</div>
									))
								) : (
									<p className='text-gray-700'>Brak informacji</p>
								)}
							</div>
						</DialogDescription>
						{/* Link przekierowywujący */}
						<DialogFooter className='flex-none'>
							<Link
								className='flex justify-center items-center text-center bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
								href={`/szkoly/${schoolShortDesc?.keyword}`}>
								Zobacz więcej
							</Link>
						</DialogFooter>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
