import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Marker from "./Marker";
import axios from "axios";

mapboxgl.accessToken = process.env.mapbox_key;

// mapboxgl.setRTLTextPlugin(
//   "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
//   null,
//   true // Lazy load the plugin
// );

const stores = [
  {
    id: 1,
    coo: [36.720798, 34.725587],
    name: "For_you",
  },
  {
    id: 2,
    coo: [36.720798, 34.7254],
    name: "For_you",
  },
  {
    id: 3,
    coo: [36.7206, 34.725587],
    name: "For_you",
  },
  {
    id: 4,
    coo: [36.6, 34.725587],
    name: "For_you",
  },
  {
    id: 5,
    coo: [36.7206, 34.725],
    name: "For_you",
  },
  {
    id: 6,
    coo: [36.55, 34.725587],
    name: "For_you",
  },
];

const blue = [
  {
    id: 1,
    coo: [36.720798, 34.725587],
    name: "For_you",
    old: "100000",
    new: "50000",
    img: "../../product.jpg",
  },
  {
    id: 2,
    coo: [36.720798, 34.7254],
    name: "For_you",
    old: "100000",
    new: "50000",
    img: "../../product.jpg",
  },
];

const red = [
  {
    id: 3,
    coo: [36.7206, 34.725587],
    name: "For_you",
    old: "100000",
    new: "50000",
    img: "../../product.jpg",
  },
  {
    id: 4,
    coo: [36.6, 34.725587],
    name: "For_you",
    old: "100000",
    new: "50000",
    img: "../../product.jpg",
  },
];

const green = [
  {
    id: 5,
    coo: [36.7206, 34.725],
    name: "For_you",
    old: "100000",
    new: "50000",
    img: "../../product.jpg",
  },
];

const orange = [
  {
    id: 6,
    coo: [36.55, 34.725587],
    name: "For_you",
    old: "100000",
    new: "100000",
    img: "../../product.jpg",
  },
];

const Map = ({ coords, sellerRoute }) => {
  //************ Start of Map **************************/
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(() => {
    return coords.length > 0 ? coords[0] : 36.720798;
  });
  const [lat, setLat] = useState(() => {
    return coords.length > 0 ? coords[1] : 34.725587;
  });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    //***********initialize the map*************/
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: true,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Add FullScreen control
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    //* calling Markers
    map.on("load", () => {
      if (sellerRoute) {
        addMarkers(stores, "#111D4A");
      } else {
        addMarkers(blue, "blue");
        addMarkers(orange, "orange");
        addMarkers(red, "red");
        addMarkers(green, "green");
      }
    });

    //*****personal marker*********
    if (coords.length > 0) {
      map.on("load", () => {
        const el = document.createElement("div");
        el.className = "marker";
        const root = ReactDOM.createRoot(el);
        root.render(
          <Marker
            image="../../default.jpg"
            color={sellerRoute ? "blue" : "#9E4200"}
          />
        );
        new mapboxgl.Marker(el, { offset: [0, -10] })
          .setLngLat(coords)
          .addTo(map);
      });
    }

    //**************adding Markers *******************
    function addMarkers(marker, markerColor) {
      for (const x of marker) {
        const el = document.createElement("div");
        el.className = "marker";
        const root = ReactDOM.createRoot(el);

        if (sellerRoute) {
          // sellers marker
          root.render(
            <Marker image="../../storePhoto.webp" color={markerColor} />
          );
        } else {
          // product marker
          root.render(<Marker image={x.img} color={markerColor} />);
        }

        new mapboxgl.Marker(el, { offset: [0, -10] })
          .setLngLat(x.coo)
          .addTo(map);

        el.addEventListener("click", (e) => {
          /* make thw direction */
          if (coords.length > 0) {
            const routeColor = sellerRoute ? "blue" : "#9E4200";
            getRoute(coords, x.coo, routeColor);
          }
          /* Fly to the point */
          flyToStore(x.coo);
          /* Close all other popups and display popup for clicked store */
          createPopUp(x, markerColor);
        });
      }
    }
    // ************ Directions ********************

    async function getRoute(start, end, routeColor) {
      const res = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
      );

      //res.data contains an object with three values( code , waypoints , routes)

      //routes contains an array of every single route in our condition we have just one route

      const data = res.data.routes[0];
      //every single route is an ((object)) contains

      //an ((object)) ((legs)) for the ((instructions)),
      //weight_name,
      //weight
      //distance
      //duration
      //an ((object)) ((geometry)) which contains an ((array)) for the ((coordinates)) all the route

      const route = data.geometry.coordinates;

      //putting the array of coordinates in geojson object
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };

      //if the route already exists on the map , we will reset it using setData

      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      }
      //otherwise we will make a new request
      else {
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: geojson,
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": `${routeColor}`,
            "line-width": 4,
            "line-opacity": 1,
          },
        });
      }

      //putting the time and the distance on the map
      const dT = document.getElementById("dist-time");

      dT.innerHTML = `
      <h4> 
       : المسافة المقدرة للوصول 
      </h4>
      <h5>
        كيلو متر ${Math.floor(data.distance / 1000)} 
      <h5/>

      <h4>
      : الوقت المقدر للوصول  
      </h4>
      <h5>
      دقيقة ${Math.floor(data.duration / 60)} 
      </h5>

      `;
    }

    // ************ fly to store ******************

    function flyToStore(coords) {
      map.flyTo({
        center: coords,
        zoom: 12,
      });
    }

    // ************ popup ******************
    function createPopUp(marker, markerColor) {
      const popUps = document.getElementsByClassName("mapboxgl-popup");

      // to close opened popup
      if (popUps[0]) popUps[0].remove();

      //************** seller popup
      const seller_popup = (
        <>
          <h4
            style={{
              backgroundColor: "white",
              color: markerColor,
              minWidth: "125px",
              minHeight: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              borderColor: `${markerColor}`,
            }}
            className="border-x-4"
          >
            {marker.name}
          </h4>
        </>
      );
      //************* product popup
      const product_popup = (
        <>
          <h4
            style={{
              backgroundColor: markerColor,
              color: "white",
              minWidth: "145px",
              minHeight: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: "17px",
              borderTopRightRadius: "17px",
            }}
          >
            {marker.name}
          </h4>

          <h5
            style={{
              color: markerColor,
              minWidth: "145px",
              minHeight: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottomLeftRadius: "17px",
              borderBottomRightRadius: "17px",
            }}
          >
            {marker.old != marker.new ? (
              <div
                style={{
                  color: `${markerColor}`,
                }}
                className="flex flex-col items-center justify-center"
              >
                <div className="flex space-x-2 line-through">
                  <span>ل.س</span>
                  <span>{marker.old}</span>
                </div>
                <div className="flex space-x-2">
                  <span>ل.س</span>
                  <span>{marker.new}</span>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <span>ل.س</span>
                <span>{marker.new}</span>
              </div>
            )}
          </h5>
        </>
      );

      //******************* rendering the popup
      const my_popup_container = document.createElement("div");
      const root = ReactDOM.createRoot(my_popup_container);

      if (sellerRoute) {
        root.render(seller_popup);
      } else {
        root.render(product_popup);
      }

      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(marker.coo)
        .setDOMContent(my_popup_container)
        .addTo(map);
    }

    // **************end of popup***********************

    // Clean up on unmount
    return () => map.remove();
    //*********************************************/
  }, []);

  return (
    <div ref={mapContainerRef} className="relative z-0 w-full h-full">
      {/* location's color */}
      {!sellerRoute && (
        <div className="absolute top-2 left-2 z-10 p-2 w-[120px] bg-white rounded-lg shadow-md shadow-shadowColor flex flex-col space-y-[5px] text-[10px] sm:text-[12px] font-bold">
          <div className="self-center">ألوان المواقع</div>
          <div className=" flex justify-end items-center">
            الأقرب
            <div className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] rounded-full bg-[orange] ml-2" />
          </div>
          <div className=" flex justify-end items-center">
            الأرخص
            <div className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] rounded-full bg-[green] ml-2" />
          </div>
          <div className=" flex justify-end items-center">
            مع عرض
            <div className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] rounded-full bg-[red] ml-2" />
          </div>
          <div className=" flex justify-end items-center">
            الباقي
            <div className="w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] rounded-full bg-[blue] ml-2" />
          </div>
        </div>
      )}
      <div
        id="dist-time"
        className={
          sellerRoute
            ? "absolute left-2 top-2 z-10 text-[blue] w-[120px] bg-white rounded-lg shadow-md shadow-shadowColor text-[10px] sm:text-[12px] font-bold text-center space-y-[3px]"
            : "absolute left-2 bottom-2 z-10 text-[#9E4200] w-[120px] bg-white rounded-lg shadow-md shadow-shadowColor text-[10px] sm:text-[12px] font-bold text-center space-y-[3px]"
        }
      ></div>
    </div>
  );
};

export default Map;
