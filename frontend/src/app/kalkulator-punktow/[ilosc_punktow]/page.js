import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
	return (
		<div className='flex flex-col justify-center items-center h-screen bg-gray-100 text-center p-4'>
			<div className='bg-white shadow-lg rounded-2xl p-6 max-w-2xl'>
				<h1 className='text-3xl font-bold text-gray-800 mb-4'>
					Jest to strona mająca być stroną z pokazaniem wyników po wprowadzeniu
					swoich wyników do kalkulatora punktów, oraz będzie oferowała krótke
					zaznajomienie z szkołami i profilami na które ma szanse dostać się
					uczeń dla rekrutacji do szkoły średniej na powiecie Mińskim
				</h1>
				<div className='flex justify-center'>
					<Image
						src='/pictures/wip.jpg'
						width={300}
						height={150}
						alt='WORK IN PROGRESS'
						className='rounded-lg shadow-md'
					/>
				</div>
			</div>
			<div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md'>
				<Navbar />
			</div>
		</div>
	);
}
