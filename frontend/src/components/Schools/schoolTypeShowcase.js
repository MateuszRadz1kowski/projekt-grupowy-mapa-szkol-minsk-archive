"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { usePathname } from "next/navigation";

export default function SchoolTypeShowcase({ schoolType = {} }) {
	const {
		id = "",
		name = "Brak nazwy",
		description = "",
		profiles = [],
		keyword = "",
	} = schoolType || {};

	const randomProfiles = [...profiles]
		.sort(() => 0.5 - Math.random())
		.slice(0, 3);

	const pathname = usePathname();

	return (
		<Card className='flex flex-col justify-between items-center w-[444px] h-[444px] p-6 shadow-md rounded-xl transition-transform duration-300 hover:scale-105 mt-[100px]'>
			<CardContent className='flex-grow flex items-center justify-center text-3xl font-semibold text-center'>
				{name}
			</CardContent>
			{/* Link przekierowujący */}
			<CardFooter className='w-full flex justify-center'>
				<Link
					className='flex justify-center items-center w-[300px] text-center bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					href={`${pathname}/${keyword}`}>
					Zobacz więcej
					<BottomGradient />
				</Link>
			</CardFooter>
		</Card>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
			<span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
		</>
	);
};
