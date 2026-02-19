//to do na pozniej, do przystankow bags dodac link do https://bags.com.pl/rozklady/debe-wielkie-i/ bedzie z tym w chuuuj roboty bo nazwy linkow sa chujowe pozdro

"use client";
import React, { useState, useEffect, useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconSettings, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import Navbar from "@/components/Navbar";
import "leaflet/dist/leaflet.css";
import MapMode from "@/components/Map/school/mapMode";
import MarkersMapped from "@/components/Map/school/markersOnMap";
import { Bus } from "lucide-react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { color } from "framer-motion";
import { FamilyButtonCommuteBoard } from "@/components/FamilyButtons/family-button-commute-board";
import CommuteBoard from "@/components/Map/dojazdy/CommuteBoard ";
import {
  boundaryCoordinates,
  LiniaBagsB1,
  LiniaBagsB3,
  LiniaBagsB4,
  LiniaMiejskaM1_1,
  LiniaMiejskaM1_2,
  LiniaMiejskaM2_1,
  LiniaMiejskaM2_2,
  LiniaMiejskaM3_1,
  LiniaMiejskaM3_2,
  LiniaMiejskaM4_1,
  LiniaMiejskaM4_2,
  przystankiAutobusowe,
  przystankiAutobusoweFile,
  przystankiPociagowe,
} from "./daneDojazdow";
import { Button } from "@/components/ui/button";

function MapComponent({ linia, przystanki }) {
  const map = useMap();

  useEffect(() => {
    if (!Array.isArray(przystanki) || przystanki.length === 0) {
      console.warn("Brak przystanków lub niepoprawny format.");
      return;
    }

    const waypoints = przystanki
      .filter(({ coords }) => Array.isArray(coords) && coords.length === 2)
      .map(({ coords }) => L.latLng(coords[0], coords[1]));

    if (waypoints.length === 0) {
      console.warn("Brak poprawnych waypointów.");
      return;
    }

    const handleOpenPdf = (url) => {
      if (typeof window !== "undefined") {
        window.open(url, "_blank");
      }
    };

    console.log("Waypoints:", waypoints);
    console.log("przystanki", przystanki);

    przystanki &&
      przystanki.map((przystanek) => {
        if (przystanek.nazwa == "Dębe Wielkie 01") {
          pdfLinks;
        }
      });

    //   let pdfUrl = "";

    //   const testjson = {
    // 	"Dębe Wielkie 01": "https://bags.com.pl/rozklady/debe-wielkie-i/",
    // 	"Dębe Wielkie 02": "https://bags.com.pl/rozklady/debe-wielkie-ii/",
    // 	"Dębe Wielkie 03": "https://bags.com.pl/rozklady/debe-wielkie-iii/"
    //   }

    //   if (linia.startsWith("B")) {
    // 	przystanki.map((przystanek)=>{
    // 		if(przystanek.name == "Dębe Wielkie 01"){pdfUrl="https://bags.com.pl/rozklady/debe-wielkie-i"}
    // 		else if(przystanek.name == "Dębe Wielkie 02"){pdfUrl="https://bags.com.pl/rozklady/debe-wielkie-ii"}
    // 		else if(przystanek.name == "Dębe Wielkie 03"){pdfUrl="https://bags.com.pl/rozklady/debe-wielkie-iii"}

    // 	})
    // } else {
    // 	const pdfLinks = {
    // 		M1: "https://www.minsk-maz.pl/plik,8749,linia-m1.pdf",
    // 		M2: "https://www.minsk-maz.pl/plik,8753,linia-m2.pdf",
    // 		M3: "https://www.minsk-maz.pl/plik,8758,linia-m3.pdf",
    // 		M4: "https://www.minsk-maz.pl/plik,8762,linia-m4.pdf"
    // 	};
    // 	pdfUrl = pdfLinks[linia] || "#";
    // }

    const pdfLinks = {
      M1: "https://www.minsk-maz.pl/plik,8749,linia-m1.pdf",
      M2: "https://www.minsk-maz.pl/plik,8753,linia-m2.pdf",
      M3: "https://www.minsk-maz.pl/plik,8758,linia-m3.pdf",
      M4: "https://www.minsk-maz.pl/plik,8762,linia-m4.pdf",
      B1: "https://bags.com.pl/linie-regularne/",
      B3: "https://bags.com.pl/linie-regularne/",
      B4: "https://bags.com.pl/linie-regularne/",
    };

    const pinImg = {
      M1: "/pictures/m1pin.png",
      M2: "/pictures/m2pin.png",
      M3: "/pictures/m3pin.png",
      M4: "/pictures/m4pin.png",
      B1: "/pictures/b1kwpin.png",
      B3: "/pictures/b3pin.png",
      B4: "/pictures/b4pin.png",
    };

    const colorLine = {
      M1: "#d01526",
      M2: "#97b62c",
      M3: "#50c1e9",
      M4: "#e68042",
      B1: "#009d57",
      B3: "#757575",
      B4: "#db4436",
    };

    const pdfUrl = pdfLinks[linia] || "#";
    const pinUrl = pinImg[linia] || "#";
    const colorLinia = colorLine[linia] || "#";

    const routingControl = L.Routing.control({
      waypoints,
      lineOptions: {
        styles: [{ color: colorLinia, weight: 5, opacity: 1 }],
        addWaypoints: false,
        extendToWaypoints: true,
      },
      routeWhileDragging: false,
      draggableWaypoints: false,
      show: false,
      serviceUrl: "http://51.38.130.72:5000/route/v1",
      createMarker: function (i, waypoint) {
        if (!waypoint || !waypoint.latLng) {
          console.warn("Invalid waypoint in createMarker:", waypoint);
          return null;
        }
        const name = przystanki[i+1]?.name || "Unknown";
        return L.marker(waypoint.latLng, {
          icon: L.icon({
            iconUrl: pinUrl,
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -30],
          }),
        }).bindPopup(`
        <div>
          ${name}<br>
          <button id="openPdfButton" 
            style="margin-top:5px; padding:5px; border:none; background:#007bff; color:white; border-radius:5px; cursor:pointer;">
            Otwórz rozkład
          </button>
        </div>
      `).on("popupopen", (e) => {
        const button = e.popup._contentNode.querySelector("#openPdfButton");
        if (button) {
          button.addEventListener("click", () => handleOpenPdf(pdfUrl));
        }
      });
      },
    }).addTo(map);

    const removeRoutingContainers = () => {
      document
        .querySelectorAll(".leaflet-routing-container")
        .forEach((el) => el.remove());
    };

    removeRoutingContainers();

    const observer = new MutationObserver(removeRoutingContainers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      map.removeControl(routingControl);
    };

  }, [linia, przystanki, map]);

  return null;
}

export default function Page() {
  const coords = [52.18012974888318, 21.560451629486828];

  const createIcon = (imagePath) => {
    return new L.Icon({
      iconUrl: `/pictures/${imagePath}`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });
  };

  const createIconPociag = (imagePath) => {
    return new L.Icon({
      iconUrl: `/pictures/${imagePath}`,
      iconSize: [80, 80],
      iconAnchor: [40, 80],
      popupAnchor: [0, -30],
    });
  };

  const autobusIkona = createIcon("przystanekautobusowypin.png");
  const pociagIkona = createIconPociag("przystanekkolejowypin.png");

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelectionChange = (newSelection) => {
    setTimeout(() => {
      setSelectedOptions(newSelection);
      console.log("Wybrane opcje:", newSelection);
    }, 0);
  };

  const handleMapModeChange = (newMode) => {
    setSelectedMode(newMode);
    document.cookie = `selectedMapMode=${newMode}; max-age=99999999999999; path=/`;
  };

  const [selectedMode, setSelectedMode] = useState("Light");


  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const selectedModeCookie = cookies.find((cookie) =>
      cookie.startsWith("selectedMapMode=")
    );
    if (selectedModeCookie) {
      const mode = selectedModeCookie.split("=")[1];
      setSelectedMode(mode === "Satellite" ? "Satellite" : "Light");
    }
  }, []);

  const outerBounds = [
    [-90, -180],
    [90, -180],
    [90, 180],
    [-90, 180],
    [-90, -180],
  ];

  const maskCoordinates = [outerBounds, boundaryCoordinates];


  return (
    <div className="relative w-full h-screen">
      <div className="fixed bottom-4 right-4 z-50">
        <MapMode
          selectedMode={selectedMode}
          onChangeMode={handleMapModeChange}
        />
      </div>
      {
        <div className="fixed top-4  z-50  sm:max-[10000px]:fixed sm:max-[10000px]:left-4 sm:max-[10000px]:top-1/2 sm:max-[10000px]:-translate-y-1/2 sm:max-[10000px]:z-50">
          <FamilyButtonCommuteBoard width={390} height={630}>
            <CommuteBoard onSelectionChange={handleSelectionChange} />
          </FamilyButtonCommuteBoard>
        </div>
      }
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Navbar />
      </div>
      <MapContainer
        center={coords}
        zoom={14.5}
         maxZoom={16.5}
         minZoom={13.5}
        zoomControl={false}
        maxBounds={[
          [53.37515864683022, 19.64146464359585],
          [51.142038202104395, 22.504700560125794],
        ]}
        className="h-full w-full relative z-0"
      >
         {selectedMode === "Light" && (
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            noWrap={true}
          />
        )}
        {selectedMode === "Satellite" && (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Sources: Esri, TomTom, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors, and the GIS User Community"
            noWrap={true}
          />
        )}

        <Polygon
          positions={maskCoordinates}
          pathOptions={{
          fillColor: "2E473B",
          fillOpacity: 0.8,
          stroke: false,
        }}
       />

{selectedOptions.busStops &&
  przystankiAutobusowe &&
  przystankiAutobusowe.map((przystanek, index) => {
    const koordynaty = przystanek.koordynaty
      .split(", ")
      .map((coord) => parseFloat(coord));

    if (
      koordynaty.length !== 2 ||
      isNaN(koordynaty[0]) ||
      isNaN(koordynaty[1])
    ) {
      console.error(
        `Błędne współrzędne dla: ${przystanek.nazwa}`,
        przystanek.koordynaty
      );
      return null;
    }

    const isLast = index === przystankiAutobusowe.length - 1;

    return (
      <React.Fragment key={przystanek.nazwa}>
        <Marker position={koordynaty} icon={autobusIkona}>
          <Popup opacity={0}>{przystanek.nazwa}</Popup>
        </Marker>

        {isLast && (
          <>
            {selectedOptions.M1 && (
              <>
                <MapComponent linia="M1" przystanki={LiniaMiejskaM1_1} />
                <MapComponent linia="M1" przystanki={LiniaMiejskaM1_2} />
              </>
            )}
            {selectedOptions.M2 && (
              <>
                <MapComponent linia="M2" przystanki={LiniaMiejskaM2_1} />
                <MapComponent linia="M2" przystanki={LiniaMiejskaM2_2} />
              </>
            )}
            {selectedOptions.M3 && (
              <>
                <MapComponent linia="M3" przystanki={LiniaMiejskaM3_1} />
                <MapComponent linia="M3" przystanki={LiniaMiejskaM3_2} />
              </>
            )}
            {selectedOptions.M4 && (
              <>
                <MapComponent linia="M4" przystanki={LiniaMiejskaM4_1} />
                <MapComponent linia="M4" przystanki={LiniaMiejskaM4_2} />
              </>
            )}
            {selectedOptions.B1 && <MapComponent linia="B1" przystanki={LiniaBagsB1} />}
            {selectedOptions.B3 && <MapComponent linia="B3" przystanki={LiniaBagsB3} />}
            {selectedOptions.B4 && <MapComponent linia="B4" przystanki={LiniaBagsB4} />}
          </>
        )}
      </React.Fragment>
    );
  })}



        {selectedOptions.trainStations &&
          przystankiPociagowe &&
          przystankiPociagowe.map((przystanek) => {
            const koordynaty = przystanek.koordynaty
              .split(", ")
              .map((coord) => parseFloat(coord));

            if (
              koordynaty.length !== 2 ||
              isNaN(koordynaty[0]) ||
              isNaN(koordynaty[1])
            ) {
              console.error(
                `Błędne współrzędne dla: ${przystanek.nazwa}`,
                przystanek.koordynaty
              );
              return null;
            }

            return (
              <Marker
                key={przystanek.nazwa}
                position={koordynaty}
                icon={pociagIkona}
              >
                <Popup opacity={0}>{przystanek.nazwa}</Popup>
              </Marker>
            );
          })}
        <Polyline
          positions={boundaryCoordinates}
          pathOptions={{ color: "2E473B", weight: 10 }}
        />
        <MarkersMapped />
        {selectedOptions.M1 && (
          <>
            <MapComponent linia="M1" przystanki={LiniaMiejskaM1_1} />
            <MapComponent linia="M1" przystanki={LiniaMiejskaM1_2} />
          </>
        )}
        {selectedOptions.M2 && (
          <>
            <MapComponent linia="M2" przystanki={LiniaMiejskaM2_1} />
            <MapComponent linia="M2" przystanki={LiniaMiejskaM2_2} />
          </>
        )}
        {selectedOptions.M3 && (
          <>
            <MapComponent linia="M3" przystanki={LiniaMiejskaM3_1} />
            <MapComponent linia="M3" przystanki={LiniaMiejskaM3_2} />
          </>
        )}
        {selectedOptions.M4 && (
          <>
            <MapComponent linia="M4" przystanki={LiniaMiejskaM4_1} />
            <MapComponent linia="M4" przystanki={LiniaMiejskaM4_2} />
          </>
        )}
        {selectedOptions.B1 && (
          <>
            <MapComponent linia="B1" przystanki={LiniaBagsB1} />
          </>
        )}
        {selectedOptions.B3 && (
          <>
            <MapComponent linia="B3" przystanki={LiniaBagsB3} />
          </>
        )}
        {selectedOptions.B4 && (
          <>
            <MapComponent linia="B4" przystanki={LiniaBagsB4} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
