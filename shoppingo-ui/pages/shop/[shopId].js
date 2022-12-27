import React from "react";
import Navbar from "../../components/Navbar";
import ShopBody from "../../components/Shop/ShopBody";

const ShopProduct = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-4 md:px-8 min-h-screen w-full flex flex-col">
        {/* store name */}
        <h3 className="text-center drop-shadow-lg shadow-shadowColor">
          For_you
        </h3>

        <ShopBody shopRoute={false} offersRoute={false} shopIdRoute={true} />
      </div>
    </>
  );
};

export default ShopProduct;
