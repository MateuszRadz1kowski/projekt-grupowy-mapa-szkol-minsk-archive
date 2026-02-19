"use client";
import React, { useState, useEffect } from "react";
import SchoolShowcaseItem from "./SchoolShowcaseItem";
import { ScrollArea } from "../../ui/scroll-area";
import { getSchoolShortDescs } from "@/lib/apimanager/apimanager";
import { Separator } from "@/components/ui/separator";

export default function SchoolShowcase() {
  const [schoolsShortDescs, setSchoolsShortDescs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolsShortDescs = async () => {
      try {
        const res = await getSchoolShortDescs();
        console.log("Strapi Data:", res);
        setSchoolsShortDescs(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };
    fetchSchoolsShortDescs();
  }, []);

  if (error) {
    return <div>Błąd: {error}</div>;
  }

  return (
    <div className="flex flex-col max-w-md w-[390px] h-[600px] mx-auto rounded-none md:rounded-2xl shadow-input bg-white dark:bg-black overflow-x-hidden overflow-y-hidden">
      <h2 className="font-bold text-xl p-4 md:p-8 text-neutral-800 dark:text-neutral-200 mb-4">
        Szkoły:
      </h2>
      <Separator />
      <div className="flex flex-col gap-4">
        <ScrollArea className="rounded-md border p-4 max-w-[390px] max-h-[520px]">
          <div className="-mt-9 -ml-6">
            {schoolsShortDescs && schoolsShortDescs.length > 0 ? (
              schoolsShortDescs.map((school) => (
                <SchoolShowcaseItem key={school.id} school={school} />
              ))
            ) : (
              <div>Ładowanie danych...</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
