import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import {AnimatePresence, motion} from 'framer-motion';
import { showPopUpNote } from "../PopUp/NotePopUp";
import axios from "axios";
import { parseCookies } from "nookies";

const Product = (props) => {

  const cookies = parseCookies();
  const token = cookies.token;
  const router = useRouter();
  const [checkDeliveryMethod,setCheckDeliveryMethod]=useState('');
  
  useEffect(()=>{

    if(checkDeliveryMethod == 'wepay'){

      props.setSendingOnDeliveryItems(prev => prev.filter(product => product.item._id !== props.id));
      
      props.setSendingWepayItems( prev => [...prev , props.value] )

    }else if(checkDeliveryMethod == 'onDelivery'){

      props.setSendingWepayItems(prev => prev.filter(product => product.item._id !== props.id));

      props.setSendingOnDeliveryItems( prev => [...prev , props.value] )

    }

  },[checkDeliveryMethod])

  const removeItem = async () => {

    try {

      props.setSendingStatus(true);

      const res = await axios.delete(
        `${process.env.server_url}/api/v2.0/cart/deleteItemFromCart/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(!res.data.success){

        props.setOnDeliveryItems([])
        props.setWepayItems([])
        props.setRestItems([])

        props.setSendingOnDeliveryItems([]);
        props.setSendingWepayItems([]);

        props.setOnDeliveryItemsPrice(0)
        props.setWepayItemsPrice(0)
        props.setRestItemsPrice(0)

      }else{

        props.setOnDeliveryItems(res.data.onDelivery.onDeliveryItems)
        props.setWepayItems(res.data.wepayItems.wepayItems)
        props.setRestItems(res.data.restItems.restItems)

        props.setSendingOnDeliveryItems(prev => prev.filter(product => product.item._id !== props.id)); 
        props.setSendingWepayItems(prev => prev.filter(product => product.item._id !== props.id));

        props.setOnDeliveryItemsPrice(res.data.onDelivery.onDeliveryItemsPrice)
        props.setWepayItemsPrice(res.data.wepayItems.wepayItemsPrice)
        props.setRestItemsPrice(res.data.restItems.restItemsPrice)

      }

      props.setSendingStatus(false);

    } catch (error) {

      props.setSendingStatus(false);
      props.setNoteMsg(
          <h5 className='text-red-600 text-center'>{error?.message}</h5>
      );
      showPopUpNote();

    }

  }

  return (
    <AnimatePresence mode="wait">

      <motion.div
      key={props.id}
      initial={{opacity:0,scale:0.8}} 
        animate={{opacity:1,scale:1}} 
        exit={{opacity:0,scale:0.8}}
        transition={{ease:'easeInOut',duration:0.5}} 
      dir="ltr">

        <div className="relative flex flex-col w-[200px] rounded-md shadow-sm shadow-shadowColor font-bold text-[13px] ml-5">

              {/* delete button */}
              <div className="absolute -top-[11px] -right-[11px] w-6 h-6 rounded-full bg-textColor dark:bg-darkTextColor2 border-[3px] border-white shadow-md shadow-shadowColor flex justify-center items-center hover:scale-[1.1] cursor-pointer" onClick={removeItem}>
                <AiOutlineClose className="text-white w-5 h-5" />
              </div>

              {/* Product Image */}
              <img
                src={props.img}
                className="w-full h-[150px] rounded-t-md border-b-2 border-shadowColor/20 cursor-pointer"
                onClick={() => router.push({ pathname : '/productDetail' , query : {productId : props.productId} })}
              />

              {/* Store Name */}
              <div className="flex justify-center items-center w-full h-[30px] border-b-2 border-shadowColor/20">

                <p
                  className="text-center cursor-pointer hover:underline"
                  onClick={() => router.push({ pathname : '/sellerProducts' , query : { sellerId : props.shopId } }) }
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
                            <input 
                            type="radio" 
                            name={`paymentMethode${props.id}`} 
                            id={`hand${props.id}`}
                            value={'onDelivery'}
                            onChange={(e)=>setCheckDeliveryMethod(e.target.value)} 
                            required/>

                        </div>

                        <div className="w-1/2 flex justify-center items-center space-x-1 text-end text-[10px]">

                            <label htmlFor={`line${props.id}`}>WePay عبر </label>
                            <input 
                            type="radio" 
                            name={`paymentMethode${props.id}`} 
                            id={`line${props.id}`}
                            value={'wepay'}
                            onChange={(e)=>setCheckDeliveryMethod(e.target.value)} 
                            required/>

                        </div>

                    </div>
                )
              }

        </div>

      </motion.div>

    </AnimatePresence>
    
  );
};

export default Product;
