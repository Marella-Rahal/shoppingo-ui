import React from "react";
import Navbar from "../components/Navbar";
import ShopBody from "../components/Shop/ShopBody";

const Offers = () => {
  return (
    <>
      <Navbar />
      <ShopBody shopRoute={false} offersRoute={true} shopIdRoute={false} />
    </>
  );
};

export default Offers;
