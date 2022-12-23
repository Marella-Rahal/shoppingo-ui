import React from "react";
import { useRouter } from "next/router";

const Seller = (props) => {
  const router = useRouter();
  return (
    <div className="flex justify-end items-center pl-3 py-3 space-x-3 rounded-lg shadow-md shadow-shadowColor mt-6 lg:mr-5 w-full lg:w-[425px] h-[200px]">
      <div className="flex flex-col text-end space-y-2 ">
        <h6
          className="cursor-pointer hover:underline"
          onClick={() => router.push(`/sellers/${props.id}`)}
        >
          {props.name}
        </h6>
        <span className="text-[10px] sm:text-[13px] font-semibold ">
          {props.address}
        </span>
        <span className="text-[10px] sm:text-[13px] font-semibold text-effectColor ">
          {props.dist} - {props.time}
        </span>
      </div>

      <img src="storePhoto.webp" className="w-24 h-24 sm:w-36 sm:h-36" />
    </div>
  );
};

export default Seller;
