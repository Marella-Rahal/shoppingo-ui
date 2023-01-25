import React from "react";
import ConfirmSeller from "../../components/ConfirmSeller/ConfirmSeller";
import Navbar from "../../components/Navbar";

const ConfirmSellers = () => {
  return (
    <>
      <Navbar/>
      <div className="pt-28 md:pt-32 pb-10 w-full min-h-screen flex flex-col space-y-5">
        <ConfirmSeller />
        <ConfirmSeller />
        <ConfirmSeller />
        <ConfirmSeller />
      </div>
    </>
  );
};

export default ConfirmSellers;
