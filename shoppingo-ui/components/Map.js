import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFyZWxsYSIsImEiOiJjbGMxcHJvajMxMWxrM29tenRicm40NGFrIn0.N_jN0uvNlxmzwNfCAVB1Qw";

const Map = () => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(36.720798);
  const [lat, setLat] = useState(34.725587);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: true,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);
  return <div ref={mapContainer} className="w-full h-full"></div>;
};

export default Map;
