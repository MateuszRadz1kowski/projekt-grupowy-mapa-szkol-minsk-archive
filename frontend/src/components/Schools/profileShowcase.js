"use client";

import React from "react";
import { PanelTop, Facebook, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Expandable,
	ExpandableCard,
	ExpandableCardContent,
	ExpandableCardFooter,
	ExpandableCardHeader,
	ExpandableContent,
	ExpandableTrigger,
} from "@/components/ui/expandable";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileShowcase({ profile = {} }) {
	const pathname = usePathname();

	const {
		id = "",
		name = "Brak nazwy",
		extended_subject = "Brak rozszerzonych przedmiotów",
		scored_subject = "Brak punktowanych przedmiotów",
		number_of_branches = 0,
		number_of_students = 0,
		keyword = "",
	} = profile || {};

	return (
		<Expandable
			expandDirection='both'
			expandBehavior='replace'
			onExpandStart={() => console.log("Expanding school card...")}
			onExpandEnd={() => console.log("School card expanded!")}>
			{({ isExpanded }) => (
				<ExpandableTrigger>
					<ExpandableCard
						className='mb-[60px] w-full relative transition-transform duration-300 hover:scale-105'
						collapsedSize={{ width: 460, height: 100 }}
						expandedSize={{ width: 460, height: 575 }}
						hoverToExpand={false}
						expandDelay={500}
						collapseDelay={700}>
						<ExpandableCardContent>
							<div className='flex items-start mb-4'>
								<div className='flex-1'>
									<h4
										className='font-medium text-gray-800 dark:text-white tracking-tight transition-all duration-300 mt-8'
										style={{
											fontSize: isExpanded ? "24px" : "18px",
											fontWeight: isExpanded ? "700" : "400",
										}}>
										{name}
									</h4>
								</div>
							</div>
							<ExpandableContent
								preset='fade'
								keepMounted={false}
								animateIn={{
									initial: { opacity: 0, y: 20 },
									animate: { opacity: 1, y: 0 },
									transition: { type: "spring", stiffness: 300, damping: 20 },
								}}>
								<div className='space-y-4'>
									<div className='flex flex-col gap-4'>
										<div className='flex flex-col justify-center items-center'>
											<div className='w-[300px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
												<h2>przedmioty punktowane</h2>
												<h3>{scored_subject}</h3>
											</div>
											<div className='w-[300px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
												<h2>przedmioty rozszerzone</h2>
												<h3>{extended_subject}</h3>
											</div>
											<div className='w-[300px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
												<h2>Liczba klas</h2>
												<h3>{number_of_branches}</h3>
											</div>
											<div className='w-[300px] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2 ml-2'>
												<h2>Liczba miejsc</h2>
												<h3>{number_of_students}</h3>
											</div>
										</div>
									</div>
									<Link href={`${pathname}/${keyword}`}>
										<Button className='w-full bg-blue-600 hover:bg-blue-700 text-white mt-5'>
											Zobacz profil
										</Button>
									</Link>
								</div>
							</ExpandableContent>
						</ExpandableCardContent>
					</ExpandableCard>
				</ExpandableTrigger>
			)}
		</Expandable>
	);
}
