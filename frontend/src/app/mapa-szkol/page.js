"use client";

import MapMode from "@/components/Map/school/mapMode";
import MarkersMapped, {
  updateIconSize,
} from "@/components/Map/school/markersOnMap";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  useMapEvent,
  Polygon,
  Marker,
  ZoomControl,
} from "react-leaflet";
import Navbar from "@/components/Navbar";
import SchoolFilter from "@/components/Map/school/schoolFilter";
import SchoolShowcase from "@/components/Map/school/schoolShowcase";
import { FamilyButtonFilter } from "@/components/FamilyButtons/family-button-filter";
import { FamilyButtonSchools } from "@/components/FamilyButtons/family-button-schools";

export default function Page() {
  const coords = [52.17584, 21.55177];
  const boundaryCoordinates = [
    [52.18736653273887, 21.540774244637383],
    [52.17755039613617, 21.53599157960814],
    [52.178569842779, 21.53163418789133],
    [52.17309414782903, 21.526785331915832],
    [52.16873683472744, 21.51156744838953],
    [52.162635146701376, 21.509860931780405],
    [52.162899968171985, 21.508757234698553],
    [52.16164771221068, 21.510071391860947],
    [52.16238341685761, 21.514498698029414],
    [52.16178076607902, 21.51585113164271],
    [52.162367763693275, 21.516489072012803],
    [52.16142856379322, 21.523838145371116],
    [52.162435256780654, 21.526844174671123],
    [52.161430044674496, 21.53077394665929],
    [52.16263071205017, 21.531426379834567],
    [52.164492654253216, 21.543774195050528],
    [52.17062272753161, 21.544947547662048],
    [52.171567062671684, 21.54999046137727],
    [52.171707911824285, 21.552031870561574],
    [52.17022294120073, 21.553498547451753],
    [52.17106982646455, 21.55519206846349],
    [52.1719054860864, 21.555213526134306],
    [52.17196470546875, 21.55981619669426],
    [52.168057488931645, 21.564763444993222],
    [52.167294092452664, 21.568506806064484],
    [52.165401905541955, 21.568046942397512],
    [52.16570649037312, 21.569621806839454],
    [52.16073666028435, 21.57134957982118],
    [52.1619041247876, 21.578207710634768],
    [52.16490587955079, 21.58337306489637],
    [52.16513830335659, 21.584681231660973],
    [52.166837663686344, 21.584703788809318],
    [52.16688884938295, 21.58719213876015],
    [52.17095361879774, 21.591885537333713],
    [52.17004900016511, 21.59414747902795],
    [52.17401585616001, 21.599589369579064],
    [52.17395325983922, 21.6018349196818],
    [52.17888314353004, 21.600799832640455],
    [52.181848218821365, 21.603823669994703],
    [52.18285688068067, 21.582964548325794],
    [52.18567970474992, 21.5854346029102],
    [52.18510137625881, 21.588003161865473],
    [52.186866517007644, 21.588819389803426],
    [52.18738506944886, 21.58726455921831],
    [52.18838504423374, 21.584138949098815],
    [52.18998960793539, 21.58558037129068],
    [52.19120976412379, 21.572741970300537],
    [52.197681139607525, 21.569094166065074],
    [52.19763510672977, 21.56357954442372],
    [52.19620044480023, 21.56299555314699],
    [52.198205553520445, 21.547985970572896],
    [52.19195850516299, 21.54861908704886],
    [52.19024950114277, 21.547145444723004],
    [52.19017519513013, 21.54467661538563],
    [52.191591018646, 21.54444346759026],
    [52.19153986137694, 21.5414468267165],
    [52.18736653273887, 21.540774244637383],
  ];

  const outerBounds = [
    [-90, -180],
    [90, -180],
    [90, 180],
    [-90, 180],
    [-90, -180],
  ];
  const bounds = [
    [52.16073666028435, 21.508757234698553],
    [52.198205553520445, 21.603823669994703],
  ];

  const handleMapModeChange = (newMode) => {
    setSelectedMode(newMode);
    document.cookie = `selectedMapMode=${newMode}; max-age=99999999999999; path=/`;
  };

  const [selectedMode, setSelectedMode] = useState("Light");
  const maskCoordinates = [outerBounds, boundaryCoordinates];

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

  return (
    <div className="relative w-full h-screen">
      <div className="fixed bottom-4 right-4 z-50">
        <MapMode
          selectedMode={selectedMode}
          onChangeMode={handleMapModeChange}
        />
      </div>
      <div>
  {/* Mobile Styles: Side by side with flexbox */}
  <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 lg:hidden flex justify-between w-full px-4">
    <div>
      <FamilyButtonFilter width={470} height={410}>
        <SchoolFilter />
      </FamilyButtonFilter>
    </div>
    <div>
      <FamilyButtonSchools width={390} height={600}>
        <SchoolShowcase />
      </FamilyButtonSchools>
    </div>
  </div>

  {/* Large Screen Styles */}
  <div className="hidden lg:block lg:fixed lg:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:z-50">
    <FamilyButtonFilter width={450} height={435}>
      <SchoolFilter />
    </FamilyButtonFilter>
  </div>

  <div className="hidden lg:block lg:fixed lg:right-4 lg:top-1/2 lg:-translate-y-1/2 lg:z-50">
    <FamilyButtonSchools width={390} height={600}>
      <SchoolShowcase />
    </FamilyButtonSchools>
  </div>
</div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Navbar />
      </div>
      <MapContainer
        center={coords}
        zoom={14}
        minZoom={14}
        className="h-full w-full relative z-0"
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
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
            fillOpacity: 0.6,
            stroke: false,
          }}
        />
        <Polyline
          positions={boundaryCoordinates}
          pathOptions={{ color: "black", weight: 1.5 }}
        />
        <MarkersMapped />
        {/* <ZoomControl position="topright"></ZoomControl> */}
      </MapContainer>
    </div>
  );
}
