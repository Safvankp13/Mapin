import { useState } from "react";
import { useMapEvents } from "react-leaflet";

function LocationMarker({onClick}) {

   const map = useMapEvents({
    click(e) { 
      
      const clickedLatLng = e.latlng; 
      onClick(e.latlng);
      map.flyTo(clickedLatLng, map.getZoom()); 
    },
  });
   return null; 
}

export default LocationMarker;
