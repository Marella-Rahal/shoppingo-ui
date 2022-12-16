import React from "react";
import Navbar from "../../components/Navbar";
import Product from "../../components/Shop/Product";
import { BiSearchAlt2 } from "react-icons/bi";
import { TiArrowSortedDown } from "react-icons/ti";
import Classification from "../../components/Shop/Classification";

const Index = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-28 px-4 md:px-8 pb-14 flex flex-col space-y-5">
        {/* Search and classification */}
        <div className="flex flex-col-reverse md:items-center md:flex-row md:justify-between md:px-0 px-7">
          {/* Search */}
          <div className="flex mt-5 md:mt-0 ">
            <label className="bg-white rounded-l-full shadow-sm shadow-shadowColor cursor-pointer px-2 py-[5px] text-textColor flex justify-center items-center">
              <BiSearchAlt2 className="w-[20px] h-[20px]" />
            </label>
            <input
              type="text"
              className="w-full md:w-[230px] rounded-r-full shadow-sm shadow-shadowColor outline-textColor/50 px-3 py-[5px] text-textColor text-end"
            />
          </div>
          {/* Classification */}
          <div className="flex flex-col-reverse md:flex-row md:space-x-3 md:items-center">
            {/* woman */}
            <div className="relative z-10 flex flex-col group">
              <button className="flex justify-between items-center py-2 px-3 group-hover:bg-effectColor/90 mt-5 md:mt-0">
                <TiArrowSortedDown className="mr-1 w-5 h-5" /> نسائي
              </button>

              <TiArrowSortedDown className="hidden absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-effectColor/80 w-7 h-7 group-hover:flex" />

              <Classification woman={true} />
            </div>

            {/* man */}
            <div className="relative z-10 flex flex-col group">
              <button className="flex justify-between items-center py-2 px-3 group-hover:bg-effectColor/90 mt-5 md:mt-0">
                <TiArrowSortedDown className="mr-1 w-5 h-5" />
                رجالي
              </button>

              <TiArrowSortedDown className="hidden absolute  top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-effectColor/80 w-7 h-7 group-hover:flex" />

              <Classification woman={false} />
            </div>

            {/* price */}
            <div className="relative z-10 flex flex-col group">
              <button className="flex justify-between items-center py-2 px-3 group-hover:bg-effectColor/90 mt-5 md:mt-0">
                <TiArrowSortedDown className="mr-1 w-5 h-5" />
                السعر
              </button>

              <TiArrowSortedDown className="hidden absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-effectColor/80 w-7 h-7 group-hover:flex" />

              {/* drop down */}
              <div className="absolute top-[70px] left-[1px] md:top-[50px] md:-left-[47px] bg-white rounded-lg shadow-md shadow-shadowColor w-[190px] flex-col hidden group-hover:flex text-sm font-bold">
                <div className="text-textColor rounded-t-lg border-b-2 border-shadowColor/20 hover:bg-textColor hover:text-white p-2 text-center cursor-pointer">
                  من المنخفض إلى المرتفع
                </div>
                <div className="text-textColor border-b-2 border-shadowColor/20 hover:bg-textColor hover:text-white p-2 text-center cursor-pointer">
                  من المرتفع إلى المنخفض
                </div>
                <div className="text-textColor hover:bg-textColor hover:text-white rounded-b-lg p-2 flex flex-col space-y-2">
                  <div className="text-center">من</div>
                  <input
                    type="number"
                    placeholder="20000"
                    className="rounded-full text-textColor shadow-md shadow-shadowColor outline-none py-1 px-5 ring-2 ring-textColor/80"
                  />
                  <div className="text-center">إلى</div>
                  <input
                    type="number"
                    placeholder="100000"
                    className="rounded-full text-textColor shadow-md shadow-shadowColor outline-none py-1 px-5 ring-2 ring-textColor/80"
                  />
                  <div className="rounded-lg shadow-md shadow-shadowColor bg-white text-textColor border-2 border-textColor self-center px-5 py-1 hover:scale-[1.1] cursor-pointer">
                    رتب
                  </div>
                </div>
              </div>
              {/* the end of it */}
            </div>

            <div className="self-center">: ترتيب حسب </div>
          </div>
        </div>

        <div className="flex justify-evenly flex-wrap">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </>
  );
};

export default Index;
