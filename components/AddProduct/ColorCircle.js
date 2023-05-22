import React, { useState } from 'react'
import {IoClose} from 'react-icons/io5'

function ColorCircle(props) {
    const color= props.value;
    const[ShowDiv,setShowDiv]=useState(true);
    
  return (
    
    <div className={`${ShowDiv===true?'flex':'hidden'} w-8 h-8 rounded-full m-1 relative`}>

        <div className='absolute top-[-2px] left-5 w-3 h-3 rounded-full bg-white flex justify-center items-center hover:cursor-pointer hover:bg-slate-200 drop-shadow-lg shadow-shadowColor' onClick={()=>setShowDiv('false')}>
          <IoClose className='text-textColor dark:text-darkBgColor drop-shadow-md shadow-shadowColor'/>
        </div>

        <div className= {'w-8 h-8 rounded-full shadow-md shadow-shadowColor'} style={{backgroundColor:color}} > 
        </div>

    </div>
    
    )
}

export default ColorCircle