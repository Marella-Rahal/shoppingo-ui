import React from "react";
import { useRouter } from "next/router";
import {AnimatePresence, motion} from 'framer-motion';
import Image from "next/image";

const Seller = (props) => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={props.id}
        initial={{opacity:0,scaleY:0}} 
        animate={{opacity:1,scaleY:"100%"}} 
        exit={{opacity:0,scaleY:0}}
        transition={{ease:'easeInOut',duration:0.5}}
        className="flex justify-end items-center p-3 space-x-3 shadow-cardShadow dark:shadow-darkCardShadow rounded-lg my-3 lg:mx-3 lg:h-[190px] w-full lg:w-[425px]"
      >
        <div className="flex flex-col text-end space-y-2 ">
          <h6
            className="cursor-pointer hover:underline"
            onClick={() => router.push({ pathname : '/sellerProducts' , query : { sellerId : props.id } }) }
          >
            {props.name}
          </h6>
          <span className="text-[10px] sm:text-[13px] font-semibold">
            {props.address}
          </span>
          <span className="text-[10px] sm:text-[13px] font-semibold text-effectColor dark:text-darkTextColor2">
            {props.dist} - {props.time}
          </span>
        </div>

        <Image
        alt="store's image" 
        src={props.storeImageURL}
        placeholder="blur"
        blurDataURL={props.storeImageURL}
        loading="lazy"
        width={112}
        height={112} 
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg bg-gray-200" />
      </motion.div>

    </AnimatePresence>
  );
};

export default Seller;
