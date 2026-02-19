"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
	IconHome,
	IconSchool,
	IconMapPin,
	IconBus,
	IconCalculator,
	IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";

export default function Navbar() {
	//https://ui.aceternity.com/components/floating-dock
	const links = [
		{
			title: "Mapa dojazdów",
			icon: (
				<IconBus className='h-full w-full text-neutral-500 dark:text-neutral-300' />
			),
			href: "/mapa-dojazdow",
		},
		{
			title: "Mapa szkół",
			icon: (
				<IconMapPin className='h-full w-full text-neutral-500 dark:text-neutral-300' />
			),
			href: "/mapa-szkol",
		},
		{
			title: "Szkoły średnie",
			icon: (
				<IconSchool className='h-full w-full text-neutral-500 dark:text-neutral-300' />
			),
			href: "/szkoly",
		},
		{
			title: "Strona powitalna",
			icon: (
				<IconHome className='h-full w-full text-neutral-500 dark:text-neutral-300' />
			),
			href: "/",
		},
		{
			title: "Kalkulator punktów",
			icon: (
				<IconCalculator className='h-full w-full text-neutral-500 dark:text-neutral-300' />
			),
			href: "/kalkulator-punktow",
		},
		{
			title: "Kontakt",
			icon: (
				<IconPhone className='h-full w-full text-neutral-500 dark:text-neutral-300' />
			),
			href: "/kontakt",
		},
		{
			title: "Strona Powiatu Mińskiego",
			icon: (
				<Image
					src='/pictures/logo-mmz.png'
					width={250}
					height={250}
					alt='Logo Mińsk Mazowiecki'
				/>
			),
			href: "https://www.powiatminski.pl/",
			isExternal: true,
		},
		{
			title: "Strona Rekrutacji Vulcan",
			icon: (
				<Image
					src='/pictures/logo-vulcan.png'
					width={250}
					height={250}
					alt='Logo Vulcan'
				/>
			),
			href: "https://www.vulcan.edu.pl/samorzady/oprogramowanie/systemy-naborowe",
			isExternal: true,
		},
	];

	return (
		<div className='flex flex-col '>
			<div className='flex justify-center w-full py-4'>
				<FloatingDock items={links} />
			</div>
		</div>
	);
}
