import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { showPopUpNote } from '../PopUp/NotePopUp';

const Product = (props) => {

  const cookies = parseCookies();
  const token = cookies.token;
  const router = useRouter();

  const removeProduct = async (id) => {
    
    try {

        props.setSendingStatus(true);

        const res = await axios.delete(
          `${process.env.server_url}/api/v2.0/cart/deleteItemFromCart/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        props.setSendingStatus(false);

        props.cartItems.map((item) => {
          if (item._id === id) {
            props.settotalPrice(props.totalPrice - item.price);
          }
        });

        const updatedCartItems = props.cartItems.filter(
          (item) => item._id !== id
        );
        props.setCartitems(updatedCartItems);

    } catch (error) {

      props.setSendingStatus(false);

      props.setNoteMsg(
        <h5 className="text-red-600 text-center">{error?.message}</h5>
      );

      showPopUpNote();

    }

  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={props.id}
        initial={{opacity:0,scale:0.8}} 
        animate={{opacity:1,scale:1}} 
        exit={{opacity:0,scale:0.8}}
        transition={{ease:'easeInOut',duration:0.5}} 
        className="relative flex flex-col w-[275px] rounded-md shadow-sm shadow-shadowColor mt-14 mr-1 xs:mx-3"
      >
        <div
          onClick={() => {
            removeProduct(props.id);
          }}
          className="absolute -top-5 -right-4 w-9 h-9 rounded-full bg-textColor dark:bg-darkTextColor2 border-[3px] border-white shadow-md shadow-shadowColor flex justify-center items-center hover:scale-[1.1] cursor-pointer"
        >
          <AiOutlineClose className="text-white w-6 h-6" />
        </div>
        {/* Product Image */}
        <img
          src={props.img}
          className="w-full h-[250px] rounded-t-md border-b-2 border-shadowColor/20 cursor-pointer"
          onClick={() => router.push( { pathname : '/productDetail' , query : {productId : props.productId} } )}
        />

        {/* Store Name - view on map */}
        <div className="flex flex-col justify-center w-full h-[50px] border-b-2 border-shadowColor/20">
          <p
            className="text-center font-bold cursor-pointer hover:underline"
            onClick={() => router.push({ pathname : '/sellerProducts' , query : { sellerId : props.shopId } })}
          >
            {props.shopName}
          </p>
          {/* <Link
            href={`/productDetail/${props.id}`}
            className="text-center underline text-textColor2 hover:scale-[1.1]"
          >
            اذهب إلى الخريطة
          </Link> */}
        </div>

        {/* Size and Color */}

        <div className="flex w-full h-[60px] border-b-2 border-shadowColor/20">
          <div className="w-1/2 px-3 flex justify-between items-center border-r-2 border-shadowColor/20">
            <span className="font-bold uppercase">{props.size}</span>
            <p>: القياس</p>
          </div>
          <div className="w-1/2 px-3 flex justify-between items-center">
            <div
              style={{ backgroundColor: `${props.color}` }}
              className="w-6 h-6 rounded-full shadow-md shadow-shadowColor"
            />
            <p>: اللون</p>
          </div>
        </div>

        {/* Price and Quantity */}
        <div className="flex w-full h-[65px] rounded-b-md ">
          {/* Quantity */}
          <div className="w-1/2 border-r-2 border-shadowColor/20 flex flex-col justify-center space-y-1 pb-2">
            <p className="text-textColor2 dark:text-darkTextColor2 text-center">
              : الكمية
            </p>

            <div 
            // className="flex justify-between px-2"
            className='flex justify-center'
            >
              {/* <div className="w-6 h-6 rounded-full shadow-md flex items-center justify-center shadow-shadowColor bg-textColor2 dark:bg-darkTextColor2 border-[3px] border-white cursor-pointer hover:scale-[1.1]">
                <FaMinus className="text-white" />
              </div> */}

              <div className="font-bold">{props.qty}</div>

              {/* <div className="w-6 h-6 rounded-full shadow-md flex items-center justify-center shadow-shadowColor bg-textColor2 dark:bg-darkTextColor2 border-[3px] border-white cursor-pointer hover:scale-[1.1]">
                <FaPlus className="text-white" />
              </div> */}
            </div>
          </div>

          {/* Price */}
          <div className="w-1/2 flex flex-col justify-center space-y-2 pb-2">
            <p className="text-textColor2 dark:text-darkTextColor2 text-center">
              : السعر
            </p>

            <div className="flex justify-center px-2">
              <div className="text-sm mr-1">ل.س</div>
              <div className="font-bold text-sm">{props.price}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Product;
