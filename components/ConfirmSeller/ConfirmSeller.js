import React from "react";
import { AnimatePresence , motion } from 'framer-motion';
const ConfirmSeller = (props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
      key={props.id}
      initial={{opacity:0,scale:0}} 
      animate={{opacity:1,scale:1}} 
      exit={{opacity:0,scale:0}}
      transition={{ease:'easeInOut',duration:0.7}}
      className="px-4 rounded-xl bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 flex flex-col-reverse items-center md:flex-row md:justify-between">
        <div className="flex space-x-3 py-8">
          <button className="bg-white hover:bg-white text-effectColor dark:from-white dark:to-white dark:text-darkTextColor2 py-2 px-5 xs:px-10 hover:scale-[1.1] shadow-none">
            رفض
          </button>
          <button className="bg-white hover:bg-white text-effectColor dark:from-white dark:to-white dark:text-darkTextColor2 py-2 px-5 xs:px-10 hover:scale-[1.1] shadow-none ">
            قبول
          </button>
        </div>

        <div className="font-bold text-white md xs:text-xl py-8">
          {props.email}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmSeller;
