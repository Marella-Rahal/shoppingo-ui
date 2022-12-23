import React from "react";
import Navbar from "../../components/Navbar";
import Product from "../../components/Shop/Product";
const ShopProduct = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 px-4 md:px-8 min-h-screen w-full flex flex-col space-y-3">
        {/* store name */}
        <h3 className="text-center">For_you</h3>

        <div className="flex justify-evenly flex-wrap pb-10">
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
            fav={true}
            offer={true}
            oPrice="100000"
            nPrice="50000"
            rating="4.5"
          />
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
            fav={false}
            offer={false}
            oPrice=""
            nPrice="200000"
            rating="5.0"
          />
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
            fav={false}
            offer={true}
            oPrice="75000"
            nPrice="40000"
            rating="3.0"
          />
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
            fav={true}
            offer={false}
            oPrice=""
            nPrice="500000"
            rating="2.5"
          />
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
            fav={true}
            offer={true}
            oPrice="500000"
            nPrice="400000"
            rating="2.2"
          />
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
            fav={false}
            offer={false}
            oPrice=""
            nPrice="50000"
            rating="3.9"
          />
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
            fav={true}
            offer={false}
            oPrice=""
            nPrice="50000"
            rating="1.5"
          />
          <Product
            img="../../public/product.jpg"
            oimg="../../public/offer.svg"
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
