import React, { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { ImHeart } from "react-icons/im";
import RatingPopUp from "../../components/PopUp/RatingPopUp";
import { useRouter } from "next/router";

const Product = (props) => {
  const router = useRouter();
  // ****************** Stars ***********************
  const [ratingPopUp, setRatingPopUp] = useState(false);
  const [fullStars, setFullStars] = useState([]);
  const [halfStars, setHalfStars] = useState([]);
  const [emptyStars, setEmptyStars] = useState([]);
  useEffect(() => {
    var fullStars = [];
    var halfStars = [];
    var emptyStars = [];
    // full stars
    for (let i = 0; i < Number(props.rating[0]); i++) {
      fullStars.push(1);
    }
    // half stars
    if (Number(props.rating[2]) > 2 && Number(props.rating[2]) < 8) {
      halfStars.push(1);
    } else if (Number(props.rating[2]) >= 8) {
      fullStars.push(1);
    }

    // empty stars
    for (let i = 0; i < 5 - (fullStars.length + halfStars.length); i++) {
      emptyStars.push(1);
    }

    setFullStars(fullStars);
    setHalfStars(halfStars);
    setEmptyStars(emptyStars);
  }, [props.rating]);
  // ****************** Stars ***********************

  return (
    <div dir="ltr">

          {/* //! **********************************************/}
          <div
            className={
              router.asPath == `/productDetail/${router.query.productId}`
                ? "relative flex flex-col space-y-3 ml-5 pb-3 w-[250px] h-fit rounded-lg shadow-md shadow-shadowColor"
                : "relative flex flex-col space-y-3 pb-3 w-[250px] h-fit rounded-lg shadow-md shadow-shadowColor"
            }
          >
                {/* section 1 */}

                {/* product image */}
                <img
                  src={props.img}
                  className="w-full h-[270px] rounded-t-lg border-b-2 border-shadowColor/10 cursor-pointer"
                  onClick={() => router.push(`/productDetail/${props.id}`)}
                />

                {/* heart */}
                <ImHeart
                  style={props.fav ? { color: "red" } : { color: "#111D4A" }}
                  className="absolute left-2 top-0 text-[21px] hover:scale-[1.2] cursor-pointer drop-shadow-lg "
                />

                {/* offer */}
                {props.offer && (
                  <img
                    src={props.oimg}
                    className="absolute w-20 h-20 -top-[29px] -right-[17px]"
                  />
                )}

                {/* section 2 */}
                <div className="flex justify-between items-center px-3 h-[40px]">
                  <button
                    className="rounded-md bg-textColor/90 hover:bg-[#050531] dark:bg-gradient-to-l dark:from-gradientFrom dark:to-gradientTo dark:hover:bg-gradient-to-b py-[3px] px-[17px]"
                    onClick={() => {
                      setRatingPopUp(true);
                    }}
                  >
                    تقييم
                  </button>
                  <div className="flex flex-col ">
                    {props.offer && (
                      <div className="flex text-[10px] text-textColor2 dark:text-darkTextColor2 line-through self-end">
                        <div className="mr-1">ل.س</div>
                        <div className="font-bold">{props.oPrice}</div>
                      </div>
                    )}
                    <div className="flex text-[15px] self-end text-textColor dark:text-darkTextColor">
                      <div className="mr-1">ل.س</div>
                      <div className="font-bold">{props.nPrice}</div>
                    </div>
                  </div>
                </div>
                {/* section 3 */}
                <div className="flex justify-between items-center px-3">
                  <div className="flex space-x-2">
                    {fullStars.map((x, id) => (
                      <BsStarFill
                        key={id}
                        className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]"
                      />
                    ))}

                    {halfStars.map((x, id) => (
                      <BsStarHalf
                        key={id}
                        className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]"
                      />
                    ))}

                    {emptyStars.map((x, id) => (
                      <BsStar
                        key={id}
                        className="text-yellow-400 text-2xl drop-shadow-lg hover:scale-[1.1]"
                      />
                    ))}
                  </div>
                  <span className="font-bold dark:text-yellow-400">{props.rating}</span>
                </div>
                <RatingPopUp ratingPopUp={ratingPopUp} setRatingPopUp={setRatingPopUp} />
                
          </div>
          {/* //! **********************************************/}

    </div>
  );
};

export default Product;
