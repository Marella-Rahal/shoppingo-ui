import React from "react";
import Navbar from "../components/Navbar";
import { MdDelete } from "react-icons/md";
import Product from "../components/ShoppingCard/Product";

const ShoppingCard = () => {
  return (
    <>
      <Navbar />
      <div className="pt-32 px-4 md:px-8 min-h-screen flex flex-col justify-between">
        <div className="flex flex-col space-y-7">
          {/* Delete */}
          <div className="flex space-x-2 justify-end items-center cursor-pointer group">
            <span className="text-textColor underline group-hover:scale-[1.1]">
              حذف الكل
            </span>
            <MdDelete className="w-7 h-7 group-hover:scale-[1.1]" />
          </div>

          {/* Product */}

          <div className="flex justify-evenly flex-wrap">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </div>
        </div>

        <div className="my-10 flex justify-between space-x-5">
          <div className="py-2 px-4 rounded-lg shadow-md shadow-shadowColor text-end">
            السعر الكلي : 999999999999 ل.س
          </div>
          <button className="py-2 px-6 hover:scale-[1.1] bg-gradient-to-l from-gradientFrom to-gradientTo">
            شراء
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCard;
