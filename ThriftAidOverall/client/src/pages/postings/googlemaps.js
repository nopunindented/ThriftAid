import Geocode from "react-geocode";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";

Geocode.setLanguage("en");

const libraries = ["places"];

export default function GoogleMaps({ address }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [apiKey, setApiKey] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get("/create");
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiKey();
  }, []);

  useEffect(() => {
    if (apiKey) {
      Geocode.setApiKey(apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    if (isLoaded && !loadError) {
      Geocode.fromAddress(address)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setCenter({ lat, lng });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [address, isLoaded, loadError]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
