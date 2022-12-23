import React from "react";
import Navbar from "../../components/Navbar";
import Seller from "../../components/Sellers/Seller";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
const Sellers = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 pb-10 w-full min-h-screen px-4 md:px-8 flex flex-col space-y-2">
        {/* Search */}
        <div className="flex self-center h-[37px]">
          <label className="bg-white rounded-l-full shadow-sm shadow-shadowColor cursor-pointer px-2 py-[5px] text-textColor flex justify-center items-center">
            <BiSearchAlt2 className="w-[20px] h-[20px] hover:scale-[1.1]" />
          </label>
          <input
            type="text"
            placeholder="اسم المحل"
            className="w-full md:w-[230px] rounded-r-full shadow-sm shadow-shadowColor outline-none focus:border-2 border-effectColor/50  px-3 py-[5px] text-textColor text-end"
          />
        </div>

        {/* stores */}
        <div className="flex justify-evenly flex-wrap pb-10">
          <Seller
            id="1"
            name="For_you"
            address="  مدرسة عكرمة مدرسة عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time=" ساعتان مشي"
          />
          <Seller
            id="2"
            name="For_you"
            address="مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time="1000000000000000000 ساعة مشي"
          />
          <Seller
            id="3"
            name="For_you"
            address="مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time="100000 ساعة مشي"
          />
          <Seller
            id="4"
            name="For_you"
            address="مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time=" ساعة مشي"
          />
          <Seller
            id="5"
            name="For_you"
            address="مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time="ساعات مشي 10 "
          />
          <Seller
            id="6"
            name="For_you"
            address="مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسعكرمة مدرسة عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time="مليون ساعة مشي"
          />
          <Seller
            id="7"
            name="For_you"
            address="مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة عكرمة مدرسة  مدرسة عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time=" ساعة مشي"
          />
          <Seller
            id="8"
            name="For_you"
            address="مدرسة عكرمة مدرسة عكرمة مدرسة  عكرمة"
            dist="يبعد 1000 متر من موقعك "
            time="1000 ساعة مشي"
          />
        </div>

        {/* Map */}
        <div className="flex space-x-2 self-center">
          <Link
            href="/"
            className="underline hover:scale-[1.1] text-effectColor"
          >
            هنا
          </Link>
          <span>لرؤية موقع المتاجر اضغط </span>

          <FaMapMarkerAlt className="text-effectColor self-center" />
        </div>
      </div>
    </>
  );
};

export default Sellers;
