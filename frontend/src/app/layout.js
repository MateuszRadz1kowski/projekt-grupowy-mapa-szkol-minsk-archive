import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body suppressHydrationWarning className={inter.className}>
				<div>
					<link
						rel='stylesheet'
						href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
						integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
						crossOrigin=''
					/>
				</div>
				{children}
			</body>
		</html>
	);
}
