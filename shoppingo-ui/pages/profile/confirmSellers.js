import React from "react";
import ConfirmSeller from "../../components/ConfirmSeller/ConfirmSeller";
import Navbar from "../../components/Navbar";

const ConfirmSellers = () => {
  return (
    <>
      <Navbar/>
      <div className="pt-28 md:pt-32 pb-10 w-full min-h-screen flex flex-col space-y-5">
        <ConfirmSeller id="1" email="marellarahhal@gmail.com"/>
        <ConfirmSeller id="2" email="marellarahhal@gmail.com"/>
        <ConfirmSeller id="3" email="marellarahhal@gmail.com"/>
        <ConfirmSeller id="4" email="marellarahhal@gmail.com"/>
      </div>
    </>
  );
};

export default ConfirmSellers;
