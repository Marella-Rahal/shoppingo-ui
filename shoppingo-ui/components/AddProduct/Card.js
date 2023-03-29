import React, { useState } from 'react'
import ColorCircle from './ColorCircle';
import { SketchPicker } from 'react-color';
import {HiPlusSm,HiMinusSm} from 'react-icons/hi'
import {AnimatePresence, motion} from 'framer-motion';

function Card(props) {
  
  const[numberofitems,setnumberofitems]=useState(1);
  const[ShowSketchPicker,setShowSketchPicker]=useState(false);
  const[ColorPicker,setColorPicker]=useState("");

  const[AllColors,setAllColors]=useState([]);

  return (
    <AnimatePresence>
        <motion.div 
        key={props.value}
        initial={{opacity:0,scale:0}} 
        animate={{opacity:1,scale:1}} 
        exit={{opacity:0,scale:0}}
        transition={{ease:'easeInOut',duration:0.7}} 
        className={`${props.value.slice(-1)== '2'?"hidden":"flex" } w-[200px] h-[260px] shadow-lg rounded-2xl flex-col mt-14 mx-[15px] items-center relative`}>
          <div className='dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 w-[50px] h-[50px] top-[-20px] bg-textColor/90 shadow-md  shadow-shadowColor  text-white flex justify-center items-center rounded-full absolute border-2 border-white' >{props.value}</div>

          <div className='w-full h-full bg-white rounded-2xl  shadow-2xl  flex items-center flex-col pt-10 px-2' >
            {/* first row for quntity */}
            <div className='w-full flex justify-between'>
              <div className='flex space-x-1'>

                <button onClick={()=>{setnumberofitems(numberofitems-1)}} className='bg-textColor/90 hover:bg-[#050531] dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl w-5 h-5 rounded-full flex justify-center items-center border-2 border-white shadow-md shadow-shadowColor dark:shadow-md dark:shadow-shadowColor text-white font-bold'>
                  <HiMinusSm className='w-5 h-5'/>
                </button>

                <button onClick={()=>{setnumberofitems(numberofitems+1)}} className='bg-textColor/90 hover:bg-[#050531] dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl w-5 h-5 rounded-full flex justify-center items-center border-2 border-white shadow-md shadow-shadowColor dark:shadow-md dark:shadow-shadowColor text-white font-bold'>
                  <HiPlusSm className='w-5 h-5'/>
                </button>

              </div>
              
              <div className='font-bold px-1 dark:text-black'>
                {numberofitems}
              </div>
              <div className='font-bold  dark:text-black'>
              :  الكمية 
              </div>
            </div>
            {/* line */}
            <div className='border-t-2 w-full mt-2 mb-1 '/>
            {/* button for add color */}
            <button className='bg-textColor/90 hover:bg-[#050531] dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl border-2 border-white shadow-md shadow-shadowColor dark:shadow-md dark:shadow-shadowColor text-white text-sm px-2 py-1' onClick={()=>{
              if(ShowSketchPicker)
              {
                
                setAllColors(AllColors => [...AllColors, ColorPicker])
                // console.log(AllColors ,"allcolors");
                setShowSketchPicker(false);
              }
              else
              {          
                setShowSketchPicker(true);
              }
            }} >
              {ShowSketchPicker==false?<div>إضافة لون</div>:<div>تأكيد</div> }
            </button>
            {ShowSketchPicker&&<SketchPicker className='absolute z-30 mt-[75px]' color={ColorPicker} onChange={(color)=>{setColorPicker(color.hex) }} />}
            {/* line */}
            <div className='border-t-2 w-full my-2 '/>
            {/* sections for colors */}
            <div dir="rtl" className='w-full flex justify-evenly flex-wrap overflow-y-auto sliderScroll rounded-lg py-1'>

              {AllColors.map(function(value,index){
                return <ColorCircle key={index} value={value}/>;
              })  }

            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  )
}

export default Card