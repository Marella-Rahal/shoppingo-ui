import React from "react";
import Product from "./Product";
import { TiArrowSortedDown } from "react-icons/ti";
import Classification from "./Classification";
import PriceClassification from "./PriceClassification";
import Search from "./Search";

const ShopBody = ({ shopRoute, offersRoute, shopIdRoute }) => {
  return (
    <div
      className={
        shopIdRoute
          ? "flex flex-col"
          : "w-full min-h-screen pt-28 px-4 md:px-8 pb-14 flex flex-col"
      }
    >
      {/* Search and classification */}
      <div className="flex flex-col-reverse md:items-center md:flex-row md:justify-between md:px-0 px-7">
        {/* Search */}
        <Search />
        {/* Classification */}
        <div className="flex flex-col-reverse md:flex-row md:space-x-3 md:items-center">
          {/* woman */}
          <div className="relative z-10 flex flex-col group">
            <button className="flex justify-between items-center py-2 px-3 group-hover:bg-[#bb0202] mt-5 md:mt-0">
              <TiArrowSortedDown className="mr-1 w-5 h-5" /> نسائي
            </button>

            <TiArrowSortedDown className="hidden absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] w-7 h-7 group-hover:flex" />

            <Classification woman={true} />
          </div>

          {/* man */}
          <div className="relative z-10 flex flex-col group">
            <button className="flex justify-between items-center py-2 px-3 group-hover:bg-[#bb0202] mt-5 md:mt-0">
              <TiArrowSortedDown className="mr-1 w-5 h-5" />
              رجالي
            </button>

            <TiArrowSortedDown className="hidden absolute  top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] w-7 h-7 group-hover:flex" />

            <Classification woman={false} />
          </div>

          {/* price */}
          <div className="relative z-10 flex flex-col group">
            <button className="flex justify-between items-center py-2 px-3 group-hover:bg-[#bb0202] mt-5 md:mt-0">
              <TiArrowSortedDown className="mr-1 w-5 h-5" />
              السعر
            </button>

            <TiArrowSortedDown className="hidden absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] w-7 h-7 group-hover:flex" />

            {/* drop down */}
            <PriceClassification />
          </div>

          <div className="self-center">: ترتيب حسب </div>
        </div>
      </div>

      {/* line */}
      <div className="flex items-center space-x-3 mt-10 mb-14">
        <div className="w-1/2 h-[1px] bg-effectColor" />
        <img src="../logo.svg" className="w-20 xs:w-28 h-10" />
        <div className="w-1/2 h-[1px] bg-effectColor" />
      </div>

      <div className="flex justify-evenly flex-wrap gap-x-5 gap-y-10">
        <Product
          id="1"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={true}
          offer={true}
          oPrice="100000"
          nPrice="50000"
          rating="4.5"
        />
        <Product
          id="2"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={false}
          offer={false}
          oPrice=""
          nPrice="200000"
          rating="5.0"
        />
        <Product
          id="3"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={false}
          offer={true}
          oPrice="75000"
          nPrice="40000"
          rating="3.0"
        />
        <Product
          id="4"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={true}
          offer={false}
          oPrice=""
          nPrice="500000"
          rating="2.5"
        />
        <Product
          id="5"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={true}
          offer={true}
          oPrice="500000"
          nPrice="400000"
          rating="2.0"
        />
        <Product
          id="6"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={false}
          offer={false}
          oPrice=""
          nPrice="50000"
          rating="3.0"
        />
        <Product
          id="7"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={true}
          offer={false}
          oPrice=""
          nPrice="50000"
          rating="1.5"
        />
        <Product
          id="8"
          img="../product.jpg"
          oimg="../offer.svg"
          fav={false}
          offer={false}
          oPrice=""
          nPrice="50000"
          rating="0.5"
        />
      </div>
    </div>
  );
};

export default ShopBody;
