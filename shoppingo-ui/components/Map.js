import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Marker from "./Marker";
import { useRouter } from "next/router";

mapboxgl.accessToken = process.env.mapbox_key;

const stores = [
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
  {
    id: 5,
    coo: [36.7206, 34.725],
    name: "For_you",
    old: "100000",
    new: "50000",
    img: "../../product.jpg",
  },
  {
    id: 6,
    coo: [36.55, 34.725587],
    name: "For_you",
    old: "100000",
    new: "100000",
    img: "../../product.jpg",
  },
];

const Map = () => {
  const router = useRouter();
  const [sellerRoute, setSellerRoute] = useState(null);

  //************ Start of Map **************************/
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(36.720798);
  const [lat, setLat] = useState(34.725587);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    //***********routes************************/
    if (router.asPath == "/sellers/locations") {
      setSellerRoute(true);
    } else {
      setSellerRoute(false);
    }
    //********************************************/
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
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

    // Add FullScreen control
    map.addControl(new mapboxgl.FullscreenControl(), "top-right");

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      if (sellerRoute) {
        addMarkers(stores, "#111D4A");
      } else {
        // addMarkers(blue, "blue");
        // addMarkers(orange, "orange");
        // addMarkers(red, "red");
        // addMarkers(green, "green");
      }
    });

    //************** Markers *******************
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
          /* Fly to the point */
          flyToStore(x.coo);
          /* Close all other popups and display popup for clicked store */
          createPopUp(x, markerColor);
        });
      }
    }

    // ************ fly to store ******************

    function flyToStore(coords) {
      map.flyTo({
        center: coords,
        zoom: 19,
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
              minHeight: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "17px",
              borderInline: `solid 4px ${markerColor}`,
            }}
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
              <span>
                <span
                  style={{
                    color: `${markerColor}`,
                    display: "block",
                    textDecoration: "line-through",
                  }}
                >
                  ل.س&nbsp;{marker.old}
                </span>
                ل.س&nbsp;{marker.new}
              </span>
            ) : (
              <span>ل.س&nbsp;{marker.old}</span>
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
    <>
      <div ref={mapContainerRef} className="w-full h-full relative z-0">
        {/* location's color */}
        {!sellerRoute && (
          <div className="absolute z-50 mt-2 ml-2 p-2 w-[120px] bg-white rounded-lg shadow-md shadow-shadowColor flex flex-col space-y-[5px] text-[13px] font-bold">
            <div className="self-center">ألوان المواقع</div>
            <div className=" flex justify-end items-center">
              الأقرب
              <div className="w-[18px] h-[18px] rounded-full bg-orange-500 ml-2" />
            </div>
            <div className=" flex justify-end items-center">
              الأرخص
              <div className="w-[18px] h-[18px] rounded-full bg-green-500 ml-2" />
            </div>
            <div className=" flex justify-end items-center">
              مع عرض
              <div className="w-[18px] h-[18px] rounded-full bg-red-500 ml-2" />
            </div>
            <div className=" flex justify-end items-center">
              الباقي
              <div className="w-[18px] h-[18px] rounded-full bg-blue-500 ml-2" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
