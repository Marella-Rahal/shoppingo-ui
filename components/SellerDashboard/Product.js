import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes';
import {AnimatePresence, motion} from 'framer-motion';

const Product = (props) => {
  const router=useRouter();
  const { theme , setTheme }=useTheme();
  const [oImg,setOImg]=useState('')
  useEffect(()=>{

    if(theme=='dark'){
      setOImg('../darkOffer.svg')
    }else{
      setOImg('../offer.svg');
    }

  },[theme])
  
  return (
    <AnimatePresence mode="wait">

      <motion.div
      key={props.id}
      initial={{opacity:0,scale:0}} 
      animate={{opacity:1,scale:1}} 
      exit={{opacity:0,scale:0}}
      transition={{ease:'easeInOut',duration:0.7}} 
      className="relative flex flex-col space-y-5 pb-3 w-[200px] h-fit rounded-lg shadow-sm shadow-shadowColor m-5" >
          
          <img
          src={props.img}
          className="w-full h-[200px] rounded-t-lg border-b-2 border-shadowColor/10 cursor-pointer"
          onClick={()=>router.push(`/productDetail/${props.id}`)}
          />

          {
            props.withOffer && (
              <img src={oImg} className='absolute w-20 h-20 -top-[37px] -right-[17px]'/>
            )
          }

          <div className='flex justify-center items-center text-sm text-center'>
          <span className='mr-1'>ل.س</span>
          {props.price}
          </div>

          <div className='flex justify-between px-2'>

              <button className='rounded-md bg-textColor/90 hover:bg-[#050531] dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl w-[75px] py-1'>
                  حذف
              </button>
              <button className='rounded-md bg-textColor/90 hover:bg-[#050531] dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl w-[75px] py-1'>
                  تعديل
              </button>
              
          </div>

      </motion.div>

    </AnimatePresence>
  )
}

export default Product