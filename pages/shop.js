import React from "react";
import Navbar from "../components/Navbar";
import ShopBody from "../components/Shop/ShopBody";
import axios from "axios";
import FailToGet from '../components/FailToGet'
import NotePopUp from "../components/PopUp/NotePopUp";
import { useState } from "react";

const Shop = (props) => {

  const [noteMsg,setNoteMsg]=useState('')

  return (
    <>
      {
        props.success ? (
          <>
            <NotePopUp noteMsg={noteMsg}/>
            <Navbar/>
            <ShopBody shopRoute={true} offersRoute={false} shopIdRoute={false} setNoteMsg={setNoteMsg} uniqueProducts={props.uniqueProducts}/>
          </>
        ) : (
          <FailToGet/>
        )
      }

    </>
  );
};

export default Shop;

export const getServerSideProps = async (context) => {

    try {

      const res= await axios.get(`${process.env.server_url}/api/v2.0/shop/getAllProduct`);

      return {
        props : {
          success : true,
          uniqueProducts : res.data.success ? res.data.uniqueProducts : []
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