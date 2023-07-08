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
import Lottie from "lottie-react";
import emptyResult from "../../public/empty.json";
import ReactPaginateComponent from "../../components/ReactPaginateComponent";
import FailToGet from "../../components/FailToGet";

mapboxgl.accessToken = process.env.mapbox_key;

const Sellers = (props) => {

  const [noteMsg, setNoteMsg] = useState("");
  const [coords, error] = usePosition();
  const [errOnce,setErrOnce] = useState(false);
  const [cooOnce,setCooOnce] = useState(false);

  
  //* pagination staff ***************************************************

  const [sellers,setSellers]=useState(props?.sellers);

  const [sellersPerPage,setSellersPerPage]=useState(6);
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const [sellersDisplayed, setSellersDisplayed] = useState( sellers?.slice(0,sellersPerPage) );
  const [FirstArrow, setFirstArrow] = useState(false);
  const [LastArrow, setLastArrow] = useState(sellers?.length > sellersPerPage);

  //* 𝗰𝗵𝗮𝗻𝗴𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗶𝗿𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗹𝗮𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗣𝗮𝗴𝗲 𝗮𝗻𝗱 𝘁𝗵𝗲 𝘀𝗲𝗹𝗹𝗲𝗿𝘀𝗗𝗶𝘀𝗽𝗹𝗮𝘆𝗲𝗱 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘄 𝘀𝗲𝗹𝗲𝗰𝘁𝗲𝗱 𝗱𝗮𝘁𝗮
  const handleChange = (data) => {

    // 𝗳𝗼𝗿 𝗹𝗲𝗳𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == 0 ) setFirstArrow(false);
    else setFirstArrow(true);

    // 𝗳𝗼𝗿 𝗿𝗶𝗴𝗵𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == ( Math.ceil(sellers.length / sellersPerPage) - 1 ) ) setLastArrow(false);
    else setLastArrow(true);

    setCurrentPage(data.selected)

    setSellersDisplayed(sellers.slice(data.selected * sellersPerPage, data.selected * sellersPerPage + sellersPerPage));

  };

  useEffect(()=>{

    setCurrentPage(0);
    setFirstArrow(false);
    setLastArrow( sellers?.length > sellersPerPage )
    setSellersDisplayed( sellers?.slice(0,sellersPerPage) );

  },[sellers])

  const handleFilterByName = (e) => {

    if(e.target.value){

      setSellers( props.sellers.filter( s => s.storeName.includes(e.target.value) ))

    }else{

      setSellers(props.sellers)
    }

  }

  //* coordinate staff *********************************************************
  useEffect(() => {
    
    if(coords.length > 0 && props.success && !cooOnce){

      setCooOnce(true);

      //to change the data before i make it visible to the user
      sellers.forEach((store) => {
        getRoute(coords, store.coo).then(
          (value) => {
            if(value){
              store.dist = `يبعد ${value[1]} كيلو متر عن موقعك`;
              store.time = `${value[2]}  دقيقة سيراً   `;
              setSellers([...sellers]);
            }
          }
        );
      });

    }else if(error && props.success && !errOnce && !cooOnce){

      setErrOnce(true);

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

  }, [coords , error]);

  //*function to calculate the distance and the time between the user location and the store location
  const getRoute = async (start, end) => {

    try {

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

    } catch (error) {}

  };

  return (
    <>
      {
        props.success ? (
          <>
            <NotePopUp noteMsg={noteMsg} />
            <Navbar/>
            <div className={`pt-28 pb-10  w-full ${sellers.length !== 0 ? 'min-h-screen' : 'h-screen' } flex flex-col space-y-3`}>

                {/* Search */}
                <div className="mx-4 md:mx-8 flex self-center h-[37px]">
                  <label className="bg-white rounded-l-full shadow-sm shadow-shadowColor cursor-pointer px-2 py-[5px] text-textColor dark:text-darkBgColor flex justify-center items-center">
                    <BiSearchAlt2 className="w-[20px] h-[20px] hover:scale-[1.1]" />
                  </label>
                  <input
                    type="text"
                    placeholder="اسم المحل"
                    onChange={handleFilterByName}
                    className="w-full md:w-[230px] rounded-r-full shadow-sm shadow-shadowColor outline-none border-2 border-transparent focus:border-effectColor dark:focus:border-darkTextColor2  px-3 py-[5px] text-textColor dark:text-darkBgColor text-end"
                  />
                </div>

                {/* locate stores on map */}
                <div className="mx-4 md:mx-8 flex space-x-2 self-center text-[13px]">

                    <Link
                      href="/sellers/locations"
                      className="underline hover:scale-[1.1] text-effectColor dark:text-darkTextColor2"
                    >
                      هنا
                    </Link>
                    <span className="dark:text-darkTextColor">لرؤية موقع المتاجر اضغط </span>
                    <FaMapMarkerAlt className="text-effectColor dark:text-darkTextColor2 self-center" />

                </div>

                {/* stores */}
          
                <div className="h-full px-4 md:px-8 flex justify-evenly flex-wrap">

                {
                    sellers.length !== 0 ? (
                      sellersDisplayed.map((store, index) => {
                        return (
                          <DynamicSeller
                            key={index}
                            id={store._id}
                            name={store.storeName}
                            storeImageURL={store.storeImageURL}
                            address={store.location}
                            coo={store.coo}
                            dist={store?.dist}
                            time={store?.time}
                          />
                        );
                      })
                    ) : (

                      <div className='w-full h-full flex justify-center items-center'>
                        <Lottie animationData={emptyResult} loop={true} />
                      </div>

                    )
                    
                }

                </div>

                <ReactPaginateComponent
                FirstArrow={FirstArrow}
                LastArrow={LastArrow}
                currentPage={currentPage}
                handleChange={handleChange}
                pageCount={ Math.ceil(sellers.length / sellersPerPage) }/>  
              
            </div>
          </>
        ) : (
            <FailToGet/>
        )
      }
    </>
  );
};

export default Sellers;

export const getServerSideProps = async (context) => {

  try {

      const res= await axios.get(`${process.env.server_url}/api/v2.0/store/getAllSeller`);

      return {
        props : {
          success : true,
          sellers : res.data.success ? res.data.sellers : []
        }
      }
    
  } catch (error) {

      return {
        props : {
          success : false
        }
      }
    
  }

}
