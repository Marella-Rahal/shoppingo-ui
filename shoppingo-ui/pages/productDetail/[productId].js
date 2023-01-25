import React, { useEffect, useRef, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Sizes from "../../components/ProductDetail/Sizes";
import Colors from "../../components/ProductDetail/Colors";
import Product from "../../components/Shop/Product";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";
import usePosition from "../../hooks/usePosition";
import Navbar from "../../components/Navbar";
const Map = dynamic(() => import("../../components/Map/Map"), {
  loading: () => <Loading />,
  ssr: false,
});

//***********The product images****************/
const images = ["../../product.jpg", "../../product1.jpg"];
//*********************************************/

const ProductId = () => {
  //* for the foreground and background image
  const [imgUrl, setImgUrl] = useState(images[0]);
  //* to display and hidden detail
  const [showDescription, setShowDescription] = useState(true);
  const [showSizes, setShowSizes] = useState(true);
  const [showQty, setShowQty] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  //! to set constraint on how much i can drag the slider to the left
  const [width, setWidth] = useState(0);
  const slider = useRef();
  useEffect(() => {
    setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
  }, []);
  //! **************************************************

  //todo *********** the massage for the popUp
  const [noteMsg, setNoteMsg] = useState("");
  //todo ********** the location of the user
  const [coords, error] = usePosition();
  useEffect(() => {
      if (error) {
        setNoteMsg(
          <>
            <h5 className="text-effectColor text-center">
              فشلنا في الحصول على موقعك لذلك سيتم تعطيل بعض الميزات التي تتطلب
              الموقع ضمن هذه الصفحة أو أعد تحميل الصفحة للمحاولة مرة أخرى
            </h5>
          </>
        );
        showPopUpNote();
      }
  }, [error])
  return (
    <>
      <NotePopUp noteMsg={noteMsg} />
      <Navbar/>
      <div className="w-full min-h-screen pt-24 pb-10 px-4 md:px-8 flex flex-col space-y-5">
        {/* section 1 */}
        <div className="flex flex-col-reverse md:flex-row md:space-x-7">
          {/* Map */}
          <div
            // style={{ boxShadow: "5px 5px 20px 7px rgba(0,0,0,0.15)" }}
            className="w-full md:w-1/2 lg:w-2/3 h-[500px] md:h-auto rounded-lg mt-10 md:mt-0 shadow-mapShadow dark:shadow-darkMapShadow"
          >
            {coords.length > 0 && <Map coords={coords} sellerRoute={false} />}
          </div>

          {/* product detail */}
          <div className="w-full md:w-1/2 lg:w-1/3 h-fit flex flex-col space-y-3">
            {/* product image */}
            <div className="flex flex-col-reverse md:flex-row  md:justify-around">
              {/* Add to cart  */}
              <button className="self-center flex items-center justify-center flex-wrap-reverse rounded-md hover:scale-[1.1] mt-5 md:mt-0 mr-0 md:mr-3 p-2">
                <HiShoppingCart className="mr-2" />
                أضف إلى
              </button>

              {/* img */}
              <div
                style={{ backgroundImage: `url(${imgUrl})` }}
                className="relative self-center w-[240px] h-[260px] bg-center bg-cover rounded-xl shadow-md shadow-shadowColor"
              >
                <MdOutlineArrowBackIos
                  style={{ boxShadow: "0px 0px 5px 3px rgba(255,255,255,1)" }}
                  className="absolute top-[45%] cursor-pointer hover:scale-[1.1] text-xl bg-bgColor/70 text-effectColor"
                  onClick={() => setImgUrl(images[0])}
                />
                <MdOutlineArrowForwardIos
                  style={{ boxShadow: "0px 0px 5px 3px rgba(255,255,255,1)" }}
                  className="absolute top-[45%] right-0  cursor-pointer hover:scale-[1.1] text-xl bg-bgColor/70 text-effectColor"
                  onClick={() => setImgUrl(images[1])}
                />
              </div>
            </div>

            {/* description */}
            <div className="border-b-[1px] border-textColor dark:border-darkTextColor flex justify-between">
              {!showDescription && (
                <MdOutlineKeyboardArrowDown
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowDescription(true)}
                />
              )}

              {showDescription && (
                <MdOutlineKeyboardArrowUp
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowDescription(false)}
                />
              )}
              <span className="font-semibold">الوصف</span>
            </div>
            {showDescription && (
              <div className="text-end text-textColor2 dark:text-darkTextColor2">
                Adipisicing eiusmod et consequat tempor magna. Quis dolor aute
                ut fugiat dolore ipsum incididunt dolore ea est. Labore
                excepteur do ut sit anim laboris velit voluptate sit dolor magna
                elit tempor.
              </div>
            )}

            {/* sizes */}
            <div className="border-b-[1px] border-textColor dark:border-darkTextColor flex justify-between">
              {!showSizes && (
                <MdOutlineKeyboardArrowDown
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowSizes(true)}
                />
              )}

              {showSizes && (
                <MdOutlineKeyboardArrowUp
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowSizes(false)}
                />
              )}
              <span className="font-semibold">القياسات</span>
            </div>
            {showSizes && (
              <div className="flex space-x-4 flex-wrap justify-end">
                <Sizes size="s" />
                <Sizes size="m" />
                <Sizes size="l" />
                <Sizes size="xl" />
                <Sizes size="2xl" />
                <Sizes size="3xl" />
                <Sizes size="4xl" />
                <Sizes size="5xl" />
                <Sizes size="6xl" />
              </div>
            )}

            {/* Quantity */}
            <div className="border-b-[1px] border-textColor dark:border-darkTextColor flex justify-between">
              {!showQty && (
                <MdOutlineKeyboardArrowDown
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowQty(true)}
                />
              )}

              {showQty && (
                <MdOutlineKeyboardArrowUp
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowQty(false)}
                />
              )}

              <span className="font-semibold">الكمية</span>
            </div>
            {showQty && <div className="text-end text-textColor2 dark:text-darkTextColor2">1000</div>}

            {/* colors */}
            <div className="border-b-[1px] border-textColor dark:border-darkTextColor flex justify-between">
              {!showColors && (
                <MdOutlineKeyboardArrowDown
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowColors(true)}
                />
              )}

              {showColors && (
                <MdOutlineKeyboardArrowUp
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowColors(false)}
                />
              )}
              <span className="font-semibold">الألوان</span>
            </div>
            {showColors && (
              <div className="flex space-x-3 flex-wrap justify-end">
                <Colors color="red" />
                <Colors color="blue" />
                <Colors color="yellow" />
                <Colors color="green" />
                <Colors color="white" />
                <Colors color="grey" />
                <Colors color="#fff8f0" />
                <Colors color="black" />
                <Colors color="#111d4a" />
                <Colors color="#d7271a" />
                <Colors color="red" />
                <Colors color="blue" />
                <Colors color="yellow" />
                <Colors color="green" />
                <Colors color="white" />
              </div>
            )}

            {/* price and location */}
            <div className="border-b-[1px] border-textColor dark:border-darkTextColor flex justify-between">
              {!showPrice && (
                <MdOutlineKeyboardArrowDown
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowPrice(true)}
                />
              )}

              {showPrice && (
                <MdOutlineKeyboardArrowUp
                  className="text-2xl cursor-pointer hover:scale-[1.1]"
                  onClick={() => setShowPrice(false)}
                />
              )}
              <span className="font-semibold">السعر والعنوان</span>
            </div>

            {showPrice && (
              <div className="flex flex-col space-y-2">
                {/* new price and old price */}
                <div className="flex space-x-3 flex-wrap justify-end">
                  <span className="mt-2 flex">
                    <span className="mr-2">ل.س</span>
                    500000
                  </span>
                  <span className="mt-2 flex line-through text-textColor2 dark:text-darkTextColor2">
                    <span className="mr-2">ل.س</span>
                    700000
                  </span>
                </div>
                {/* Shop Name */}
                <div className="text-textColor2 dark:text-darkTextColor2 text-end">For_you</div>

                {/* Address */}
                <div className="text-textColor2 dark:text-darkTextColor2 text-end">
                  حمص-شارع الحضارة-مقابل الإطفائية
                </div>
              </div>
            )}
          </div>
        </div>
        {/* line */}
        <div className="flex items-center space-x-3 mt-7">
          <div className="w-1/2 h-[1px] bg-textColor dark:bg-darkTextColor" />
          <div className="w-20 xs:w-28 h-10 text-sm font-semibold flex justify-center items-center text-center">
            منتجات مشابهة
          </div>
          <div className="w-1/2 h-[1px] bg-textColor dark:bg-darkTextColor" />
        </div>
        {/* other Product */}
        {/* //! slider with framer motion */}
        <motion.div
          ref={slider}
          // style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
          className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-textColor dark:border-darkTextColor2 shadow-mapShadow dark:shadow-darkMapShadow"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex "
          >
            <Product
              id="1"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={true}
              offer={true}
              oPrice="100000"
              nPrice="50000"
              rating="4.5"
            />
            <Product
              id="2"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={false}
              offer={false}
              oPrice=""
              nPrice="200000"
              rating="5.0"
            />
            <Product
              id="3"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={false}
              offer={true}
              oPrice="75000"
              nPrice="40000"
              rating="3.0"
            />
            <Product
              id="4"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={true}
              offer={false}
              oPrice=""
              nPrice="500000"
              rating="2.5"
            />
            <Product
              id="5"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={true}
              offer={true}
              oPrice="500000"
              nPrice="400000"
              rating="2.2"
            />
            <Product
              id="6"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={false}
              offer={false}
              oPrice=""
              nPrice="50000"
              rating="3.9"
            />
            <Product
              id="7"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={true}
              offer={false}
              oPrice=""
              nPrice="50000"
              rating="1.5"
            />
            <Product
              id="8"
              img="../product.jpg"
              oimg="../offer.svg"
              fav={false}
              offer={false}
              oPrice=""
              nPrice="50000"
              rating="0.5"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ProductId;
