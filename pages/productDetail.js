import React, { useEffect, useRef, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import Sizes from "../components/ProductDetail/Sizes";
import Colors from "../components/ProductDetail/Colors";
import { motion } from "framer-motion";
import NotePopUp, { showPopUpNote } from "../components/PopUp/NotePopUp";
import usePosition from "../hooks/usePosition";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import Loading from "../components/Loading";
const Map = dynamic(() => import("../components/Map/Map"), {
  loading: () => <Loading />,
  ssr: false,
});
import Placeholder from "../components/Shop/Placeholder";
import { parseCookies } from "nookies";
import axios from "axios";
const DynamicProduct=dynamic(()=>import('../components/Shop/Product'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

import FailToGet from '../components/FailToGet';
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import { useTheme } from "next-themes";
import emptyResult from "../public/empty.json";
import Lottie from "lottie-react";

const ProductDetail = (props) => {

  const router=useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const [imgUrl, setImgUrl] = useState(true);
  const [isImgLoading,setIsImgLoading]=useState(false);
  const [productDetailLoader,setProductDetailLoader]=useState(false);
  const [loaderColor,setLoaderColor]=useState('');
  const [mapLoaderColor,setMapLoaderColor]=useState('');
  const {theme} = useTheme();
  useEffect(()=>{
    theme == 'light' ? setLoaderColor('#d7271a') : setLoaderColor('#121212')
    theme == 'light' ? setMapLoaderColor('#111D4A') : setMapLoaderColor('white')
  },[theme])

  const [showDescription, setShowDescription] = useState(true);
  const [showSizes, setShowSizes] = useState(true);
  const [showQty, setShowQty] = useState(true);
  const [showColors, setShowColors] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  const [product,setProduct]=useState(props?.product)
  const [updatedPrice,setUpdatedPrice]=useState(props?.updatedPrice);
  const [productSize,setProductSize]=useState(props?.product?.variations[0]?.size);
  const [productColor,setProductColor]=useState('');

  const [blue,setBlue]=useState([]);
  const [orange,setOrange]=useState({});
  const [red,setRed]=useState([]);
  const [green,setGreen]=useState({});

  const [recommendation,setRecommendation]=useState([]);

  //! *************************
  console.log("recommendation",recommendation);
  
  //* to set constraint on how much i can drag the slider to the left
  // const [width, setWidth] = useState(0);
  // const slider = useRef();
  // useEffect(() => {
  //   setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
  // }, []);
  //* **************************************************

  const [noteMsg, setNoteMsg] = useState("");
  const [coords, error] = usePosition();
  const [errOnce,setErrOnce]=useState(false);
  const [coordsOnce,setCoordsOnce]=useState(false);
  const [isMapLoading,setIsMapLoading]=useState(true);
  const [isProductsLoading,setIsProductsLoading]=useState(true);
  const [sendingStatus,setSendingStatus]=useState(false);

  useEffect(() => {

    if (error && props.success && !errOnce) {
      setErrOnce(true);
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

  useEffect(()=>{

    if(coords.length !== 0 && props.success && !coordsOnce){
      setCoordsOnce(true);
      getMapProduct(coords);
    }

  },[coords])

  useEffect(()=>{

    getSimilarProducts();

  },[])
  
  const getMapProduct = async (coords) => {

    try {

      const res = await axios.get(`${process.env.server_url}/api/v2.0/shop/getMapProduct/${product._id}`,{
        params : {
          long : coords[0],
          lat : coords[1],
          brand : product.brand,
        },
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      setBlue(res.data.otherProducts);
      setOrange(res.data.nearestProduct);
      setRed(res.data.productsWithDiscount);
      setGreen(res.data.shippestProduct);

      setIsMapLoading(false);
      
    } catch (error) {

      getMapProduct(coords);

    }

  }

  const getSimilarProducts = async () => {

    try {

      const res = await axios.get(`${process.env.server_url}/api/v2.0/shop/getSimilarProducts`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      setRecommendation(res.data.recommendation !== undefined ? res.data.recommendation : []);

      setIsProductsLoading(false);
      
    } catch (error) {

      getSimilarProducts()

    }

  }

  const addToCart = async () => {

    if(!productColor || !productSize){
      setNoteMsg(
        <h5 className='text-red-600 text-center'>الرجاء تحديد قياس المنتج ولونه لإضافته لسلة المشتريات</h5>
      );

      showPopUpNote();
      return ;
    }

    try {

      setSendingStatus(true);

      const res = axios.post(`${process.env.server_url}/api/v2.0/cart/addItemToCart`,{
        productId : product._id,
        size : productSize ,
        color : productColor ,
        quantity : 1,
        price : updatedPrice

      },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })


      setSendingStatus(false);

      setNoteMsg(
        <h5 className='text-red-600 text-center'>تمت اضافة المنتج بنجاح الى سلة التسوق</h5>
      );

      showPopUpNote();
      
    } catch (error) {

      setSendingStatus(false);

      setNoteMsg(
          <h5 className='text-red-600 text-center'>{error?.message}</h5>
      );

      showPopUpNote();
      
    }

  }

  return (
    <>
      {
        props.success ? (
          <>
              {
                sendingStatus && (
                  <div className='fixed z-[100] w-full h-full bg-black/30 flex justify-center items-center'>
                      <ThreeDots
                      width="75"
                      color="white"
                      visible={true}
                      /> 
                  </div>
                )
              }
              <NotePopUp noteMsg={noteMsg} />
              <Navbar/>
              <div className="w-full min-h-screen pt-24 pb-10 px-4 md:px-8 flex flex-col space-y-5">
                {/* section 1 */}
                <div className="flex flex-col-reverse md:flex-row md:space-x-7">
                  {/* Map */}
                  <div
                    className="w-full md:w-1/2 lg:w-2/3 h-[500px] md:h-auto rounded-lg mt-10 md:mt-0 shadow-mapShadow dark:shadow-darkMapShadow"
                  > 
                    {
                      isMapLoading ? (
                        <div className="w-full h-full flex justify-center items-center rounded-lg">
                          <ThreeCircles
                          color={mapLoaderColor}
                          width={50}
                          visible={true}/>
                        </div>
                      ) : (
                        <Map coords={coords} sellerRoute={false} blue={blue} orange={orange} red={red} green={green} setProduct={setProduct} setUpdatedPrice={setUpdatedPrice} setProductSize={setProductSize} setProductColor={setProductColor} setProductDetailLoader={setProductDetailLoader}/>
                      )
                    }
                  </div>

                  {/* product detail */}
                  <div className="w-full md:w-1/2 lg:w-1/3 h-fit flex flex-col space-y-3">
                    {/* product image */}
                    <div className="flex flex-col-reverse md:flex-row  md:justify-around">
                      {/* Add to cart  */}
                      <button onClick={addToCart} className="self-center flex items-center justify-center flex-wrap-reverse rounded-md mt-5 md:mt-0 mr-0 md:mr-3 p-2">
                        <HiShoppingCart className="mr-2" />
                        أضف إلى
                      </button>

                      {/* img */}
                      <div className="relative self-center w-[240px] h-[260px] rounded-xl shadow-md shadow-shadowColor select-none">
                        
                        <img 
                        src={imgUrl?product.frontImgURL:product.backImgURL}
                        onLoad={()=>setIsImgLoading(false)}
                        className={`bg-bgColor dark:bg-white w-full h-full rounded-xl ${isImgLoading ? 'hidden' : 'flex' }`}/>
                        
                        <div className={`bg-bgColor dark:bg-white w-full h-full rounded-xl ${isImgLoading ? 'flex' : 'hidden' } justify-center items-center`}>
                          <ThreeCircles
                          color={loaderColor}
                          width={50}
                          visible={true}/>
                        </div>

                        <MdOutlineArrowBackIos
                          style={{ boxShadow: "0px 0px 5px 3px rgba(255,255,255,1)" }}
                          className="absolute top-[45%] cursor-pointer hover:scale-[1.1] text-xl bg-bgColor/70 text-effectColor dark:text-darkBgColor"
                          onClick={() => { setIsImgLoading(true) ; setImgUrl(prev=>!prev) }}
                        />
                        <MdOutlineArrowForwardIos
                          style={{ boxShadow: "0px 0px 5px 3px rgba(255,255,255,1)" }}
                          className="absolute top-[45%] right-0  cursor-pointer hover:scale-[1.1] text-xl bg-bgColor/70 text-effectColor dark:text-darkBgColor"
                          onClick={() => { setIsImgLoading(true) ; setImgUrl(prev=>!prev) }}
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

                      productDetailLoader ? (
                        <div className="flex justify-end items-center">
                          <ThreeDots
                          color={mapLoaderColor}
                          width={40}
                          height={30}
                          visible={true}/>
                        </div>
                      ) : (
                        <div className="text-end text-textColor2 dark:text-darkTextColor2">
                          {product.type} - {product.style} - {product.description}
                        </div>
                      )
                      
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

                      productDetailLoader ? (
                        <div className="flex justify-end items-center">
                          <ThreeDots
                          color={mapLoaderColor}
                          width={40}
                          height={30}
                          visible={true}/>
                        </div>
                      ) : (
                        <div className="flex space-x-4 flex-wrap justify-end">

                          {
                            product.variations.map((one,index)=>{
                              return <Sizes key={index} size={one.size} productSize={productSize} setProductSize={setProductSize} setProductColor={setProductColor}/>
                            })
                          }
                          
                        </div>
                      )
                      
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
                    {
                      showQty && (

                        productDetailLoader ? (
                          <div className="flex justify-end items-center">
                            <ThreeDots
                            color={mapLoaderColor}
                            width={40}
                            height={30}
                            visible={true}/>
                          </div>
                        ) : (
                          <div className="text-end text-textColor2 dark:text-darkTextColor2">
                          {
                            product.variations.map( q => {
                              if(q.size == productSize){
                                return q.quantity 
                              }
                            })
                          }
                          </div>
                        )
                        
                      )
                      
                    }

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

                      productDetailLoader ? (
                        <div className="flex justify-end items-center">
                            <ThreeDots
                            color={mapLoaderColor}
                            width={40}
                            height={30}
                            visible={true}/>
                        </div>
                      ) : (
                        <div className="flex space-x-3 flex-wrap justify-end">
                        {
                          product.variations.map( c => {
                            if( c.size == productSize ){
                              return c.colors.map( (color,index) => <Colors key={index} color={color} productColor={productColor} setProductColor={setProductColor} /> )
                            }
                          })
                        }
                        </div>
                      )
                      
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

                      productDetailLoader ? (
                        <div className="flex justify-end items-center">
                            <ThreeDots
                            color={mapLoaderColor}
                            width={40}
                            height={30}
                            visible={true}/>
                        </div>
                      ) : (
                        <div className="flex flex-col space-y-2">
                          {/* new price and old price */}
                          <div className="flex space-x-3 flex-wrap justify-end">
                            
                            <span className="mt-2 flex font-semibold text-textColor dark:text-darkTextColor">
                              <span className="mr-2">ل.س</span>
                              {updatedPrice}
                            </span>
                            {
                              updatedPrice !== product.price && (
                                <span className="mt-2 flex line-through text-textColor2 dark:text-darkTextColor2">
                                  <span className="mr-2">ل.س</span>
                                  {product.price}
                                </span>
                              )
                            }
                          </div>
                          {/* Shop Name */}
                          <div className="font-semibold cursor-pointer hover:underline text-textColor dark:text-darkTextColor text-end" onClick={() => router.push({ pathname : '/sellerProducts' , query : { sellerId : product.seller._id } })}>{product.seller.storeName}</div>

                          {/* Address */}
                          <div className="text-textColor2 dark:text-darkTextColor2 text-end">
                            {product.seller.location}
                          </div>
                        </div>
                      )
                      
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
                  dir="rtl"
                  // ref={slider}
                  // className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-textColor dark:border-darkTextColor shadow-mapShadow dark:shadow-darkMapShadow"
                  className="overflow-auto sliderScroll rounded-lg border-x-4 border-textColor dark:border-darkTextColor shadow-mapShadow dark:shadow-darkMapShadow"
                >
                  <motion.div
                    // drag="x"
                    // dragConstraints={{ right: 0, left: -width }}
                    className="flex"
                  >
                    {
                      isProductsLoading ? (

                        <div className="w-full h-full flex justify-center items-center rounded-lg">
                          <ThreeDots
                          color={mapLoaderColor}
                          width={50}
                          visible={true}/>
                        </div>

                      ) : (
                        
                        recommendation.length !== 0 ? (
                          recommendation.map((one,index)=>{
                            return <DynamicProduct key={index} brandId={one.brand} id={one._id} img={one.frontImgURL} fav={false} offer={marker.fixedDiscount !== 0 && marker.fixedDiscount !== undefined } oPrice={one.price} nPrice={ (marker.fixedDiscount !== 0 && marker.fixedDiscount !== undefined ) ? one.price-one.fixedDiscount :one.price } rating={'3'} setNoteMsg={setNoteMsg} uniqueProducts={recommendation} shopRoute={true}/>
                          })
                        ) : (
                          <div className='w-full flex justify-center'>
                            <Lottie animationData={emptyResult} loop={true} />
                          </div>
                        )

                      )
                      
                    }
                  </motion.div>
                </motion.div>
              </div>   
          </>
        ) : (
          <FailToGet/>
        )
      }
    </>
  );
};

export default ProductDetail;

export const getServerSideProps = async (context) => {

    const cookies = parseCookies(context);
    const token = cookies.token ;

    try {

        const res = await axios.get(`${process.env.server_url}/api/v2.0/shop/getProductDetails/${context.query.productId}`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        })

        return {
          props : {
            updatedPrice : res.data.updatedPrice,
            product : res.data.product ,
            success : true
          }
        }
      
    } catch (error) {

        if(error?.response?.status == 401){

          return {
            redirect: {
              destination: '/login',
              permanent: false, // Set to false if it's a temporary redirect
            },
          }

        }else{

            return {
              props : {
                success : false
              }
            }

        }
    }

}
