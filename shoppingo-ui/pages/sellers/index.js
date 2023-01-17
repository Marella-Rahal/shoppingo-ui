import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Seller from "../../components/Sellers/Seller";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import usePosition from "../../hooks/usePosition";

mapboxgl.accessToken = process.env.mapbox_key;

const data = [
  {
    id: 1,
    coo: [36.720798, 34.725587],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    id: 2,
    coo: [36.720798, 34.7254],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    id: 3,
    coo: [36.7206, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    id: 4,
    coo: [36.6, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    id: 5,
    coo: [36.7206, 34.725],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    id: 6,
    coo: [36.55, 34.725587],
    name: "For_you",
    address:
      " سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
];

const Sellers = () => {
  //todo My stores data
  const [stores, setStores] = useState(data);
  //todo *********** the massage for the popUp
  const [noteMsg, setNoteMsg] = useState("");
  //todo ********** the location of the user
  const [coords, error] = usePosition();
  useEffect(() => {
    
    //todo *********************  in case of error
    if (error) {
      setNoteMsg(
        <>
          <h5 className="text-effectColor text-center">
            فشلنا في الحصول على موقعك لذلك سيتم تعطيل بعض الميزات التي تتطلب
            الموقع ضمن هذه الصفحة أو أعد تحميل الصفحة للمحاولة مرة أخرى
          </h5>
        </>
      );
      showPopUpNote();
    }

    //todo ******************** in case of succes 
    if (coords.length > 0) {
      //to change the data before i make it visible to the user
      data.forEach((store) => {
        getRoute(coords, store.coo).then(
          (value) => {
            store.dist = `يبعد ${value[1]} كيلو متر عن موقعك`;
            store.time = `${value[2]}  دقيقة سيراً   `;
            setStores([...data]);
          }
        );
      });
    }

  }, [coords, error]);

  //*function to calculate the distance and the time between the user location and the store location
  const getRoute = async (start, end) => {
    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
    );

    const data = res.data.routes[0];

    //the route if needed
    const route = data.geometry.coordinates;
    //the distance
    const dist = Math.floor(data.distance / 1000);
    //the time
    const time = Math.floor(data.duration / 60);

    return [route, dist, time];
  };
  //******************************************************/


  return (
    <>
      <NotePopUp noteMsg={noteMsg} />
      <Navbar />
      <div className="pt-28 pb-10 w-full min-h-screen px-4 md:px-8 flex flex-col justify-between">
        {/* first div */}
        <div className="flex flex-col space-y-3">
          {/* Search */}
          <div className="flex self-center h-[37px]">
            <label className="bg-white rounded-l-full shadow-sm shadow-shadowColor cursor-pointer px-2 py-[5px] text-textColor flex justify-center items-center">
              <BiSearchAlt2 className="w-[20px] h-[20px] hover:scale-[1.1]" />
            </label>
            <input
              type="text"
              placeholder="اسم المحل"
              className="w-full md:w-[230px] rounded-r-full shadow-sm shadow-shadowColor outline-none focus:border-2 border-effectColor  px-3 py-[5px] text-textColor text-end"
            />
          </div>

          {/* stores */}
          <div className="flex justify-evenly flex-wrap pb-10">
            {stores.map((store, index) => {
              return (
                <Seller
                  key={index}
                  id={store.id}
                  name={store.name}
                  address={store.address}
                  coo={store.coo}
                  dist={store.dist}
                  time={store.time}
                />
              );
            })}
          </div>
        </div>

        {/* locater second div */}
        <div className="flex space-x-2 self-center">
          <Link
            href="/sellers/locations"
            className="underline hover:scale-[1.1] text-effectColor"
          >
            هنا
          </Link>
          <span>لرؤية موقع المتاجر اضغط </span>

          <FaMapMarkerAlt className="text-effectColor self-center" />
        </div>
      </div>
    </>
  );
};

export default Sellers;
