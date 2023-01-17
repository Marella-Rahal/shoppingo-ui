
/* create a react hook to get the user location using geolocation */

import { useEffect, useState } from "react";

const usePosition = (props) => {

  const [coords, setCoords] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {

    const geo = navigator.geolocation;

    if(!geo){
        setError(true);
        return;
    }

    let watcher = geo.watchPosition( 
     (pos) => setCoords( [pos.coords.longitude,pos.coords.latitude] ) ,
     (err) => setError(true),
    {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 15000,
    });

    return () => geo.clearWatch(watcher);

  }, []);

  return [ coords , error ];
};

export default usePosition