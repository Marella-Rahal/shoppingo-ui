import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import usePosition from "../../hooks/usePosition";
import Navbar from "../../components/Navbar";
import Placeholder from "../../components/Sellers/Placeholder";
import dynamic from 'next/dynamic';
const DynamicSeller=dynamic(()=>import('../../components/Sellers/Seller'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";

mapboxgl.accessToken = process.env.mapbox_key;

const data = [
  {
    coo: [36.720798, 34.725587],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.7254],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.6, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.55, 34.725587],
    name: "For_you",
    address:
      " سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.725587],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.7254],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.6, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.55, 34.725587],
    name: "For_you",
    address:
      " سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.725587],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.7254],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.6, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.55, 34.725587],
    name: "For_you",
    address:
      " سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.725587],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.7254],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.6, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.55, 34.725587],
    name: "For_you",
    address:
      " سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.725587],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.7254],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.6, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.55, 34.725587],
    name: "For_you",
    address:
      " سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.725587],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.720798, 34.7254],
    name: "For_you",
    address: "سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.6, 34.725587],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
    coo: [36.7206, 34.725],
    name: "For_you",
    address:
      "سوريا حمص شارع الحضارة مقابل الإطفائية سوريا حمص شارع الحضارة مقابل الإطفائية ",
    dist: "",
    time: "",
  },
  {
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

  //! this is tha data for InfiniteScrolling
  const [storesPerPage,setStoresPerPage]=useState(9);
  const [page,setPage]=useState(1);
  const [displayStores,setDisplayStores] = useState(()=>{
    return storesPerPage>=stores.length ? stores : stores.slice(0,storesPerPage)
  });
  const [hasMore,setHasMore]=useState(()=>{
    return storesPerPage>=stores.length ? false : true
  });

  //*******************************************/
  console.log('displayStores :',displayStores.length,'hasMore :',hasMore);
  //*******************************************/

  const displayNext=()=>{

    if(stores.length-displayStores.length<=storesPerPage){

      setTimeout(()=>{

        setDisplayStores(prev=> [...prev,...stores.slice(page*storesPerPage,stores.length)]);
        setHasMore(false);

      },1000)

    }else{

      setTimeout(()=>{

        setDisplayStores(prev => [...prev,...stores.slice( (page*storesPerPage) , (page*storesPerPage)+storesPerPage )]);
        setPage(prev=>prev+1)

      },1000)

    }

  }
  //! ****************************************


  return (
    <>
      <NotePopUp noteMsg={noteMsg} />
      <Navbar/>
      <div className="pt-28 pb-14 w-full min-h-screen px-4 md:px-8 flex flex-col space-y-4">

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

          {/* locate stores on map */}
          <div className="flex space-x-2 self-center text-[13px]">

              <Link
                href="/sellers/locations"
                className="underline hover:scale-[1.1] text-effectColor"
              >
                هنا
              </Link>
              <span className="dark:text-darkTextColor">لرؤية موقع المتاجر اضغط </span>
              <FaMapMarkerAlt className="text-effectColor self-center" />

          </div>

          {/* stores */}
          <InfiniteScroll
              dataLength={displayStores.length}
              next={displayNext}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center items-center my-5">
                  <ColorRing
                  height="50"
                  width="50"
                  colors={['gray','gray','gray','gray','gray']}
                  />
                </div>  
              }
              endMessage={
                <div className="flex justify-center items-center my-5">
                  <b>تهانينا ! لقد رأيت كل المتاجر</b>
                </div>
              }
          >
    
              <div className="flex justify-evenly flex-wrap">

              {
                  displayStores.map((store, index) => {
                    return (
                      <DynamicSeller
                        key={index}
                        id={index}
                        name={store.name}
                        address={store.address}
                        coo={store.coo}
                        dist={store.dist}
                        time={store.time}
                      />
                    );
                  })
              }

              </div>  

          </InfiniteScroll>
        
      </div>
    </>
  );
};

export default Sellers;
