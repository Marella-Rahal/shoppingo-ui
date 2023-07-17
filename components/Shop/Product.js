import React, { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { ImHeart } from "react-icons/im";
import RatingPopUp from "../../components/PopUp/RatingPopUp";
import { useRouter } from "next/router";
import { useTheme } from 'next-themes';
import {AnimatePresence, motion} from 'framer-motion';
import Image from "next/image";
import { parseCookies } from "nookies";
import { showPopUpNote } from "../PopUp/NotePopUp";


const Product = (props) => {
  const router = useRouter();
  const cookies =parseCookies();
  const token = cookies.token;
  const { theme , setTheme }=useTheme();
  const [oImg,setOImg]=useState('');
  useEffect(()=>{

    if(theme == 'dark'){
        setOImg('../darkOffer.svg')
    }else{
      setOImg('../offer.svg')
    }

  },[theme])
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
    <AnimatePresence mode="wait">

        <motion.div 
        key={props.id}
        initial={{opacity:0,scale:0.8}} 
        animate={{opacity:1,scale:1}} 
        exit={{opacity:0,scale:0.8}}
        transition={{ease:'easeInOut',duration:0.5}} 
        dir="ltr">

          <div
            className="relative flex flex-col space-y-3 pb-3 w-[250px] h-fit rounded-lg shadow-sm shadow-shadowColor m-5"
          >
                {/* section 1 */}

                {/* product image */}
                <Image
                src={props.img}
                placeholder="blur"
                blurDataURL={props.img}
                loading="lazy"
                width={250}
                height={270}
                className="w-full h-[270px] rounded-t-lg border-b-2 border-shadowColor/10 cursor-pointer"
                onClick={() => router.push( { pathname : '/productDetail' , query : {productId : props.id} } )}
                />

                {/* heart */}
                <ImHeart
                  className={`absolute left-[8px] -top-[4px] text-[35px] shadow-mapShadow rounded-full px-[8px] hover:scale-[1.1] cursor-pointer ${props.fav ?'text-[red]':'text-bgColor'}`}
                />

                {/* offer */}
                {props.offer && (
                  <img
                    src={oImg}
                    className="absolute w-20 h-20 -top-[29px] -right-[17px]"
                  />
                )}

                {/* section 2 */}
                <div className={`flex justify-between items-center px-3 h-[40px]`}>
                  
                  <button
                    className="rounded-md bg-textColor/90 hover:bg-[#050531] dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl py-[3px] px-[17px]"
                    onClick={() => {
                      if(token){
                        setRatingPopUp(true)
                      }else{
                        props.setNoteMsg(<h5 className='text-red-600 text-center'>يجب عليك تسجيل الدخول أولاً للتقييم</h5>);
                        showPopUpNote();
                      }
                    }}
                  >
                    تقييم
                  </button>
                  
                  <div className="flex flex-col">
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
                <RatingPopUp ratingPopUp={ratingPopUp} setRatingPopUp={setRatingPopUp} setNoteMsg={props.setNoteMsg} brandId={props.brandId} uniqueProducts={props.uniqueProducts} shopRoute={props.shopRoute}/>
                
          </div>

        </motion.div>

    </AnimatePresence>
  );
};

export default Product;
