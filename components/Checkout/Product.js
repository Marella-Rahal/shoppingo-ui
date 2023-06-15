import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import {AnimatePresence, motion} from 'framer-motion';

const Product = (props) => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">

      <motion.div
      key={props.id}
      initial={{opacity:0,scale:0}} 
      animate={{opacity:1,scale:1}} 
      exit={{opacity:0,scale:0}}
      transition={{ease:'easeInOut',duration:0.7}} 
      dir="ltr">

        <div className="relative flex flex-col w-[200px] rounded-md shadow-sm shadow-shadowColor font-bold text-[13px] ml-5">

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

      </motion.div>

    </AnimatePresence>
    
  );
};

export default Product;
