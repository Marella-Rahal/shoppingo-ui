import React from "react";
import Navbar from "../../components/Navbar";
import Placeholder from "../../components/ConfirmSeller/Placeholder";
import dynamic from 'next/dynamic';
const DynamicConfirmSeller=dynamic(()=>import('../../components/ConfirmSeller/ConfirmSeller'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

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
]

const ConfirmSellers = () => {
  return (
    <>
      <Navbar/>
      <div className="pt-28 md:pt-32 px-4 md:px-8 pb-10 w-full min-h-screen flex flex-col space-y-5">
        {
          sellers.map((one,index)=>{
            return <DynamicConfirmSeller key={index} id={index} email={one.email}/>
          })
        }
      </div>
    </>
  );
};

export default ConfirmSellers;
