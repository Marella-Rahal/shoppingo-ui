import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Placeholder from "../../components/ConfirmSeller/Placeholder";
import dynamic from 'next/dynamic';
const DynamicConfirmSeller=dynamic(()=>import('../../components/ConfirmSeller/ConfirmSeller'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";

const sellers=[
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
  {
    email:'marellarahhal@gmail.com'
  },
]

const ConfirmSellers = () => {

  //! this is tha data for InfiniteScrolling
  const [sellersPerPage,setSellersPerPage]=useState(12);
  const [page,setPage]=useState(1);
  const [displaySellers,setDisplaySellers] = useState(()=>{
    return sellersPerPage>=sellers.length ? sellers : sellers.slice(0,sellersPerPage)
  });
  const [hasMore,setHasMore]=useState(()=>{
    return sellersPerPage>=sellers.length ? false : true
  });

  //*******************************************/
  console.log('displaySellers :',displaySellers.length,'hasMore :',hasMore);
  //*******************************************/

  const displayNext=()=>{

    if(sellers.length-displaySellers.length<=sellersPerPage){

      setTimeout(()=>{

        setDisplaySellers(prev=> [...prev,...sellers.slice(page*sellersPerPage,sellers.length)]);
        setHasMore(false);

      },1000)

    }else{

      setTimeout(()=>{

        setDisplaySellers(prev => [...prev,...sellers.slice( (page*sellersPerPage) , (page*sellersPerPage)+sellersPerPage )]);
        setPage(prev=>prev+1)

      },1000)

    }

  }
  //! ****************************************

  return (
    <>
      <Navbar/>
      <div className="pt-28 md:pt-32 px-4 md:px-8 pb-14 w-full min-h-screen">
          <InfiniteScroll
              dataLength={displaySellers.length}
              next={displayNext}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center items-center mt-10 mb-5">
                  <ColorRing
                  height="50"
                  width="50"
                  colors={['gray','gray','gray','gray','gray']}
                  />
                </div>  
              }
              endMessage={
                <div className="flex justify-center items-center mt-10 mb-5">
                  <b>تهانينا ! لقد رأيت كل التجار</b>
                </div>
              }
          >
    
              <div className="flex flex-col space-y-5">

                {
                  displaySellers.map((one,index)=>{
                    return <DynamicConfirmSeller key={index} id={index} email={one.email}/>
                  })
                }

              </div>  

          </InfiniteScroll>
        
      </div>
    </>
  );
};

export default ConfirmSellers;
