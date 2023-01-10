import { useRouter } from 'next/router';
import React from 'react';
import { MdDelete } from 'react-icons/md';

const Product =(props) =>{
    const router=useRouter();
    return (

        <div className='relative flex flex-col rounded-md shadow-lg shadow-shadowColor min-w-[275px] font-semibold'>

            {/* image */}
            <img src={props.img} alt='product image' className='absolute top-[-30px] self-center  w-14 h-14 rounded-xl shadow-lg shadow-shadowColor cursor-pointer ring-[1px] ring-shadowColor' onClick={()=>router.push(`/productDetail/${props.id}`)}/>

            {/* shop name and delete button */}
            <div className='mt-10 p-2 pt-0 flex space-x-2 justify-between items-center h-16 border-y-[1px] border-shadowColor'>

                <div className='flex justify-center items-center hover:scale-[1.1] cursor-pointer'>
                    <MdDelete className='text-[30px]'/>
                </div>    
                <div className='flex items-center text-center h-full text-clip overflow-y-auto cursor-pointer hover:underline' onClick={()=>router.push(`/shop/${props.shopId}`)}>{props.shopName}</div>
            </div>

            {/* size and color and qty */}
            <div className='p-2 flex space-x-2 justify-between items-center h-12 border-b-[1px] border-shadowColor'>

                <div className='lowercase'>{props.size}</div>

                <div className='flex justify-center items-center w-[180px] text-clip overflow-x-auto'>
                   <span className='mr-2'>قطعة</span>
                    {props.qty}
                </div>

                <div
                 style={{backgroundColor:`${props.color}`}}
                 className='w-5 h-5 rounded-full shadow-md shadow-shadowColor'/>

            </div>

            {/* price */}
            <div className='p-2 flex justify-center items-center h-12 text-clip overflow-x-auto'>
                <span className='mr-2'> ل.س</span>
                {props.price}
            </div>

            {/* payment methode */}
            {
                props.type==='both' && (
                    <div className='p-2 flex space-x-2 justify-between items-center h-12 border-t-[1px] border-shadowColor text-end text-[15px]'>

                        <div className='flex space-x-2'>

                            <label htmlFor={`hand${props.id}`}>عند الاستلام</label>

                            <input type="radio" name={`paymentMethode${props.id}`} id={`hand${props.id}`} required/>

                        </div>

                        <div className='flex space-x-2'>

                            <label htmlFor={`line${props.id}`}>
                                WePay عن طريق  
                            </label>

                            <input type="radio" name={`paymentMethode${props.id}`} id={`line${props.id}`} required/>

                        </div>

                    </div>
                )
            }

        </div>

    )
}

export default Product;