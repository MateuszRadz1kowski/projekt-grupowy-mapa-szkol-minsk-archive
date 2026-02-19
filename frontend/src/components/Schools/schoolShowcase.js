"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DialogFooter } from "../ui/dialog";
import { usePathname } from "next/navigation";

export default function SchoolShowcase({ school = {} }) {
  const {
    id = "",
    name = "Brak nazwy",
    address = "Brak adresu",
    keyword = "",
    profiles = [],
    school_types = [],
    image,
    media,
  } = school || {};

  const randomProfiles = [...profiles]
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const pathname = usePathname();

  return (
    <Card className="w-[444px] h-[688px] ml-5 flex flex-col justify-between">
      {/* Nagłówek karty */}
      <CardHeader className="flex-none">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-xs text-center">
          {address}
        </CardDescription>
      </CardHeader>

      {/* Zawartość karty */}
      <CardContent className="flex-grow flex flex-col items-center">
        <Image
          src={`http://51.38.130.72:1337/uploads/${image.hash}${image.ext}`}
          className="w-[300px] h-[300px]"
          width={500}
          height={500}
          alt="Zdjęcie szkoły"
        />

        {/* Wyświetlanie typów szkoły */}
        <div className="flex flex-wrap justify-center items-center mt-2 mb-2">
          {school_types.length > 0 ? (
            school_types.map((type) => (
              <Badge
                key={type.id}
                variant="secondary"
                className="bg-blue-100 text-blue-800 mr-2"
              >
                {type.name}
              </Badge>
            ))
          ) : (
            <Badge variant="outline">Brak informacji o typach</Badge>
          )}
        </div>

        {/* Wyświetlanie 3 losowych profili */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Przykładowe profile:
          </h2>
          {randomProfiles.length > 0 ? (
            randomProfiles.map((profile) => (
              <p
                key={profile.id}
                className="text-xs font-semibold text-gray-600 mt-2"
              >
                {profile.name ?? "Brak nazwy profilu"}
              </p>
            ))
          ) : (
            <p className="font-semibold text-gray-600 mt-2">Brak profili</p>
          )}
        </div>
      </CardContent>

      {/* Link przekierowywujący */}
      <DialogFooter className="flex-none">
        <Link
          className="flex justify-center items-center text-center bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          href={`${pathname}/${keyword}`}
        >
          Zobacz więcej
          <BottomGradient />
        </Link>
      </DialogFooter>
    </Card>
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
