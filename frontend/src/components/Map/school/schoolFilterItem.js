import { getProfile } from "@/lib/apimanager/apimanager";
import SchoolShowcaseItem from "./SchoolShowcaseItem";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SchoolFilterItem(szkola,profile) {
const profileVal = szkola.profile;
const szkolaVal = szkola.szkola;
const router = useRouter();

	console.log("SCHOOL", szkolaVal);
	console.log("PROFILE", profile);

if(szkolaVal!=null && profileVal==null){
			router.push(`/szkoly/${szkolaVal.keyword}`)
	}
else if(szkolaVal==null && profileVal!=null){
		router.push(`/szkoly/${profileVal.school.keyword}/${profileVal.school_type.keyword}/${profileVal.keyword}`)
	}
else if(szkolaVal!=null && profileVal!=null){
		router.push(`/szkoly/${szkolaVal.keyword}/${profileVal.school_type.keyword}/${profileVal.keyword}`)
	}
else{
	router.push(`/szkoly`)
}

	return (
		<div>

		</div>
	);
}
