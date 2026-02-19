"use client";

import React from "react";
import {
	Expandable,
	ExpandableTrigger,
	ExpandableCard,
	ExpandableCardContent,
	ExpandableContent,
} from "@/components/ui/expandable";
import { BriefcaseBusiness } from "lucide-react";

export default function WhereYouWillFindEmployment({ data }) {
	return (
		<Expandable
			expandDirection='both'
			expandBehavior='replace'
			onExpandStart={() =>
				console.log("Expanding 'Gdzie znajdziesz zatrudnienie?' card...")
			}
			onExpandEnd={() =>
				console.log("'Gdzie znajdziesz zatrudnienie?' card expanded!")
			}>
			{({ isExpanded }) => (
				<ExpandableTrigger>
					<ExpandableCard
						className='mb-[40px] w-full transition-transform duration-300 hover:scale-105'
						collapsedSize={{ width: 460, height: 100 }}
						expandedSize={{ width: 460, height: 320 }}
						hoverToExpand={false}
						expandDelay={500}
						collapseDelay={700}>
						<ExpandableCardContent>
							<div className='flex items-start mb-4'>
								<div className='flex-1'>
									<div className='flex flex-row justify-center items-center mt-5'>
										<BriefcaseBusiness />
										<h4
											className='font-medium text-gray-800 dark:text-white tracking-tight transition-all duration-300 ml-2'
											style={{
												fontSize: isExpanded ? "24px" : "18px",
												fontWeight: isExpanded ? "700" : "400",
											}}>
											{/* Jeśli nie ma nagłówka, wyświetlamy domyślny tekst */}
											{data?.header || "Gdzie znajdziesz zatrudnienie?"}
										</h4>
									</div>
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
								<div className='flex flex-col justify-center items-center'>
									{data?.where_you_will_find_employment?.items?.length > 0 ? (
										data.where_you_will_find_employment.items.map(
											(item, index) => (
												<div
													key={index}
													className='w-[95%] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2'>
													<h2>{item}</h2>
												</div>
											)
										)
									) : (
										<p className='text-gray-500 text-center'>
											Brak danych do wyświetlenia.
										</p>
									)}
								</div>
							</ExpandableContent>
						</ExpandableCardContent>
					</ExpandableCard>
				</ExpandableTrigger>
			)}
		</Expandable>
	);
}
