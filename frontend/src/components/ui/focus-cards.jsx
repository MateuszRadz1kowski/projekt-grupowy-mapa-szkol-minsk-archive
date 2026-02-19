"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
	({ card, index, hovered, setHovered, onClick }) => (
		<div
			onMouseEnter={() => setHovered(index)}
			onMouseLeave={() => setHovered(null)}
			onClick={() => onClick(card)}
			className={cn(
				"rounded-lg relative bg-neutral-100 dark:bg-neutral-900 overflow-hidden h-20 md:h-32 w-32 transition-all duration-300 ease-out cursor-pointer",
				hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
			)}>
			<Image
				src={card.src}
				alt={card.title}
				fill
				className='object-cover absolute inset-0'
			/>

			<div
				className={cn(
					"absolute inset-0 flex items-end py-4 px-2 transition-opacity duration-300",
					hovered === index ? "opacity-100" : "opacity-0"
				)}>
				{/* <div className='text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b bg-purple-500'>
          {card.title}
        </div> */}
			</div>
		</div>
	)
);

Card.displayName = "Card";

export function FocusCards({ cards, onCardClick }) {
	const [hovered, setHovered] = useState(null);

	return (
<div className='fixed top-4 left-[35vw] md:top-auto md:left-auto md:bottom-8 md:right-4 grid grid-cols-1 gap-2 w-32 transition-transform duration-300 hover:scale-110'>
				{cards.map((card, index) => (
				<Card
					key={card.title}
					card={card}
					index={index}
					hovered={hovered}
					setHovered={setHovered}
					onClick={onCardClick}
				/>
			))}
		</div>
	);
}
