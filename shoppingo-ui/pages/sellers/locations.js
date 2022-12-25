import React, { useEffect, useState } from "react";
import Map from "../../components/Map";

const locations = () => {
  // the location of the user
  const [coords, setCoords] = useState([]);
  console.log(coords);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([pos.coords.longitude, pos.coords.latitude]);
      },
      (err) => {},
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 15000,
      }
    );
  }, []);

  return (
    <div className="w-full h-screen">
      {coords.length > 0 && <Map coords={coords} sellerRoute={true} />}
    </div>
  );
};

export default locations;
