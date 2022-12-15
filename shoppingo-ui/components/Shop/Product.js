import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { ImHeart } from "react-icons/im";

const Product = () => {
  return (
    <div className="relative flex flex-col space-y-3 mt-14 mr-2 sm:mr-5 pb-3 w-[250px] h-fit rounded-lg shadow-md shadow-shadowColor">
      <ImHeart
        style={{ color: "red" }}
        className="absolute left-2 top-2 text-xl hover:scale-[1.2] cursor-pointer"
      />
      <img
        src="offer.svg"
        className="absolute w-20 h-20 -top-[29px] -right-[17px]"
      />
      {/* section 1 */}
      <img
        src="home.svg"
        className="w-full h-[260px] border-b-2 border-shadowColor/20"
      />
      {/* section 2 */}
      <div className="flex justify-between items-center px-3">
        <button className="rounded-md bg-textColor py-[3px] px-[17px] hover:scale-[1.1]">
          تقييم
        </button>
        <div className="flex">
          <div className="text-sm mr-1">ل.س</div>
          <div className="font-bold text-sm">1000000000</div>
        </div>
      </div>
      {/* section 3 */}
      <div className="flex justify-between items-center px-3">
        <div className="flex space-x-2">
          <BsStarFill className="text-yellow-400 text-2xl" />
          <BsStarFill className="text-yellow-400 text-2xl" />
          <BsStarFill className="text-yellow-400 text-2xl" />
          <BsStarHalf className="text-yellow-400 text-2xl" />
          <BsStar className="text-2xl" />
        </div>
        <span className="font-bold">3.5</span>
      </div>
    </div>
  );
};

export default Product;
