import React from "react";

const ConfirmSeller = () => {
  return (
    <>
      <div className="mx-4 md:mx-8 px-4 rounded-xl bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 flex flex-col-reverse items-center md:flex-row md:justify-between">
        <div className="flex space-x-3 py-8">
          <button className="bg-white hover:bg-white text-effectColor py-2 px-5 xs:px-10 hover:scale-[1.1] shadow-none">
            رفض
          </button>
          <button className="bg-white hover:bg-white text-effectColor py-2 px-5 xs:px-10 hover:scale-[1.1] shadow-none ">
            قبول
          </button>
        </div>

        <div className="font-bold text-white md xs:text-xl py-8">
          marellarahhal@gmail.com
        </div>
      </div>
    </>
  );
};

export default ConfirmSeller;
