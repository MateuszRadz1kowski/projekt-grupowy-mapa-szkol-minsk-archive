"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Bus, Train } from "lucide-react";

export default function CommuteBoard({ onSelectionChange }) {
  const [checkedItems, setCheckedItems] = useState({
    busStops: false,
    M1: false,
    M2: false,
    M3: false,
    M4: false,
    B1: false,
    B3: false,
    B4: false,
    trainStations: false,
  });

  useEffect(() => {
    const savedState = localStorage.getItem("checkedItems");
    if (savedState) {
      setCheckedItems(JSON.parse(savedState));
    }
  }, []);

  const toggleCheckbox = (key) => {
    setCheckedItems((prev) => {
      const updatedState = { ...prev, [key]: !prev[key] };
      localStorage.setItem("checkedItems", JSON.stringify(updatedState));
      onSelectionChange(updatedState);
      return updatedState;
    });
  };

  return (
    <div className="max-w-lg w-full h-full mx-auto rounded-2xl p-6 md:p-8 shadow-lg bg-white dark:bg-gray-900">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 mb-4">
        Dojazdy
      </h2>

      {/* Autobusy */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          <Bus /> Autobusy
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Przystanki autobusowe
        </h3>
        <CheckboxItem
          label="Pokaż przystanki w Mińsku Mazowieckim"
          checked={checkedItems.busStops}
          onChange={() => toggleCheckbox("busStops")}
        />
        <h4 className="mt-2 font-semibold text-gray-700 dark:text-gray-300">
          Linie miejskie "M"
        </h4>
        {["M1", "M2", "M3", "M4"].map((line) => (
          <CheckboxItem
            key={line}
            label={`Pokaż linię ${line}`}
            checked={checkedItems[line]}
            onChange={() => toggleCheckbox(line)}
          />
        ))}
        <h4 className="mt-2 font-semibold text-gray-700 dark:text-gray-300">
          Linie prywatne BAGS
        </h4>
        {["B1", "B3", "B4"].map((line) => (
          <CheckboxItem
            key={line}
            label={`Pokaż linię ${line}`}
            checked={checkedItems[line]}
            onChange={() => toggleCheckbox(line)}
          />
        ))}
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />
      {/* Kolej */}
      <div>
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
          <Train /> Kolej
        </div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Stacje kolejowe
        </h3>
        <CheckboxItem
          label="Pokaż stacje kolejowe w Mińsku Mazowieckim"
          checked={checkedItems.trainStations}
          onChange={() => toggleCheckbox("trainStations")}
        />
      </div>
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <Checkbox id={label} checked={checked} onCheckedChange={onChange} />
      <label
        htmlFor={label}
        className="text-sm font-medium text-neutral-800 dark:text-neutral-200 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};