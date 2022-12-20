import React, { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { ImHeart } from "react-icons/im";
import RatingPopUp from "../../components/PopUp/RatingPopUp";

const Product = (props) => {
  const [ratingPopUp, setRatingPopUp] = useState(false);
  return (
    <div className="relative">
      <div className="relative flex flex-col space-y-3 mt-10 mr-0 sm:mr-5 pb-3 w-[250px] h-fit rounded-lg shadow-md shadow-shadowColor">
        {/* section 1 */}

        {/* product image */}
        <img
          src={props.img}
          className="w-full h-[270px] rounded-t-lg border-b-2 border-shadowColor/10"
        />

        {/* heart */}
        <ImHeart
          style={props.fav ? { color: "red" } : { color: "#111D4A" }}
          className="absolute left-2 top-0 text-[21px] hover:scale-[1.2] cursor-pointer drop-shadow-lg "
        />

        {/* offer */}
        {props.offer && (
          <img
            src="offer.svg"
            className="absolute w-20 h-20 -top-[29px] -right-[17px]"
          />
        )}

        {/* section 2 */}
        <div className="flex justify-between items-center px-3 h-[40px]">
          <button
            className="rounded-md bg-textColor py-[3px] px-[17px] hover:scale-[1.1]"
            onClick={() => {
              setRatingPopUp(true);
            }}
          >
            تقييم
          </button>
          <div className="flex flex-col ">
            {props.offer && (
              <div className="flex text-[10px] text-textColor2 line-through self-end">
                <div className="mr-1">ل.س</div>
                <div className="font-bold">{props.oPrice}</div>
              </div>
            )}

            <div className="flex text-[14px] text-textColor">
              <div className="mr-1">ل.س</div>
              <div className="font-bold">{props.nPrice}</div>
            </div>
          </div>
        </div>
        {/* section 3 */}
        <div className="flex justify-between items-center px-3">
          <div className="flex space-x-2">
            <BsStarFill className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]" />
            <BsStarFill className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]" />
            <BsStarFill className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]" />
            <BsStarHalf className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]" />
            <BsStar className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]" />
          </div>
          <span className="font-bold">{props.rating}</span>
        </div>
      </div>
      <RatingPopUp ratingPopUp={ratingPopUp} setRatingPopUp={setRatingPopUp} />
    </div>
  );
};

export default Product;
