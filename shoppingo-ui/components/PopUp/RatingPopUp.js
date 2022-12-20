import React from "react";

const RatingPopUp = (props) => {
  return (
    <>
      <div
        className={
          props.ratingPopUp
            ? "absolute top-[35%] opacity-100 duration-300 ease-linear w-[250px] p-5 px-[17px] bg-bgColor rounded-lg shadow-md shadow-shadowColor flex flex-col space-y-5 items-center"
            : "absolute top-[52%] opacity-0 duration-300 ease-linear w-[250px] p-5 px-[17px] bg-bgColor rounded-lg shadow-md shadow-shadowColor flex flex-col space-y-5 items-center"
        }
      >
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          disabled={!props.ratingPopUp ? true : false}
          placeholder="3.5"
          className="px-2 rounded-md shadow-md shadow-shadowColor w-full outline-none border-yellow-400 focus:border-2"
        />
        <div className="flex space-x-3">
          <button
            className="bg-yellow-400 w-[75px] hover:bg-yellow-300 hover:scale-[1.1]"
            disabled={!props.ratingPopUp ? true : false}
            onClick={() => props.setRatingPopUp(false)}
          >
            إغلاق
          </button>
          <button
            className="bg-yellow-400 w-[75px] hover:bg-yellow-300 hover:scale-[1.1] "
            disabled={!props.ratingPopUp ? true : false}
            onClick={() => props.setRatingPopUp(false)}
          >
            تقييم
          </button>
        </div>
      </div>
    </>
  );
};

export default RatingPopUp;
