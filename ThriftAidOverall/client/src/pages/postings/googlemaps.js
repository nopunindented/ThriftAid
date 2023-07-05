import Geocode from "react-geocode";
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";


Geocode.setApiKey(process.env.REACT_APP_MAP_KEY);


Geocode.setLanguage("en");

const libraries = ["places"];

export default function GoogleMaps({ address }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    Geocode.fromAddress(address)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({ lat, lng });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [address]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}





