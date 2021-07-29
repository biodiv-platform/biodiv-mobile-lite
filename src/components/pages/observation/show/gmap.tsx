import SITE_CONFIG from "@configs/site-config";
import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import React from "react";

const mapContainerStyle = {
  height: "380px",
  width: "100%"
};

export default function GMap({ lat, lng }) {
  return (
    <LoadScriptNext
      id="observation-create-map-script-loader"
      googleMapsApiKey={SITE_CONFIG.TOKENS.GMAP}
      region={SITE_CONFIG.MAP.COUNTRY}
    >
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={{ lat, lng }}>
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </LoadScriptNext>
  );
}
