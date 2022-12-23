import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Product from "../../components/Shop/Product";
import Classification from "../../components/Shop/Classification";
import PriceClassification from "../../components/Shop/PriceClassification";
import Search from "../../components/Shop/Search";
import { TiArrowSortedDown } from "react-icons/ti";

const ShopProduct = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 px-4 md:px-8 min-h-screen w-full flex flex-col">
        {/* store name */}
        <h3 className="text-center drop-shadow-lg shadow-shadowColor mb-7">
          For_you
        </h3>

        <div className="flex flex-col-reverse md:items-center md:flex-row md:justify-between md:px-0 px-7">
          {/* Search */}
          <Search />
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
              <PriceClassification />
            </div>

            <div className="self-center">: ترتيب حسب </div>
          </div>
        </div>

        {/* line */}
        <div className="flex items-center space-x-3 mt-7">
          <div className="w-1/2 h-[1px] bg-effectColor" />
          <img src="../logo.svg" className="w-20 xs:w-28 h-10" />
          <div className="w-1/2 h-[1px] bg-effectColor" />
        </div>

        <div className="flex justify-evenly flex-wrap pb-10">
          <Product
            img="../product.jpg"
            oimg="../offer.svg"
            fav={true}
            offer={true}
            oPrice="100000"
            nPrice="50000"
            rating="4.5"
          />
          <Product
            img="../product.jpg"
            oimg="../offer.svg"
            fav={false}
            offer={false}
            oPrice=""
            nPrice="200000"
            rating="5.0"
          />
          <Product
            img="../product.jpg"
            oimg="../offer.svg"
            fav={false}
            offer={true}
            oPrice="75000"
            nPrice="40000"
            rating="3.0"
          />
          <Product
            img="../product.jpg"
            oimg="../offer.svg"
            fav={true}
            offer={false}
            oPrice=""
            nPrice="500000"
            rating="2.5"
          />
          <Product
            img="../product.jpg"
            oimg="../offer.svg"
            fav={true}
            offer={true}
            oPrice="500000"
            nPrice="400000"
            rating="2.2"
          />
          <Product
            img="../product.jpg"
            oimg="../offer.svg"
            fav={false}
            offer={false}
            oPrice=""
            nPrice="50000"
            rating="3.9"
          />
          <Product
            img="../product.jpg"
            oimg="../offer.svg"
            fav={true}
            offer={false}
            oPrice=""
            nPrice="50000"
            rating="1.5"
          />
          <Product
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
    </>
  );
};

export default ShopProduct;
