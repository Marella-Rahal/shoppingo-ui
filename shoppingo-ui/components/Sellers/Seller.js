import React from "react";
import { useRouter } from "next/router";
import {AnimatePresence, motion} from 'framer-motion';

const Seller = (props) => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={props.id}
        initial={{opacity:0,scale:0}} 
        animate={{opacity:1,scale:1}} 
        exit={{opacity:0,scale:0}}
        transition={{ease:'easeInOut',duration:0.7}}
        style={{ boxShadow: "0px 0px 5px 5px rgba(0,0,0,0.15)" }}
        className="flex justify-end items-center pl-3 py-3 space-x-3 rounded-lg my-5 lg:mx-3 lg:h-[190px] w-full lg:w-[425px]"
      >
        <div className="flex flex-col text-end space-y-2 ">
          <h6
            className="cursor-pointer hover:underline"
            onClick={() => router.push(`/shop/${props.id}`)}
          >
            {props.name}
          </h6>
          <span className="text-[10px] sm:text-[13px] font-semibold">
            {props.address}
          </span>
          <span className="text-[10px] sm:text-[13px] font-semibold text-effectColor">
            {props.dist} - {props.time}
          </span>
        </div>

        <img src="storePhoto.webp" className="w-28 h-28 sm:w-36 sm:h-36" />
      </motion.div>

    </AnimatePresence>
  );
};

export default Seller;
