import Geocode from "react-geocode";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";

Geocode.setLanguage("en");

const libraries = ["places"];

export default function GoogleMaps({ address }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [apiKey, setApiKey] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get("http://localhost:5000/create");
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiKey();
  }, []);

  useEffect(() => {
    if (apiKey && !scriptLoaded) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(
        ","
      )}`;
      googleMapsScript.onload = () => {
        setScriptLoaded(true);
      };
      document.body.appendChild(googleMapsScript);
    }
  }, [apiKey, scriptLoaded]);

  useEffect(() => {
    if (scriptLoaded) {
      Geocode.setApiKey(apiKey);
      Geocode.fromAddress(address)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setCenter({ lat, lng });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [address, apiKey, scriptLoaded]);

  if (!apiKey || !scriptLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName="map-container"
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
