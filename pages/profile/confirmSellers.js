import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Placeholder from "../../components/ConfirmSeller/Placeholder";
import dynamic from 'next/dynamic';
const DynamicConfirmSeller=dynamic(()=>import('../../components/ConfirmSeller/ConfirmSeller'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

import { parseCookies } from "nookies";
import axios from "axios";
import FailToGet from "../../components/FailToGet";
import Lottie from "lottie-react";
import emptyResult from "../../public/empty.json";
import ReactPaginateComponent from "../../components/ReactPaginateComponent";
import NotePopUp from "../../components/PopUp/NotePopUp";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";

const ConfirmSellers = (props) => {

  const [sendingStatus , setSendingStatus] =useState(false);
  const [noteMsg,setNoteMsg]=useState('');

  const [sellers,setSellers]=useState(props?.sellers);

  const [sellersPerPage,setSellersPerPage]=useState(5);
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

  return (
    <>
      {
        props.success ? (
          <>
            {
                sendingStatus && (
                  <div className='fixed z-[100] w-full h-full bg-black/30 flex justify-center items-center'>
                      <ThreeDots
                      width="75"
                      color="white"
                      visible={true}
                      /> 
                  </div>
                )
            }
            <NotePopUp noteMsg={noteMsg}/>
            <Navbar/>
            <div className={`pt-28 px-4 md:px-8 pb-10 w-full ${sellers.length == 0 ? 'h-screen flex flex-col justify-center items-center' : 'min-h-screen flex flex-col space-y-7' } `}>
                
                <div className="flex flex-col space-y-5">

                  {
                    sellers.length !==0 ? (
                      
                      sellersDisplayed.map((one,index)=>{
                        return <DynamicConfirmSeller 
                        key={index} 
                        id={one._id} 
                        name={one.storeName} 
                        number={one.storePhoneNumber}
                        setSendingStatus={setSendingStatus}
                        setNoteMsg={setNoteMsg}
                        setSellers={setSellers}/>
                      })
                      
                    ) : (

                      <div className='flex justify-center items-center'>
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

export default ConfirmSellers;

export const getServerSideProps = async (context) => {

    const cookies = parseCookies(context);
    const token = cookies.token;

    try {

        const res = await axios.get(`${process.env.server_url}/api/v2.0/store/getAllSellerRequest`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })

        return {
          props : {
            success : true ,
            sellers : res.data.success ? res.data.sellers : []
          }
        }
      
    } catch (error) {

        if(error?.response?.status == 401){

          return {
            redirect: {
              destination: '/login',
              permanent: false, // Set to false if it's a temporary redirect
            },
          }

        }else{

            return {
              props : {
                success : false
              }
            }

        }
      
    }

}