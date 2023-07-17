import React from "react";
import Navbar from "../components/Navbar";
import ShopBody from "../components/Shop/ShopBody";
import axios from "axios";
import FailToGet from "../components/FailToGet";
import NotePopUp from "../components/PopUp/NotePopUp";
import { useState } from "react";

const SellerProducts = (props) => {

    const [noteMsg,setNoteMsg]=useState('')

    return (
      <>
        {
            props.success ? (
            <>
                <NotePopUp noteMsg={noteMsg}/>
                <Navbar/>
                <div className="pt-[103px] pb-7 px-4 md:px-8 min-h-screen w-full flex flex-col space-y-7">
                {/* store name */}
                <h3 className="text-center drop-shadow-lg shadow-shadowColor">
                    {props.seller.storeName}
                </h3>

                <ShopBody shopRoute={false} offersRoute={false} shopIdRoute={true} setNoteMsg={setNoteMsg} uniqueProducts={props.uniqueProducts}/>
                </div>
            </>
            ) : (
                <FailToGet/>
            )
        }
      </>
    );
}

export default SellerProducts

export const getServerSideProps = async (context) => {

    try {
  
      const res= await axios.get(`${process.env.server_url}/api/v2.0/store/getSellerProducts/${context.query.sellerId}`);
  
      return {
        props : {
          success : true,
          seller : res.data.seller ,
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