import React from "react";

const PriceClassification = () => {
  return (
    <div className="absolute top-[70px] left-[1px] md:top-[50px] md:-left-[47px] bg-white rounded-lg shadow-md shadow-shadowColor w-[190px] flex-col hidden group-hover:flex text-sm font-bold">
      <div className="text-textColor rounded-t-lg border-b-2 border-shadowColor/20 hover:bg-textColor hover:text-white dark:hover:bg-darkBgColor p-2 text-center cursor-pointer">
        من المنخفض إلى المرتفع
      </div>
      <div className="text-textColor border-b-2 border-shadowColor/20 hover:bg-textColor hover:text-white dark:hover:bg-darkBgColor p-2 text-center cursor-pointer">
        من المرتفع إلى المنخفض
      </div>
      <div className="text-textColor hover:bg-textColor hover:text-white dark:hover:bg-darkBgColor rounded-b-lg p-2 flex flex-col space-y-2">
        <div className="text-center">من</div>
        <input
          type="number"
          placeholder="20000"
          className="rounded-full text-textColor shadow-md shadow-shadowColor outline-none py-1 px-5"
        />
        <div className="text-center">إلى</div>
        <input
          type="number"
          placeholder="100000"
          className="rounded-full text-textColor shadow-md shadow-shadowColor outline-none py-1 px-5"
        />
        <div className="rounded-lg shadow-md shadow-shadowColor bg-white text-textColor  self-center px-5 py-1 hover:scale-[1.1] cursor-pointer">
          رتب
        </div>
      </div>
    </div>
  );
};

export default PriceClassification;
