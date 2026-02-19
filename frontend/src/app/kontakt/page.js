import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { AnimatedGroup } from "@/components/ui/animated-group";
import Image from "next/image";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Home() {
	return (
		<div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 p-6'>
			<AnimatedGroup>
				<div className='flex flex-col md:flex-row gap-8 w-full max-w-5xl'>
					{/* Informacje o starostwie */}
					<div className='bg-white shadow-xl rounded-3xl p-8 w-full md:w-[500px] transition-transform duration-300 hover:scale-105'>
						<h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 text-center uppercase tracking-wide'>
							STAROSTWO POWIATOWE <br className='hidden sm:block' /> W MIŃSKU
							MAZOWIECKIM
						</h1>
						<Separator className='my-4' />
						<div className='flex flex-col space-y-4'>
							<div>
								<h2 className='text-lg font-semibold text-gray-700'>Adres:</h2>
								<p className='text-gray-600'>ul. T.Kościuszki 3</p>
								<p className='text-gray-600'>05-300 Mińsk Mazowiecki</p>
							</div>
							<Separator className='my-2' />
							<div>
								<h2 className='text-lg font-semibold text-gray-700'>
									Kontakt:
								</h2>
								<p className='text-gray-600'>Tel. 25/ 759 87 00</p>
								<p className='text-gray-600'>Fax. 25/ 759 87 02</p>
								<p className='text-gray-600'>e-mail: boi@powiatminski.pl</p>
							</div>
							<Separator className='my-2' />
							<div>
								<h2 className='text-lg font-semibold text-gray-700'>
									Godziny otwarcia:
								</h2>
								<p className='text-gray-600'>
									Poniedziałek, wtorek: 8:00-16:00
								</p>
								<p className='text-gray-600'>Środa: 8:00-17:00</p>
								<p className='text-gray-600'>Czwartek: 8:00-16:00</p>
								<p className='text-gray-600'>Piątek: 8:00-15:00</p>
							</div>
						</div>
					</div>

					{/* Mapa */}
					<div className='flex flex-col justify-center items-center bg-white shadow-xl rounded-3xl p-8 w-full md:w-[500px] text-gray-700 text-lg font-semibold transition-transform duration-300 hover:scale-105'>
						<Image
							src='/pictures/starostwo-lokalizacja.png'
							width={500}
							height={500}
							alt='lokacja starostwa w mińsku mazowieckim'
						/>
						{/* <MapContainer
						center={[52.17584, 21.55177]}
						zoom={14}
						minZoom={14}>
						{/* TypeError: (0 , react__WEBPACK_IMPORTED_MODULE_0__.createContext) is not a function */}

						{/* <TileLayer
						url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
						attribution="Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
						noWrap={true}></TileLayer>
						</MapContainer> */}
					</div>
				</div>
			</AnimatedGroup>
			{/* Navbar */}
			<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4'>
				<Navbar />
			</div>
		</div>
	);
}
