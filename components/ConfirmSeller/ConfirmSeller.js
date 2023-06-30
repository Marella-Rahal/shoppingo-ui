import React from "react";
import { AnimatePresence , motion } from 'framer-motion';
import { showPopUpNote } from "../PopUp/NotePopUp";
import axios from "axios";
import { parseCookies } from "nookies";
const ConfirmSeller = (props) => {

  const cookies = parseCookies();
  const token = cookies.token;

  const acceptRejectSellers = async (accept)=>{

    const id = props.id;

    try {

      props.setSendingStatus(true);

      if(accept){
        
        const res = await axios.put(`${process.env.server_url}/api/v2.0/store/sellerResponse/${id}`, {} ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      }else{

        const res = await axios.put(`${process.env.server_url}/api/v2.0/store/sellerReject/${id}`, {} ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      }
      
      props.setSellers(prev => prev.filter( s => s._id !== id ) )

      props.setSendingStatus(false);
      
    } catch (error) {
      
      props.setSendingStatus(false);
      props.setNoteMsg(<h5 className="text-red-600 text-center">{error?.message}</h5>);
      showPopUpNote(); 
    }

  }
  return (
    <AnimatePresence mode="wait">
      <motion.div
      key={props.id}
      initial={{opacity:0,scaleY:0}} 
      animate={{opacity:1,scaleY:"100%"}} 
      exit={{opacity:0,scaleY:0}}
      transition={{ease:'easeInOut',duration:0.5}}
      className="px-4 rounded-xl bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 flex flex-col-reverse items-center md:flex-row">

        <div className="flex space-x-3 pb-4 pt-2 md:py-4 md:w-1/3">
          <button className="bg-white hover:bg-white text-effectColor dark:from-white dark:to-white dark:text-darkTextColor2 py-2 px-5 xs:px-10 hover:scale-[1.03] shadow-none" onClick={()=>acceptRejectSellers(false)}>
            رفض
          </button>
          <button className="bg-white hover:bg-white text-effectColor dark:from-white dark:to-white dark:text-darkTextColor2 py-2 px-5 xs:px-10 hover:scale-[1.03] shadow-none" onClick={()=>acceptRejectSellers(true)}>
            قبول
          </button>
        </div>

        <div className="flex flex-col text-center font-bold text-white py-2 md:py-4 md:w-1/3">
          <span> رقم الهاتف</span>
          <span>{props.number}</span>
        </div>

        <div className="flex flex-col text-center font-bold text-white pb-2 pt-4 md:py-4 md:w-1/3 md:text-end">
          <span> اسم المتجر</span>
          <span>{props.name}</span>
        </div>
        
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmSeller;
