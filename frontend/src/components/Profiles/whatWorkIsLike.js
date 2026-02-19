"use client";

import React, { useState } from "react";
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
import { Search, Dot } from "lucide-react";

export default function WhatWorkIsLike({ data }) {
	return (
		<Expandable
			expandDirection='both'
			expandBehavior='replace'
			onExpandStart={() => console.log("Expanding school card...")}
			onExpandEnd={() => console.log("School card expanded!")}>
			{({ isExpanded }) => (
				<ExpandableTrigger>
					<ExpandableCard
						className='mb-[40px] w-full transition-transform duration-300 hover:scale-105'
						collapsedSize={{ width: 460, height: 100 }}
						expandedSize={{ width: 460, height: 450 }}
						hoverToExpand={false}
						expandDelay={500}
						collapseDelay={700}>
						<ExpandableCardContent>
							<div className='flex items-start mb-4'>
								<div className='flex-1'>
									<div className='flex flex-row justify-center items-center mt-5'>
										<Search />
										<h4
											className='font-medium text-gray-800 dark:text-white tracking-tight transition-all duration-300'
											style={{
												fontSize: isExpanded ? "24px" : "18px",
												fontWeight: isExpanded ? "700" : "400",
											}}>
											Jak wygląda praca?
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
									<div className='flex flex-col justify-center items-center'>
										{data?.what_work_is_like?.items?.length > 0 ? (
											data.what_work_is_like.items.map((item, index) => (
												<div
													key={index}
													className='w-[95%] p-4 bg-white shadow-md rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow mt-2'>
													<h2>{item}</h2>
												</div>
											))
										) : (
											<p className='text-gray-500 text-center'>
												Brak danych do wyświetlenia.
											</p>
										)}
									</div>
								</div>
							</ExpandableContent>
						</ExpandableCardContent>
					</ExpandableCard>
				</ExpandableTrigger>
			)}
		</Expandable>
	);
}
