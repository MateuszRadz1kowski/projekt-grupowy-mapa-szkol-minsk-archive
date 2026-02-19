
    // <div
    //   className="bg-zinc-950 justify-center flex flex-col items-center min-h-screen w-full bg-cover bg-center"
    //   style={{
    //     backgroundImage:
    //       "linear-gradient(to right, rgba(0, 0, 0, 0.1), #18181b), url('/obraz2.jpg')",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getProfiles, getSchools } from "@/lib/apimanager/apimanager";
import Navbar from "@/components/Navbar";


export default function Kalkulator() {
	const [jpolski, setJpolski] = useState(0);
	const [matma, setMatma] = useState(0);
	const [jezyk, setJezyk] = useState(0);
	const [wyroznienie, setWyroznienie] = useState(0);
	const [wolontariat, setWolontariat] = useState(0);
	const [przedmiot1Ocena, setPrzedmiot1Ocena] = useState(0);
	const [przedmiot2Ocena, setPrzedmiot2Ocena] = useState(0);
	const [przedmiot3Ocena, setPrzedmiot3Ocena] = useState(0);
	const [przedmiot4Ocena, setPrzedmiot4Ocena] = useState(0);
	const [przedmiot5Ocena, setPrzedmiot5Ocena] = useState(0);
	const [konkurs1, setKonkurs1] = useState(0);
	const [konkurs2, setKonkurs2] = useState(0);
	const [konkurs3, setKonkurs3] = useState(0);
	const [konkurs4, setKonkurs4] = useState(0);
	const [konkurs5, setKonkurs5] = useState(0);
	const [kierunek, setKierunek] = useState(null);
	const [kierunki, setKierunki] = useState([]);
	const [szkola, setSzkola] = useState([]);
	const [szkoly, setSzkoly] = useState([]);
	var selectSelected = false

	useEffect(() => {
        const fetchProfile = async () => {
            try {
                const resProfile = await getProfiles();
                setKierunki(resProfile.data);
                console.log("Profile", resProfile);
                const resSzkola = await getSchools();
                setSzkoly(resSzkola.data);
                console.log("Szkoly", resSzkola);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchProfile();
    }, []);

	const Oblicz = () => {
		return Math.floor(
			jpolski * 0.35 +
				matma * 0.35 +
				jezyk * 0.3 +
				konkurs1 +
				konkurs2 +
				Math.floor(konkurs3) +
				Math.floor(konkurs4) +
				konkurs5 +
				przedmiot1Ocena +
				przedmiot2Ocena +
				przedmiot3Ocena +
				przedmiot4Ocena +
				przedmiot5Ocena +
				wyroznienie +
				wolontariat
		) > 200
			? 200
			: Math.floor(jpolski * 0.35) +
					Math.floor(matma * 0.35) +
					Math.floor(jezyk * 0.3) +
					konkurs1 +
					konkurs2 +
					Math.floor(konkurs3) +
					Math.floor(konkurs4) +
					konkurs5 +
					przedmiot1Ocena +
					przedmiot2Ocena +
					przedmiot3Ocena +
					przedmiot4Ocena +
					przedmiot5Ocena +
					wyroznienie +
					wolontariat;
	};

	return (
		<Card className='w-full h-[100%] flex flex-col items-center gap-10 bg-black'>
			<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md'>
				<Navbar />
			</div>
			<CardHeader className='text-6xl  text-white'>
				<CardTitle>Kalkulator punktów</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-5 items-center border-[5px] border-white w-[65%] '>
				<div className='flex flex-col gap-5 p-3 items-center text-white'>
					<p className='text-4xl font-bold'>Egzamin ósmoklasisty</p>

					<div className='flex flex-col gap-2 items-end'>
						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='jpolski' className='text-lg'>
								Język polski:{" "}
							</Label>
							<Input
								placeholder='Wynik egzaminu w %'
								max='100'
								min='0'
								type='number'
								id='jpolski'
								className='w-[185px] rounded-xl shadow-xl bg-blue-100 text-black'
								onChange={(e) => {
									setJpolski(e.target.value);
									const value = e.target.value;
    									if (value.length <= 3) {
											setJpolski(value);
											
											}else if(value.length>3){
											setJpolski(100);
											e.target.value=100
											}
								}}
							/>
							<Label htmlFor='jpolski'>
								{" "}
								{"(" + Math.floor(jpolski * 0.35) + " pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='matma' className='text-lg'>
								Matematyka:{" "}
							</Label>
							<Input
								placeholder='Wynik egzaminu w %'
								max='100'
								min='0'
								type='number'
								id='matma'
								className='w-[185px] rounded-xl shadow-xl bg-blue-100 text-black'
								onChange={(e) => {
									setMatma(e.target.value);
									const value = e.target.value;
										if (value.length <= 3) {
										setMatma(value);
										
										}else if(value.length>3){
										setMatma(100);
										e.target.value=100
										}
								}}
							/>
							<Label htmlFor='matma'>
								{" "}
								{"(" + Math.floor(matma * 0.35) + " pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='jezyk' className='text-lg'>
								Język obcy nowożytny:{" "}
							</Label>
							<Input
								placeholder='Wynik egzaminu w %'
								max='100'
								min='0'
								type='number'
								id='jezyk'
								className='w-[185px] rounded-xl shadow-xl bg-blue-100 text-black'
								onChange={(e) => {
									const value = e.target.value;
									setJezyk(e.target.value);
									if (value.length <= 3) {
										setJezyk(value);
										
									  }else if(value.length>3){
										setJezyk(100);
										e.target.value=100
									  }
								}}
							/>
							<Label htmlFor='jezyk'>
								{" "}
								{"(" + Math.floor(jezyk * 0.3) + " pkt.)"}{" "}
							</Label>
						</div>
					</div>
				</div>

				<hr className='w-full border-2 text-white'/>

				<div className='flex flex-col gap-5 p-3 items-center  text-white'>
					<p className='text-4xl font-bold'>Specjalne osiągnięcia</p>

					<div
						className='flex flex-row gap-2 items-center'
						onClick={() => {
							setWyroznienie(wyroznienie == 0 ? 7 : 0);
						}}>
						<Label htmlFor='wyroznienie' className='text-lg'>
							Świadectwo z wyróżnieniem:{" "}
						</Label>
						<Checkbox
							id='wyroznienie'
							checked={wyroznienie === 7}
							onChange={() => {
								setWyroznienie(wyroznienie == 0 ? 7 : 0);
							}}
						/>
						<Label htmlFor='wyroznienie'> {"(7 pkt.)"} </Label>
					</div>

					<div
						className='flex flex-row gap-2 items-center'
						onClick={() => {
							setWolontariat(wolontariat == 0 ? 3 : 0);
						}}>
						<Label htmlFor='wolontariat' className='text-lg'>
							Wolontariat:{" "}
						</Label>
						<Checkbox
							id='wolontariat'
							checked={wolontariat === 3}
							onChange={() => {
								setWolontariat(wolontariat == 3 ? 0 : 3);
							}}
						/>
						<Label htmlFor='wolontariat'> {"(3 pkt.)"} </Label>
					</div>
				</div>

				<hr className='w-full border-2 text-white'/>

				<div className='flex flex-col gap-5 p-3 items-center'>
					<div className='flex flex-row'>
						<p className='text-4xl font-bold text-white'>
							Świadectwo ukończenia szkoły podstawowej
						</p>

						<HoverCard>
							<HoverCardTrigger>
								<Info className='text-white'/>
							</HoverCardTrigger>
							<HoverCardContent className='text-center'>
								Jeżeli szkoła uwzględnia mniej niż 5 przedmiotów, pozostałe pola
								należy pozostawić puste.
							</HoverCardContent>
						</HoverCard>
					</div>


					{/* <Select id='szkola' onValueChange={(value) => setSzkoly(value)}>
                        <SelectTrigger className='w-[300px] rounded-xl bg-blue-100'>
                            <SelectValue placeholder='Wybierz szkołę' />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={null}>Brak</SelectItem>

                            {szkoly &&
                                szkoly.map((item, idx) => (
                                    <SelectItem key={idx} value={item.name} onInput={selectSelected=true}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>


                    <Select id='kierunek' onValueChange={(value) => setKierunek(value)}>
                        <SelectTrigger className='w-[300px] rounded-xl bg-blue-100'>
                            <SelectValue placeholder='Wybierz kierunek' />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value={null}>Brak</SelectItem>

                            {selectSelected==false && kierunki &&
                                kierunki.map((item, idx) => (
                                    <SelectItem key={idx} value={item}>
                                        {item.name}
                                    </SelectItem>
                                ))}

                            {selectSelected==true && szkoly &&
                                szkoly.map((item, idx) => (
                                    <SelectItem key={idx} value={item}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select> */}

					<div className='flex items-end flex-col gap-5'>
						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='przedmiot1Ocena' className='text-lg text-white'>
								{kierunek != null &&
								kierunek.przedmioty_punktowane.length &&
								kierunek.przedmioty_punktowane != null
									? kierunek.przedmioty_punktowane[0]
									: "Przedmiot punktowany podczas rekrutacji: "}
							</Label>

							<Select
								id='przedmiot1Ocena'
								onValueChange={(value) => {
									setPrzedmiot1Ocena(value);
								}}>
								<SelectTrigger className='w-[180px] shadow-xl rounded-xl bg-blue-100'>
									<SelectValue placeholder='Ocena' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={0}>Brak</SelectItem>
									<SelectItem value={18}>Celująca</SelectItem>
									<SelectItem value={17}>Bardzo dobra</SelectItem>
									<SelectItem value={14}>Dobra</SelectItem>
									<SelectItem value={8}>Dostateczna</SelectItem>
									<SelectItem value={2}>Dopuszczająca</SelectItem>
								</SelectContent>
								<Label className='text-white' htmlFor='przedmiot1Ocena'>
									{" "}
									{"(" + przedmiot1Ocena + " pkt.)"}{" "}
								</Label>
							</Select>
						</div>

						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='przedmiot2Ocena' className='text-lg text-white'>
								{kierunek != null
									? kierunek.przedmioty_punktowane[1]
									: "Przedmiot punktowany podczas rekrutacji: "}
							</Label>

							<Select
								id='przedmiot2Ocena'
								onValueChange={(value) => {
									setPrzedmiot2Ocena(value);
								}}>
								<SelectTrigger className='w-[180px] shadow-xl rounded-xl bg-blue-100'>
									<SelectValue placeholder='Ocena' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={0}>Brak</SelectItem>
									<SelectItem value={18}>Celująca</SelectItem>
									<SelectItem value={17}>Bardzo dobra</SelectItem>
									<SelectItem value={14}>Dobra</SelectItem>
									<SelectItem value={8}>Dostateczna</SelectItem>
									<SelectItem value={2}>Dopuszczająca</SelectItem>
								</SelectContent>
								<Label className='text-white' htmlFor='przedmiot2Ocena'>
									{" "}
									{"(" + przedmiot2Ocena + " pkt.)"}{" "}
								</Label>
							</Select>
						</div>

						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='przedmiot3Ocena' className='text-lg text-white'>
								{kierunek != null && kierunek.przedmioty_punktowane.length > 2
									? kierunek.przedmioty_punktowane[2]
									: "Przedmiot punktowany podczas rekrutacji: "}
							</Label>

							<Select
								id='przedmiot3Ocena'
								onValueChange={(value) => {
									setPrzedmiot3Ocena(value);
								}}>
								<SelectTrigger className='w-[180px] shadow-xl rounded-xl bg-blue-100'>
									<SelectValue placeholder='Ocena' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={0}>Brak</SelectItem>
									<SelectItem value={18}>Celująca</SelectItem>
									<SelectItem value={17}>Bardzo dobra</SelectItem>
									<SelectItem value={14}>Dobra</SelectItem>
									<SelectItem value={8}>Dostateczna</SelectItem>
									<SelectItem value={2}>Dopuszczająca</SelectItem>
								</SelectContent>
								<Label className='text-white' htmlFor='przedmiot3Ocena'>
									{" "}
									{"(" + przedmiot3Ocena + " pkt.)"}{" "}
								</Label>
							</Select>
						</div>

						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='przedmiot4Ocena' className='text-lg text-white'>
								{kierunek != null && kierunek.przedmioty_punktowane.length > 3
									? kierunek.przedmioty_punktowane[3]
									: "Przedmiot punktowany podczas rekrutacji: "}
							</Label>

							<Select
								id='przedmiot4Ocena'
								onValueChange={(value) => {
									setPrzedmiot4Ocena(value);
								}}>
								<SelectTrigger className='w-[180px] shadow-xl rounded-xl bg-blue-100'>
									<SelectValue placeholder='Ocena' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={0}>Brak</SelectItem>
									<SelectItem value={18}>Celująca</SelectItem>
									<SelectItem value={17}>Bardzo dobra</SelectItem>
									<SelectItem value={14}>Dobra</SelectItem>
									<SelectItem value={8}>Dostateczna</SelectItem>
									<SelectItem value={2}>Dopuszczająca</SelectItem>
								</SelectContent>
								<Label className='text-white' htmlFor='przedmiot4Ocena'>
									{" "}
									{"(" + przedmiot4Ocena + " pkt.)"}{" "}
								</Label>
							</Select>
						</div>

						<div className='flex flex-row gap-2 items-center'>
							<Label htmlFor='przedmiot5Ocena' className='text-lg text-white'>
								{kierunek != null && kierunek.przedmioty_punktowane.length > 4
									? kierunek.przedmioty_punktowane[4]
									: "Przedmiot punktowany podczas rekrutacji: "}
							</Label>

							<Select
								id='przedmiot5Ocena'
								onValueChange={(value) => {
									setPrzedmiot5Ocena(value);
								}}>
								<SelectTrigger className='w-[180px] shadow-xl rounded-xl bg-blue-100'>
									<SelectValue placeholder='Ocena' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={0}>Brak</SelectItem>
									<SelectItem value={18}>Celująca</SelectItem>
									<SelectItem value={17}>Bardzo dobra</SelectItem>
									<SelectItem value={14}>Dobra</SelectItem>
									<SelectItem value={8}>Dostateczna</SelectItem>
									<SelectItem value={2}>Dopuszczająca</SelectItem>
								</SelectContent>
								<Label className='text-white' htmlFor='przedmiot5Ocena'>
									{" "}
									{"(" + przedmiot5Ocena + " pkt.)"}{" "}
								</Label>
							</Select>
						</div>
					</div>
				</div>

				<hr className='w-full border-2 text-white'/>

				<div className='flex flex-col gap-5 p-3 items-center text-white'>
					<p className='text-4xl font-bold'>Konkursy</p>

					<p className='text-xl w-full font-[600]'>
						1. Uzyskanie w zawodach wiedzy będących konkursem o zasięgu
						ponadwojewódzkim organizowanym przez kuratorów oświaty na podstawie
						zawartych porozumień:
					</p>

					<RadioGroup
						defaultValue={0}
						id='konkurs1'
						onValueChange={(value) => {
							setKonkurs1(value);
						}}>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={0} id='brak1' />
							<Label htmlFor='brak1' className='text-[18px]'>
								Brak
							</Label>
							<Label htmlFor='brak1' className='text-[18px]'>
								{" "}
								{"(0 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={10} id='final0' />
							<Label htmlFor='final0' className='text-[18px]'>
								Tytułu finalisty konkursu przedmiotowego
							</Label>
							<Label htmlFor='final0' className='text-[18px]'>
								{" "}
								{"(10 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={7} id='laureat1' />
							<Label htmlFor='laureat1' className='text-[18px]'>
								Tytułu laureata konkursu tematycznego albo interdyscyplinarnego
							</Label>
							<Label htmlFor='laureat1' className='text-[18px]'>
								{" "}
								{"(7 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={5} id='final1' />
							<Label htmlFor='final1' className='text-[18px]'>
								Tytułu finalisty konkursu tematycznego albo interdyscyplinarnego
							</Label>
							<Label htmlFor='final1' className='text-[18px]'>
								{" "}
								{"(5 pkt.)"}{" "}
							</Label>
						</div>
					</RadioGroup>

					<hr className='w-full border-2 text-white' />

					<p className='text-xl w-full font-[600]'>
						2. Uzyskanie w zawodach wiedzy będących konkursem o zasięgu
						międzynarodowym albo ogólnopolskim:
					</p>

					<RadioGroup
						defaultValue={0}
						id='konkurs2'
						onValueChange={(value) => {
							setKonkurs2(value);
						}}>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={0} id='brak2' />
							<Label htmlFor='brak2' className='text-[18px]'>
								Brak
							</Label>
							<Label htmlFor='brak2' className='text-[18px]'>
								{" "}
								{"(0 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={10} id='final2' />
							<Label htmlFor='final2' className='text-[18px]'>
								Tytułu finalisty konkursu przedmiotowego
							</Label>
							<Label htmlFor='final2' className='text-[18px]'>
								{" "}
								{"(10 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={7} id='laureat2' />
							<Label htmlFor='laureat2' className='text-[18px]'>
								Tytułu laureata konkursu interdyscyplinarnego
							</Label>
							<Label htmlFor='laureat2' className='text-[18px]'>
								{" "}
								{"(7 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={5} id='final3' />
							<Label htmlFor='final3' className='text-[18px]'>
								Tytułu finalisty konkursu interdyscyplinarnego
							</Label>
							<Label htmlFor='final3' className='text-[18px]'>
								{" "}
								{"(5 pkt.)"}{" "}
							</Label>
						</div>
					</RadioGroup>

					<hr className='w-full border-2 text-white' />

					<p className='text-xl w-full font-[600]'>
						3. Uzyskanie w zawodach wiedzy będących konkursem o zasięgu
						wojewódzkim organizowanym przez kuratora oświaty:
					</p>

					<RadioGroup
						defaultValue={0}
						id='konkurs3'
						onValueChange={(value) => {
							setKonkurs3(value);
						}}>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={0} id='brak3' />
							<Label htmlFor='brak3' className='text-[18px]'>
								Brak
							</Label>
							<Label htmlFor='brak3' className='text-[18px]'>
								{" "}
								{"(0 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={10} id='final4' />
							<Label htmlFor='final4' className='text-[18px]'>
								Dwóch lub więcej tytułów finalisty konkursu przedmiotowego
							</Label>
							<Label htmlFor='final4' className='text-[18px]'>
								{" "}
								{"(10 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={7.00001} id='laureat3' />
							<Label htmlFor='laureat3' className='text-[18px]'>
								Dwóch lub więcej tytułów laureata konkursu tematycznego lub
								interdyscyplinarnego
							</Label>
							<Label htmlFor='laureat3' className='text-[18px]'>
								{" "}
								{"(7 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={5.0000001} id='final5' />
							<Label htmlFor='final5' className='text-[18px]'>
								Dwóch lub więcej tytułów finalisty konkursu tematycznego lub
								interdyscyplinarnego
							</Label>
							<Label htmlFor='final5' className='text-[18px]'>
								{" "}
								{"(5 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={7.000001} id='final6' />
							<Label htmlFor='final6' className='text-[18px]'>
								Tytułu finalisty konkursu przedmiotowego
							</Label>
							<Label htmlFor='final6' className='text-[18px]'>
								{" "}
								{"(7 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={5.000001} id='laureat4' />
							<Label htmlFor='laureat4' className='text-[18px]'>
								Tytułu laureata konkursu tematycznego albo interdyscyplinarnego
							</Label>
							<Label htmlFor='laureat4' className='text-[18px]'>
								{" "}
								{"(5 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={3} id='final7' />
							<Label htmlFor='final7' className='text-[18px]'>
								Tytułu finalisty konkursu tematycznego albo interdyscyplinarnego
							</Label>
							<Label htmlFor='final7' className='text-[18px]'>
								{" "}
								{"(3 pkt.)"}{" "}
							</Label>
						</div>
					</RadioGroup>

					<hr className='w-full border-2 text-white' />

					<p className='text-xl w-full font-[600]'>
						4. Uzyskanie w zawodach wiedzy będących konkursem o zasięgu
						ponadwojewódzkim lub wojewódzkim:
					</p>

					<RadioGroup
						defaultValue={0}
						id='konkurs4'
						onValueChange={(value) => {
							setKonkurs4(value);
						}}>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={0} id='brak4' />
							<Label htmlFor='brak4' className='text-[18px]'>
								Brak
							</Label>
							<Label htmlFor='brak4' className='text-[18px]'>
								{" "}
								{"(0 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={10} id='final40' />
							<Label htmlFor='final40' className='text-[18px]'>
								Dwóch lub więcej tytułów finalisty konkursu przedmiotowego
							</Label>
							<Label htmlFor='final40' className='text-[18px]'>
								{" "}
								{"(10 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={7} id='laureat30' />
							<Label htmlFor='laureat30' className='text-[18px]'>
								Dwóch lub więcej tytułów laureata konkursu interdyscyplinarnego
							</Label>
							<Label htmlFor='laureat30' className='text-[18px]'>
								{" "}
								{"(7 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={7.0000001} id='final50' />
							<Label htmlFor='final50' className='text-[18px]'>
								Tytułu finalisty konkursu przedmiotowego
							</Label>
							<Label htmlFor='final50' className='text-[18px]'>
								{" "}
								{"(7 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={5} id='final60' />
							<Label htmlFor='final60' className='text-[18px]'>
								Tytułu laureata konkursu interdyscyplinarnego
							</Label>
							<Label htmlFor='final60' className='text-[18px]'>
								{" "}
								{"(5 pkt.)"}{" "}
							</Label>
						</div>
					</RadioGroup>

					<hr className='w-full border-2 text-white' />

					<p className='text-xl w-full font-[600]'>
						5. Uzyskanie wysokiego miejsca nagrodzonego lub uhonorowanego
						zwycięskim tytułem w zawodach wiedzy innych niż wymienione w pkt.
						1–4, artystycznych i sportowych, organizowanych przez kuratora
						oświaty lub inne podmioty działające na terenie szkoły, na szczeblu:
					</p>

					<RadioGroup
						defaultValue={0}
						id='konkurs5'
						onValueChange={(value) => {
							setKonkurs5(value);
						}}>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={0} id='brak5' />
							<Label htmlFor='brak5' className='text-[18px]'>
								Brak
							</Label>
							<Label htmlFor='brak5' className='text-[18px]'>
								{" "}
								{"(0 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={4} id='miedzy' />
							<Label htmlFor='miedzy' className='text-[18px]'>
								Międzynarodowym
							</Label>
							<Label htmlFor='miedzy' className='text-[18px]'>
								{" "}
								{"(4 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={3} id='kraj' />
							<Label htmlFor='kraj' className='text-[18px]'>
								Krajowym
							</Label>
							<Label htmlFor='kraj' className='text-[18px]'>
								{" "}
								{"(3 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={2} id='wojew' />
							<Label htmlFor='wojew' className='text-[18px]'>
								Wojewódzkim
							</Label>
							<Label htmlFor='wojew' className='text-[18px]'>
								{" "}
								{"(2 pkt.)"}{" "}
							</Label>
						</div>

						<div className='flex items-center space-x-2'>
							<RadioGroupItem value={1} id='powiat' />
							<Label htmlFor='powiat' className='text-[18px]'>
								Powiatowym
							</Label>
							<Label htmlFor='powiat' className='text-[18px]'>
								{" "}
								{"(1 pkt.)"}{" "}
							</Label>
						</div>
					</RadioGroup>
				</div>

				<Button className='h-[5vh] w-[50%] bg-slate-600 text-3xl sticky z-50 bottom-0'>
					Twoje punkty: <Oblicz />
				</Button>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}
