"use client";

import { FocusCards } from "@/components/ui/focus-cards";
import { useState, useEffect } from "react";

export default function MapMode({ selectedMode, onChangeMode }) {
	const [title, setTitle] = useState("Light Mode");
	const SateliteMapa = "/pictures/mapa-satelita-zeskalowana.png";
	const defaultMapa = "/pictures/mapa-szkic-zeskalowana.png";
	const [mapSrc, setMapSrc] = useState(defaultMapa);

	useEffect(() => {
		const cookies = document.cookie.split("; ");
		const selectedModeCookie = cookies.find((cookie) =>
			cookie.startsWith("selectedMapMode=")
		);
		if (selectedModeCookie) {
			const mode = selectedModeCookie.split("=")[1];
			if (mode === "Satellite") {
				setTitle("Satellite Mode");
				setMapSrc(SateliteMapa);
			} else {
				setTitle("Light Mode");
				setMapSrc(defaultMapa);
			}
		}
	}, []);

	const handleCardClick = () => {
		const newMode = selectedMode === "Light" ? "Satellite" : "Light";
		onChangeMode(newMode);
		console.log(newMode);
		newMode === "Light" ? setMapSrc(defaultMapa) : setMapSrc(SateliteMapa);
	};

	const cards = [
		{
			title: title === "Light Mode" ? "Satellite Mode" : "Light Mode",
			src: mapSrc === defaultMapa ? SateliteMapa : defaultMapa,
		},
	];

	return (
		<div>
			<FocusCards cards={cards} onCardClick={handleCardClick} />
		</div>
	);
}
