import React, { useState } from "react";
import Navbar from "../../components/Navbar";

import ShopBody from "../../components/Shop/ShopBody";

const Shop = () => {
  return (
    <>
      <Navbar />
      <ShopBody shopRoute={true} offersRoute={false} shopIdRoute={false} />
    </>
  );
};

export default Shop;
