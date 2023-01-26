// import { useRouter } from 'next/router';
// import React from 'react';
// import { MdDelete } from 'react-icons/md';

// const Product =(props) =>{
//     const router=useRouter();
//     return (

//         <div className='relative flex flex-col rounded-md shadow-lg shadow-shadowColor min-w-[275px] font-semibold'>

//             {/* image */}
//             <img src={props.img} alt='product image' className='absolute top-[-30px] self-center  w-14 h-14 rounded-xl shadow-lg shadow-shadowColor cursor-pointer ring-[1px] ring-shadowColor' onClick={()=>router.push(`/productDetail/${props.id}`)}/>

//             {/* shop name and delete button */}
//             <div className='mt-10 p-2 pt-0 flex space-x-2 justify-between items-center h-16 border-y-[1px] border-shadowColor'>

//                 <div className='flex justify-center items-center hover:scale-[1.1] cursor-pointer'>
//                     <MdDelete className='text-[30px]'/>
//                 </div>    
//                 <div className='flex items-center text-center h-full text-clip overflow-y-auto cursor-pointer hover:underline' onClick={()=>router.push(`/shop/${props.shopId}`)}>{props.shopName}</div>
//             </div>

//             {/* size and color and qty */}
//             <div className='p-2 flex space-x-2 justify-between items-center h-12 border-b-[1px] border-shadowColor'>

//                 <div className='lowercase'>{props.size}</div>

//                 <div className='flex justify-center items-center w-[180px] text-clip overflow-x-auto'>
//                    <span className='mr-2'>قطعة</span>
//                     {props.qty}
//                 </div>

//                 <div
//                  style={{backgroundColor:`${props.color}`}}
//                  className='w-5 h-5 rounded-full shadow-md shadow-shadowColor'/>

//             </div>

//             {/* price */}
//             <div className='p-2 flex justify-center items-center h-12 text-clip overflow-x-auto'>
//                 <span className='mr-2'> ل.س</span>
//                 {props.price}
//             </div>

//             {/* payment methode */}
//             {
//                 props.type==='both' && (
//                     <div className='p-2 flex space-x-2 justify-between items-center h-12 border-t-[1px] border-shadowColor text-end text-[15px]'>

//                         <div className='flex items-center space-x-2'>

//                             <label htmlFor={`hand${props.id}`}>عند الاستلام</label>

//                             <input type="radio" name={`paymentMethode${props.id}`} id={`hand${props.id}`} required/>

//                         </div>

//                         <div className='flex items-center space-x-2'>

//                             <label htmlFor={`line${props.id}`}>
//                                 WePay عن طريق  
//                             </label>

//                             <input type="radio" name={`paymentMethode${props.id}`} id={`line${props.id}`} required/>

//                         </div>

//                     </div>
//                 )
//             }

//         </div>

//     )
// }

// export default Product;

import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

const Product = (props) => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col min-w-[200px] rounded-md shadow-md shadow-shadowColor font-bold text-[13px]">

      {/* delete button */}
      <div className="absolute -top-[11px] -right-[11px] w-6 h-6 rounded-full bg-textColor dark:bg-darkTextColor2 border-[3px] border-white shadow-md shadow-shadowColor flex justify-center items-center hover:scale-[1.1] cursor-pointer">
        <AiOutlineClose className="text-white w-5 h-5" />
      </div>

      {/* Product Image */}
      <img
        src={props.img}
        className="w-full h-[150px] rounded-t-md border-b-2 border-shadowColor/20 cursor-pointer"
        onClick={() => router.push(`/productDetail/${props.id}`)}
      />

      {/* Store Name */}
      <div className="flex justify-center items-center w-full h-[30px] border-b-2 border-shadowColor/20">

        <p
          className="text-center cursor-pointer hover:underline"
          onClick={() => router.push(`/shop/${props.shopId}`)}
        >
          {props.shopName}
        </p>

      </div>

      {/* Size and Color */}

      <div className="flex w-full h-[30px] border-b-2 border-shadowColor/20">

        <div className="w-1/2 px-3 flex justify-center items-center border-r-2 border-shadowColor/20">
          <span className="lowercase">{props.size}</span>
        </div>

        <div className="w-1/2 px-3 flex justify-center items-center">
          <div
            style={{ backgroundColor: `${props.color}` }}
            className="w-4 h-4 rounded-full shadow-md shadow-shadowColor"
          />
        </div>

      </div>


      {/* Price and Quantity */}
      <div className={props.type=='both'?"flex w-full h-[45px]":"flex w-full h-[45px] rounded-b-md "}>

        {/* Quantity */}
        <div className="w-1/2 border-r-2 border-shadowColor/20 flex flex-col justify-center items-center space-y-1 text-[10px]">

            <div>{props.qty}</div>  
            <div>قطعة</div>

        </div>

        {/* Price */}
        <div className="w-1/2 flex flex-col justify-center items-center space-y-1 text-[10px]">

            <div>{props.price}</div>
            <div>ل.س</div>

        </div>
      </div>

      {/* Payment Methode */}
      {
        props.type=='both' && (
            <div className="w-full h-[35px] border-t-2 border-shadowColor/20 flex rounded-b-md">

                <div className="w-1/2 border-r-2 border-shadowColor/20 flex justify-center items-center space-x-1 text-end text-[10px]">

                    <label htmlFor={`hand${props.id}`}>عند الاستلام</label>
                    <input type="radio" name={`paymentMethode${props.id}`} id={`hand${props.id}`} required/>

                </div>

                <div className="w-1/2 flex justify-center items-center space-x-1 text-end text-[10px]">

                    <label htmlFor={`line${props.id}`}>WePay عبر </label>
                    <input type="radio" name={`paymentMethode${props.id}`} id={`line${props.id}`} required/>

                </div>

            </div>
        )
      }


    </div>
  );
};

export default Product;
