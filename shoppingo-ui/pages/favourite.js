import React from "react";
import Navbar from "../components/Navbar";
import Product from "../components/Shop/Product";
const Favourite = () => {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pt-28 pb-14 px-4 md:px-8 flex justify-evenly flex-wrap">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </>
  );
};

export default Favourite;
