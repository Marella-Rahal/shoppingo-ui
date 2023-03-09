import { useRouter } from 'next/router'
import React from 'react'

const Product = (props) => {
  const router=useRouter();
  return (
    <div className="flex flex-col space-y-5 pb-3 w-[200px] h-fit rounded-lg shadow-md shadow-shadowColor m-5" >
        <img
        src={props.img}
        className="w-full h-[200px] rounded-t-lg border-b-2 border-shadowColor/10 cursor-pointer"
        onClick={()=>router.push(`/productDetail/${props.id}`)}
        />

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

    </div>
  )
}

export default Product