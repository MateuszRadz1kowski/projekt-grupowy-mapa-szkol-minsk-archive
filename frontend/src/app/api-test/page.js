"use client";
import { useState, useEffect } from "react";
import {
	getProfiles,
	getSchools,
	getSchoolTypes,
} from "@/lib/apimanager/apimanager";

export default function ApiTest() {
	const [apiGetSchools, setApiGetSchools] = useState([]);
	const [apiGetSchoolTypes, setApiGetSchoolTypes] = useState([]);
	const [apiGetProfiles, setApiGetProfiles] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getStrapiData = async () => {
			try {
				const res = await getSchools();
				console.log("Strapi Data:", res);
				setApiGetSchools(res.data);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err.message);
			}
		};
		getStrapiData();
	}, []);

	useEffect(() => {
		const getStrapiData = async () => {
			try {
				const res = await getSchoolTypes();
				console.log("Strapi Data:", res);
				setApiGetSchoolTypes(res.data);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err.message);
			}
		};
		getStrapiData();
	}, []);

	useEffect(() => {
		const getStrapiData = async () => {
			try {
				const res = await getProfiles();
				console.log("Strapi Data:", res);
				setApiGetProfiles(res.data);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError(err.message);
			}
		};
		getStrapiData();
	}, []);

	return (
		<div className='flex justify-center items-center h-screen flex-col gap-6'>
			{error ? (
				<p className='text-red-500'>Błąd: {error}</p>
			) : (
				<ol>
					{apiGetSchools.map((item) => (
						<li key={item.id}>
							ID {item.id}: {item.name}, {item.address},{" "}
							{item.school_types[0].name}
						</li>
					))}
				</ol>
			)}

			{error ? (
				<p className='text-red-500'>Błąd: {error}</p>
			) : (
				<ol>
					{apiGetSchoolTypes.map((item) => (
						<li key={item.id}>
							ID {item.id}: {item.name}, {item.description}
						</li>
					))}
				</ol>
			)}

			{error ? (
				<p className='text-red-500'>Błąd: {error}</p>
			) : (
				<ol>
					{apiGetProfiles.map((item) => (
						<li key={item.id}>
							ID {item.id}: {item.name}, {item.extended_subjects}
						</li>
					))}
				</ol>
			)}
		</div>
	);
}
