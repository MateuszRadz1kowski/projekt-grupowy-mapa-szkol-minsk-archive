"use client";

import React from "react";
import { Target, Dot, Diamond } from "lucide-react";
import {
	Expandable,
	ExpandableCard,
	ExpandableCardContent,
	ExpandableContent,
	ExpandableTrigger,
} from "@/components/ui/expandable";

export default function WhatYouLearn({ data }) {
	return (
		<Expandable
			expandDirection='both'
			expandBehavior='replace'
			onExpandStart={() => console.log("Expanding what you learn card...")}
			onExpandEnd={() => console.log("What you learn card expanded!")}>
			{({ isExpanded }) => (
				<ExpandableTrigger>
					<ExpandableCard
						className='mb-[40px] w-full transition-transform duration-300 hover:scale-105'
						collapsedSize={{ width: 460, height: 100 }}
						expandedSize={{ width: 460, height: 480 }}
						hoverToExpand={false}
						expandDelay={500}
						collapseDelay={700}>
						<ExpandableCardContent>
							<div className='flex items-start mb-4'>
								<div className='flex-1'>
									<div className='flex flex-row justify-center items-center mt-5'>
										<Target />
										<h4
											className='font-medium text-gray-800 dark:text-white tracking-tight transition-all duration-300'
											style={{
												fontSize: isExpanded ? "24px" : "18px",
												fontWeight: isExpanded ? "700" : "400",
											}}>
											Czego się nauczysz?
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
								<div className='flex flex-col gap-4'>
									{data?.what_you_learn?.sections?.length > 0 ? (
										data.what_you_learn.sections.map((section, index) => (
											<div
												key={index}
												className='p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2'>
												<div className='flex flex-row justify-center items-center'>
													<Diamond />
													<h2 className='text-lg font-semibold text-gray-700 ml-1'>
														{section.header}
													</h2>
												</div>
												{section.elements.map((item, itemIndex) => (
													<div
														key={itemIndex}
														className='flex flex-row justify-center items-center'>
														<Dot />
														<p className='text-sm font-semibold text-gray-700 ml-1'>
															{item}
														</p>
													</div>
												))}
											</div>
										))
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
