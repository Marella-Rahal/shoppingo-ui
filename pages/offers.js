import React from "react";
import Navbar from "../components/Navbar";
import ShopBody from "../components/Shop/ShopBody";
import FailToGet from "../components/FailToGet";
import axios from "axios";
import { useState } from "react";
import NotePopUp from "../components/PopUp/NotePopUp";

const Offers = (props) => {

  const [noteMsg,setNoteMsg]=useState('')

  return (
    <>
      {
        props.success ? (
          <>
            <NotePopUp noteMsg={noteMsg}/>
            <Navbar/>
            <ShopBody shopRoute={false} offersRoute={true} shopIdRoute={false} setNoteMsg={setNoteMsg} uniqueProducts={props.uniqueProducts}/>
          </>
        ) : (
          <FailToGet/>
        )
      }
    </>
  );
};

export default Offers;

export const getServerSideProps = async (context) => {

  try {

    const res= await axios.get(`${process.env.server_url}/api/v2.0/shop/getOffers`);

    return {
      props : {
        success : true,
        uniqueProducts : res.data.success ? res.data.products : []
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