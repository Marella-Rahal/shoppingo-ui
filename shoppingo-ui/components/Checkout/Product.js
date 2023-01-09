import { useRouter } from 'next/router';
import React from 'react';
import {AiOutlineClose} from 'react-icons/ai'

const Product =() =>{
    const router=useRouter();
    return (
        <div
         
         className="relative rounded-md shadow-lg shadow-shadowColor flex flex-col space-y-3">

            <img src='../../product.jpg' alt="product img" className="absolute top-[-27px] self-center w-[50px] h-[50px] rounded-full ring-1 ring-white shadow-md shadow-shadowColor cursor-pointer" onClick={()=>{router.push('/productDetail/1')}}/>

            <div className="absolute -top-6 -right-[10px] w-5 h-5 rounded-full bg-textColor border-[2px] border-white shadow-md shadow-shadowColor flex justify-center items-center hover:scale-[1.1] cursor-pointer">
                <AiOutlineClose className="text-white w-4 h-4" />
            </div>

            
            <div className='font-semibold text-center text-md md:text-lg cursor-pointer p-3 pt-5 border-b-[1px] border-[grey] hover:underline' onClick={()=>{router.push('/shop/1')}}>For_You</div>

            <div className='flex space-x-2 items-center justify-between px-3'>
                <div className='font-semibold text-md md:text-lg uppercase'>7xL</div>
                <div className='w-5 h-5 rounded-full bg-red-500 shadow-md shadow-shadowColor'></div>
            </div>

            <div className='flex space-x-2 items-center justify-between p-3 border-t-[1px] border-[grey]'>
                <div className='font-semibold text-[13px] text-center'> 1 قطعة </div>
                <div className='font-semibold text-[12px] text-center'>10000 ل.س</div>
            </div>
        </div>
    )
}

export default Product;