import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Marker from "./Marker";
import axios from "axios";
import { parseCookies } from "nookies";

mapboxgl.accessToken = process.env.mapbox_key;

mapboxgl.setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
  null,
  true // Lazy load the plugin
);

const Map = ({ coords, sellerRoute ,stores, blue, orange, red, green, setProduct, setUpdatedPrice, setProductSize, setProductColor, setProductDetailLoader }) => {

  const cookies = parseCookies();
  const token = cookies.token;
  const imgURL = cookies.imgURL;

  //************ Start of Map **************************/
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(() => {
    return coords.length > 0 ? coords[0] : 36.720798;
  });
  const [lat, setLat] = useState(() => {
    return coords.length > 0 ? coords[1] : 34.725587;
  });
  const [zoom, setZoom] = useState(12);

  //! to change the coordinates of the personal marker without the need to remove it
  const [marker,setMarker]=useState(null);

  //! to make sure the map initialize just once
  const [map,setMap]=useState();
  useEffect(()=>{

    //* initialize
    const tempMap= new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      scrollZoom: true,
    });

    //* movment on the map
    tempMap.on("move", () => {
      setLng(tempMap.getCenter().lng.toFixed(4));
      setLat(tempMap.getCenter().lat.toFixed(4));
      setZoom(tempMap.getZoom().toFixed(2));
    });

    //* Add FullScreen control
    tempMap.addControl(new mapboxgl.FullscreenControl(), "top-right");

    //* Add navigation control (the +/- zoom buttons)
    tempMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    setMap(tempMap);

    return () => tempMap.remove();

  },[])

  //! execute when the person coordinates changes or when th map state changes
  useEffect(() => {
  
    if ( ( map != undefined ) && ( coords.length > 0 ) ){
        
          if(!marker){
              
              const el = document.createElement("div");
              el.className = "marker";
              el.className = "removablePerson"
              const root = ReactDOM.createRoot(el);
              root.render(
                <Marker
                  image={imgURL !== undefined ? imgURL : "/default.jpg"}
                  color={sellerRoute ? "blue" : "#111d4a"}
                />
              );
              const newMarker=new mapboxgl.Marker(el, { offset: [0, -10] })
                .setLngLat(coords)
                .addTo(map);
                
              setMarker(newMarker);

          }else{

              // If marker is already set, update its position
              marker.setLngLat(coords);

          }  

    }

  }, [map,coords]);

  //! execute when the stores on map changes or when th map state changes
  useEffect(() => {

    if ( map != undefined ) {

      //* removing existing marker and every thing related to except the personal one
      removeMarkers();

      //* calling the new Markers
      if (sellerRoute) {
        addMarkers(stores, "#111D4A");
      } else {
        addMarkers(blue, "blue");
        addMarkers([orange], "orange");
        addMarkers(red, "red");
        addMarkers([green], "green");
      }

    }

  }, [map]);


  //**************adding Markers *******************
  function addMarkers(marker, markerColor) {

    for (const x of marker) {
      const el = document.createElement("div");
      el.className = "marker";
      el.className = "removableMarker";
      const root = ReactDOM.createRoot(el);

      if (sellerRoute) {
        // sellers marker
        root.render(
          <Marker image={x.storeImageURL} color={markerColor} />
        );
      } else {
        // product marker
        root.render(<Marker image={x.frontImgURL} color={markerColor} />);
      }

      new mapboxgl.Marker(el, { offset: [0, -10] })
        .setLngLat(sellerRoute? x.coo : x.seller.coo)
        .addTo(map);

      el.addEventListener("click", (e) => {
        //! important i put it so i can create a popup when clicking on the marker despite setting the closeOnClick to true in popup
        e.stopPropagation();
        /* make thw direction */
        if (coords.length > 0) {
          const routeColor = sellerRoute ? "blue" : "#111d4a";
          const distinationCoords = sellerRoute ? x.coo : x.seller.coo ;
          getRoute(coords, distinationCoords, routeColor);
        }
        /* Fly to the point */
        flyToStore(sellerRoute? x.coo : x.seller.coo);
        /* Close all other popups and display popup for clicked store */
        createPopUp(x, markerColor);

        if(!sellerRoute){
          getProductDetail(x._id)
        }

      });
    }
  }

  //************** getProductDetail *************

  async function getProductDetail(productId){

      setProductDetailLoader(true);

      const res = await axios.get(`${process.env.server_url}/api/v2.0/shop/getProductDetails/${productId}`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      setProduct(res.data.product);
      setUpdatedPrice(res.data.updatedPrice);
      setProductSize(res.data.product.variations[0].size);
      setProductColor('');

      setProductDetailLoader(false);

  }

  //**************removing Markers **************
  function removeMarkers(){
    // to remove the markers
    const m=document.querySelectorAll('.removableMarker');
    m.forEach( i => i.remove() )
    
    // to remove the dist-time dialog when removing the markers 
    document.getElementById('dist-time').innerHTML="";

    // to close opened popup
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    if (popUps[0]) popUps[0].remove();

    // to remove the route when removing the marker 
    if (map.getSource("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
  }

  // ************ Directions ********************
  async function getRoute(start, end, routeColor) {

    try {
      
      const res = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
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
        ${Math.floor(data.distance / 1000)} K.m
      <h5/>
  
      <h4>
      : الوقت المقدر للوصول  
      </h4>
      <h5>
        ${Math.floor(data.duration / 60)} M
      </h5>
  
      `;

    } catch (error) {}
    
  }

  // ************ fly to store ******************
  function flyToStore(coords) {
    map.flyTo({
      center: coords,
      zoom: 14,
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
          {marker.storeName}
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
            minWidth: "125px",
            minHeight: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: "17px",
            borderTopRightRadius: "17px",
          }}
        >
          {marker.seller.storeName}
        </h4>

        <h5
          style={{
            color: markerColor,
            minWidth: "125px",
            minHeight: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottomLeftRadius: "17px",
            borderBottomRightRadius: "17px",
          }}
        >
          { (marker.fixedDiscount !== 0 && marker.fixedDiscount !== undefined ) ? (
            <div
              style={{
                color: `${markerColor}`,
              }}
              className="flex flex-col items-center justify-center"
            >
              <div className="flex space-x-2 line-through">
                <span>ل.س</span>
                <span>{marker.price}</span>
              </div>
              <div className="flex space-x-2">
                <span>ل.س</span>
                <span>{marker.price - marker.fixedDiscount}</span>
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <span>ل.س</span>
              <span>{marker.price}</span>
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

    const popup = new mapboxgl.Popup({ closeOnClick: true }) //! ***** the close on click
      .setLngLat(sellerRoute ? marker.coo : marker.seller.coo)
      .setDOMContent(my_popup_container)
      .addTo(map);
  }

  return (
    <div
      ref={mapContainerRef}
      className={
        sellerRoute
          ? "relative z-0 w-full h-full"
          : "relative z-0 w-full h-full rounded-lg"
      }
    >
      {/* location's color */}
      {!sellerRoute && (
        <div className="absolute top-2 left-2 z-10 p-2 w-[90px] bg-white rounded-lg shadow-md shadow-shadowColor flex flex-col space-y-[5px] text-[10px] md:text-[12px] font-bold text-textColor">
          <div className="self-center">ألوان المواقع</div>
          <div className=" flex justify-end items-center">
            الأقرب
            <div className="w-[16px] md:w-[18px] h-[16px] md:h-[18px] rounded-full bg-[orange] ml-2" />
          </div>
          <div className=" flex justify-end items-center">
            الأرخص
            <div className="w-[16px] md:w-[18px] h-[16px] md:h-[18px] rounded-full bg-[green] ml-2" />
          </div>
          <div className=" flex justify-end items-center">
            مع عرض
            <div className="w-[16px] md:w-[18px] h-[16px] md:h-[18px] rounded-full bg-[red] ml-2" />
          </div>
          <div className=" flex justify-end items-center">
            الباقي
            <div className="w-[16px] md:w-[18px] h-[16px] md:h-[18px] rounded-full bg-[blue] ml-2" />
          </div>
        </div>
      )}
      <div
        id="dist-time"
        className={
          sellerRoute
            ? "absolute left-2 top-2 z-10 text-[blue] w-[120px] bg-white rounded-lg shadow-md shadow-shadowColor text-[10px] md:text-[12px] font-bold text-center space-y-[3px]"
            : "absolute left-2 bottom-2 z-10 text-[#111d4a] w-[120px] bg-white rounded-lg shadow-md shadow-shadowColor text-[10px] md:text-[12px] font-bold text-center space-y-[3px]"
        }
      ></div>
    </div>
  );
};

export default Map;
