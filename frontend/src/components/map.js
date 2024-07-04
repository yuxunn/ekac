import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const SimpleMap = () => {
  const mapRef = useRef(null);
  const latitude = 1.290270;
  const longitude = 103.851959;
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

  return (
    // Make sure you set the height and width of the map container otherwise the map won't show
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      ref={mapRef}
      style={{ height: "100%", width: "40vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[1.290270, 103.851959]}>
        <Popup>
        Course: Raspberry Tart Intermediate Class <br /> Date: Wed, 24 Jul, 18:30
        </Popup>
      </Marker>{" "}
    </MapContainer>
  );
};

export default SimpleMap;
