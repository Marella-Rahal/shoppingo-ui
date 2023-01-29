
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
        timeout: 10000,
        maximumAge: 20000,
    });

    //! this line to make watch position stop from getting updates about the user location meaning if i want to use the watch position as same as get current position 
    // return () => geo.clearWatch(watcher);

  },[]);

  return [ coords , error ];
};

export default usePosition