"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { School, Wrench, Factory } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import SchoolFilterItem from "./schoolFilterItem";
import { getProfiles, getSchools, getSchoolShortDescs } from "@/lib/apimanager/apimanager";
import { Check, ChevronsUpDown } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter } from "next/navigation";

export default function SchoolFilter() {
  const [openFiltrProfil, setOpenFiltrProfil] = useState(false)
  const [valueFiltrProfil, setValueFiltrProfil] = useState("")
  const [profilesData,setProfilesData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [openFiltrSzkol, setOpenFiltrSzkol] = useState(false)
  const [valueFiltrSzkol, setValueFiltrSzkol] = useState("")
  const [szkolaData,setSzkolaData] = useState([]);
  const [selectedSzkola, setSelectedSzkola] = useState(null);

  const router = useRouter();

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const resProfile = await getProfiles();
          setProfilesData(resProfile.data);
          const resSzkola = await getSchoolShortDescs();
          setSzkolaData(resSzkola.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
        fetchProfile();
    },[]);

    const filterResults = () => {
      if(selectedSzkola!=null && selectedProfile==null){
        router.push(`/szkoly/${selectedSzkola.keyword}`)
    }
  else if(selectedSzkola==null && selectedProfile!=null ){
    console.log(selectedProfile)
      router.push(`/szkoly/${selectedProfile.school.keyword}/${selectedProfile.school_type.keyword}/${selectedProfile.keyword}`)
    }
  else if(selectedSzkola!=null && selectedProfile!=null){
      router.push(`/szkoly/${selectedSzkola.keyword}/${selectedProfile.school_type.keyword}/${selectedProfile.keyword}`)
    }
  // else if(selectedProfile.data[1]!=null){
  //     return (
  //       <Dialog asChlid defaultOpen>
  //         <DialogContent className="w-[750px] h-[750px]">
  //           <DialogHeader>
  //             <DialogTitle>Wyniki filtrowania:</DialogTitle>
  //             <DialogDescription>
  //               <SchoolFilterItem szkola={selectedSzkola} profile={selectedProfile} />
  //             </DialogDescription>
  //           </DialogHeader>
  //         </DialogContent>
  //       </Dialog>
  //     )
  //   }
  else{
    router.push(`/szkoly`)
  }
    }

  return (
    <div className="max-w-xl mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black w-[450px]">
       <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Wyszukiwanie
      </h2>
      <Separator />
        {/* <div className="flex flex-row ">
          <button
            className="relative group/btn flex flex-col space-x-2 items-center justify-center px-4 w-[100px] h-[160px] text-black rounded-md font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] ml-2"
            type="submit"
          >
            <School className="h-4 w-4 text-neutral-800 dark:text-neutral-300 mb-1" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Liceum
            </span>
            <BottomGradient />
          </button>
          <button
            className="relative group/btn flex flex-col space-x-2 items-center justify-center px-4 w-[100px] h-[160px] text-black rounded-md font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] ml-2"
            type="submit"
          >
            <Wrench className="h-4 w-4 text-neutral-800 dark:text-neutral-300 mb-1" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Technikum
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex flex-col space-x-2 items-center justify-center px-4 w-[100px] h-[160px] text-black rounded-md font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)] ml-2"
            type="submit"
          >
            <Factory className="h-4 w-4 text-neutral-800 dark:text-neutral-300 mb-1" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Szkoła Branżowa <br></br>I st.
            </span>
            <BottomGradient />
          </button>
        </div> */}
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full " />
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
          <Label htmlFor="password" className="text-black">
            Wyszukaj Szkołe
          </Label>
          <Popover open={openFiltrSzkol} onOpenChange={setOpenFiltrSzkol}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFiltrSzkol}
                className="w-[200px] justify-between text-black text-xs"
              >
                {szkolaData.length > 0
                  ? szkolaData.find((szkola) => szkola.name === valueFiltrSzkol)?.name || "Wybierz"
                  : "Wybierz"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Wyszukaj Szkoły" />
                <CommandList>
                  <CommandEmpty>Nie znaleziono żadnej szkoły</CommandEmpty>
                  <CommandGroup>
                    {szkolaData.map((szkola) => (
                      <CommandItem
                        key={szkola.id}
                        value={szkola.name}
                        onSelect={(currentValue) => {
                          setValueFiltrSzkol(currentValue);
                          setSelectedSzkola(szkola);
                          setOpenFiltrSzkol(false);
                        }}
                        className="text-black"
                      >
                        
                        {szkola.name}
                        
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
        <Label htmlFor="password" className="text-black">
            Wyszukaj Profil
          </Label>
          <Popover open={openFiltrProfil} onOpenChange={setOpenFiltrProfil}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFiltrProfil}
                className="w-[200px] justify-between text-black"
              >
                {profilesData.length > 0
                  ? profilesData.find((profile) => profile.name === valueFiltrProfil)?.name || "Wybierz"
                  : "Wybierz"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Wyszukaj Profil" />
                <CommandList>
                  <CommandEmpty>Nie znaleziono żadnych profili</CommandEmpty>
                  <CommandGroup>
                    {profilesData.map((profile) => (
                      <CommandItem
                        key={profile.id}
                        value={profile.name}
                        onSelect={(currentValue) => {
                          setValueFiltrProfil(currentValue);
                          setSelectedProfile(profile);
                          setOpenFiltrProfil(false);
                        }}
                        className="text-black"
                      >
                        
                        {profile.name}
                        
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

            </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          {/* <Label htmlFor="password" className="text-black">
            Przedmioty rozszerzone
          </Label>
          <Input
            id="password"
            placeholder="np. matematyka, geografia"
            type="text"
            disabled
          /> */}
        </LabelInputContainer>
        {/* <Dialog asChlid>
          <DialogTrigger className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
            <span>
              Filtruj szkoły
              <BottomGradient />
            </span>
          </DialogTrigger>
          <DialogContent className="w-[750px] h-[750px]">
            <DialogHeader>
              <DialogTitle>Wyniki filtrowania:</DialogTitle>
              <DialogDescription>
                <SchoolFilterItem szkola={selectedSzkola} profile={selectedProfile} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
                <Button onClick={filterResults}>Wyszukaj</Button>
                {/* <SchoolFilterItem szkola={selectedSzkola} profile={selectedProfile} /> */}
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
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

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
