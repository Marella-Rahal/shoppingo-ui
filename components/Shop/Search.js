import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const Search = () => {
  return (
    <div className="flex mt-5 md:mt-0">
      <label className="bg-white rounded-l-full shadow-sm shadow-shadowColor cursor-pointer px-2 py-[5px] text-textColor flex justify-center items-center">
        <BiSearchAlt2 className="w-[20px] h-[20px] hover:scale-[1.1]" />
      </label>
      <input
        type="text"
        className="w-full md:w-[230px] rounded-r-full shadow-sm shadow-shadowColor outline-none border-2 border-transparent focus:border-effectColor dark:focus:border-darkTextColor2  px-3 py-[5px] text-textColor text-end"
      />
    </div>
  );
};

export default Search;
