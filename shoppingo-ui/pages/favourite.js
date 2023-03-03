import React from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Shop/Product";
const Favourite = () => {
  return (
    <>
      <Navbar/>
      <div className="w-full min-h-screen pt-28 pb-14 px-4 md:px-8 flex justify-evenly flex-wrap">
        <Product
          img="product.jpg"
          oimg="offer.svg"
          fav={true}
          offer={true}
          oPrice="100000"
          nPrice="50000"
          rating="4.5"
        />
        <Product
          img="product.jpg"
          oimg="offer.svg"
          fav={true}
          offer={false}
          oPrice=""
          nPrice="200000"
          rating="5.0"
        />
        <Product
          img="product.jpg"
          oimg="offer.svg"
          fav={true}
          offer={true}
          oPrice="75000"
          nPrice="40000"
          rating="3.0"
        />
        <Product
          img="product.jpg"
          oimg="offer.svg"
          fav={true}
          offer={false}
          oPrice=""
          nPrice="500000"
          rating="2.5"
        />
        <Product
          img="product.jpg"
          oimg="offer.svg"
          fav={true}
          offer={true}
          oPrice="500000"
          nPrice="400000"
          rating="2.0"
        />
        <Product
          img="product.jpg"
          oimg="offer.svg"
          fav={true}
          offer={false}
          oPrice=""
          nPrice="50000"
          rating="1.5"
        />
      </div>
    </>
  );
};

export default Favourite;
