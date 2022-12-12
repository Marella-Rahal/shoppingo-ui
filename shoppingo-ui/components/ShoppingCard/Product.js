import Link from "next/link";
import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Product = () => {
  return (
    <div className="relative flex flex-col w-[275px] rounded-md shadow-lg shadow-shadowColor mt-14 mr-2 sm:mr-5">
      <div className="absolute -top-5 -right-4 w-9 h-9 rounded-full bg-textColor border-[3px] border-white shadow-md shadow-shadowColor flex justify-center items-center hover:scale-[1.1] cursor-pointer">
        <AiOutlineClose className="text-white w-6 h-6" />
      </div>
      {/* Product Image */}
      <img
        src="home.svg"
        className="w-full h-[200px] rounded-t-md border-b-2 border-shadowColor/20"
      />

      {/* Store Name - view on map */}
      <div className="flex flex-col justify-center w-full h-[60px] border-b-2 border-shadowColor/20">
        <p className="text-center font-bold">For_you</p>
        <Link
          href="/"
          className="text-center underline text-textColor2 hover:scale-[1.1]"
        >
          اذهب إلى الخريطة
        </Link>
      </div>

      {/* Size and Color */}

      <div className="flex w-full h-[60px] border-b-2 border-shadowColor/20">
        <div className="w-1/2 px-3 flex justify-between items-center border-r-2 border-shadowColor/20">
          <span className="font-bold uppercase">xxl</span>
          <p>: القياس</p>
        </div>
        <div className="w-1/2 px-3 flex justify-between items-center">
          <div className="w-6 h-6 rounded-full bg-red-700 shadow-md shadow-shadowColor" />
          <p>: اللون</p>
        </div>
      </div>

      {/* Price and Quantity */}
      <div className="flex w-full h-[85px] rounded-b-md">
        {/* Quantity */}
        <div className="w-1/2 border-r-2 border-shadowColor/20 flex flex-col justify-center space-y-2">
          <p className="text-textColor2 text-center">: الكمية</p>

          <div className="flex justify-between px-2">
            <div className="w-6 h-6 rounded-full shadow-md flex items-center justify-center shadow-shadowColor bg-textColor2 border-[3px] border-white cursor-pointer hover:scale-[1.1]">
              <FaMinus className="text-white" />
            </div>

            <div className="font-bold">10000</div>

            <div className="w-6 h-6 rounded-full shadow-md flex items-center justify-center shadow-shadowColor bg-textColor2 border-[3px] border-white cursor-pointer hover:scale-[1.1]">
              <FaPlus className="text-white" />
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="w-1/2 flex flex-col justify-center items-center space-y-1">
          <p className="text-textColor2">: السعر</p>

          <div className="flex flex-row-reverse">
            <div className="font-bold text-sm">100000000</div>
            <div className="text-center text-sm mr-1">ل.س</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
