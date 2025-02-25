import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import Text from '../atoms/Text';  // Assurez-vous d'importer votre composant Text

// Position du concert
const CONCERT_POSITION = [48.8937, 2.3930];
const CONCERT_INFO = {
  name: "Music & People",
  venue: "Music & People Paris",
  address: "211 Avenue Jean Jaurès, 75019 Paris",
  date: "15 Mars 2025",
  time: "20:00"
};

const customIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const Map = () => {
  return (
    <div className="p-4">
      {/* Ajout du titre avec votre atome Text */}
      <Text content="Voici la localisation du concert" type="h2" className="h2-class mb-8 text-center" />
      
      {/* Carte avec le concert */}
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <MapContainer 
          center={CONCERT_POSITION} 
          zoom={15} 
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={CONCERT_POSITION} icon={customIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{CONCERT_INFO.name}</h3>
                <p className="font-semibold">{CONCERT_INFO.venue}</p>
                <p>{CONCERT_INFO.address}</p>
                <p className="mt-2">
                  <span className="font-semibold">Date : </span>
                  {CONCERT_INFO.date}
                </p>
                <p>
                  <span className="font-semibold">Heure : </span>
                  {CONCERT_INFO.time}
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
