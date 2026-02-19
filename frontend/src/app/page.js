"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LockOpen, School, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import { getProfiles, getSchools } from "@/lib/apimanager/apimanager";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [profileAmount, setProfileAmount] = useState(0);
  const [schools, setSchools] = useState([]);
  const [schoolsAmount, setSchoolsAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await getProfiles();
        console.log("Strapi Data:", res);
        setProfiles(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };
    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await getSchools();
        console.log("Strapi Data:", res);
        setSchools(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    setProfileAmount(profiles.length);
    console.log(profileAmount);
  }, [profiles]);

  useEffect(() => {
    setSchoolsAmount(schools.length);
    console.log(schoolsAmount);
  }, [schools]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-300 to-gray-100 text-gray-900 text-center p-6 overflow-hidden">
      <AnimatedGroup>
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-7xl w-full z-10 transition-transform duration-300 hover:scale-105">
          <p className="text-lg font-medium text-gray-800">
            Sprawdź dostępne szkoły i wybierz idealną ścieżkę edukacyjną dla
            siebie!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 ">
            <Card className="flex flex-col justify-center items-center p-6 shadow-md rounded-xl transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <GraduationCap size={90} className="text-green-600 mx-auto" />
              </CardHeader>
              <CardContent className="text-lg font-semibold">
                {profileAmount} profili
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-center items-center p-6 shadow-md rounded-xl transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <School size={90} className="text-red-600 mx-auto" />
              </CardHeader>
              <CardContent className="text-lg font-semibold">
                {schoolsAmount} szkół
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-center items-center p-6 shadow-md rounded-xl transition-transform duration-300 hover:scale-105">
              <CardHeader>
                <LockOpen size={90} className="text-blue-600 mx-auto" />
              </CardHeader>
              <CardContent className="text-lg font-semibold flex flex-row justify-center items-center">
                <span className="ml-3 text-nowrap">Wiele możliwości</span>
              </CardContent>
            </Card>
          </div>
          <Link href="/mapa-szkol">
            <Button className="w-full sm:w-1/3 bg-yellow-400 hover:bg-yellow-500 text-white mt-10 py-3 text-lg font-semibold rounded-xl shadow-lg transition duration-300">
              Zobacz mapę szkół!
            </Button>
          </Link>
        </div>
      </AnimatedGroup>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <Navbar />
      </div>
    </div>
  );
}
