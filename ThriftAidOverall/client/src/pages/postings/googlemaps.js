import Geocode from "react-geocode";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "GoogleMapsApiThrift";

const client = new SecretsManagerClient({
  region: "us-east-2",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

const secret = response.SecretString;


Geocode.setLanguage("en");

const libraries = ["places"];

export default function GoogleMaps({ address, className }) {
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
      mapContainerClassName={`${className}`}
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
