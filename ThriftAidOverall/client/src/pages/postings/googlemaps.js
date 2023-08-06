import Geocode from "react-geocode";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";

Geocode.setLanguage("en");

const libraries = ["places"];

export default function GoogleMaps({ address, className }) {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [apiKey, setApiKey] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const initMap = () => {
    setScriptLoaded(true);
  };

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get("http://localhost:5000/create");
        const apiKeyValue = response.data.apiKey;

        if (!apiKeyValue) {
          throw new Error("No API key received");
        }

        const apiKeyObject = JSON.parse(apiKeyValue);
        const apiKey = Object.keys(apiKeyObject)[0];

        setApiKey(apiKey);
      } catch (error) {
        console.log("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  useEffect(() => {
    if (apiKey && !scriptLoaded) {
      window.initMap = initMap;
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(",")}&callback=initMap`;
      document.head.appendChild(script);
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
          console.error("Error geocoding:", error);
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
      mapContainerClassName={`${className}`}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
