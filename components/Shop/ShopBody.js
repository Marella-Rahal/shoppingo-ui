import React, { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import Classification from "./Classification";
import PriceClassification from "./PriceClassification";
import Search from "./Search";
import Placeholder from "./Placeholder";
import dynamic from 'next/dynamic';
const DynamicProduct=dynamic(()=>import('./Product'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})
import ReactPaginateComponent from '../../components/ReactPaginateComponent';
import Lottie from "lottie-react";
import emptyResult from "../../public/empty.json";

import { useTheme } from "next-themes";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";


const ShopBody = ({ shopRoute, offersRoute, shopIdRoute , setNoteMsg ,uniqueProducts }) => {

  const cookies = parseCookies();
  const role = cookies.role;
  const router =useRouter();

  const { theme, setTheme } = useTheme();
  const [logoUrl,setLogoUrl]=useState('');
  useEffect(()=>{
    if(theme == 'light'){
      setLogoUrl('../logo.svg')
    }else{
      setLogoUrl('../darkLogo.svg')
    }
  },[theme])

  const [PShow,setPShow]=useState(false);
  const [MShow,setMShow]=useState(false);
  const [WShow,setWShow]=useState(false);
  const [selectedOptionsForFemale,setSelectedOptionsForFemale]=useState([]);
  const [selectedOptionsForMale,setSelectedOptionsForMale]=useState([]);

  const [products,setProducts]=useState(uniqueProducts);

  const [productsPerPage,setProductsPerPage]=useState(5);
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const [productsDisplayed, setProductsDisplayed] = useState( products?.slice(0,productsPerPage) );
  const [FirstArrow, setFirstArrow] = useState(false);
  const [LastArrow, setLastArrow] = useState(products?.length > productsPerPage);

  //* 𝗰𝗵𝗮𝗻𝗴𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗶𝗿𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗹𝗮𝘀𝘁𝗔𝗿𝗿𝗼𝘄 , 𝗰𝘂𝗿𝗿𝗲𝗻𝘁𝗣𝗮𝗴𝗲 𝗮𝗻𝗱 𝘁𝗵𝗲 𝗽𝗿𝗼𝗱𝘂𝗰𝘁𝘀𝗗𝗶𝘀𝗽𝗹𝗮𝘆𝗲𝗱 𝗯𝗮𝘀𝗲𝗱 𝗼𝗻 𝘁𝗵𝗲 𝗻𝗲𝘄 𝘀𝗲𝗹𝗲𝗰𝘁𝗲𝗱 𝗱𝗮𝘁𝗮
  const handleChange = (data) => {

    // 𝗳𝗼𝗿 𝗹𝗲𝗳𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == 0 ) setFirstArrow(false);
    else setFirstArrow(true);

    // 𝗳𝗼𝗿 𝗿𝗶𝗴𝗵𝘁 𝗮𝗿𝗿𝗼𝘄
    if ( data.selected == ( Math.ceil(products.length / productsPerPage) - 1 ) ) setLastArrow(false);
    else setLastArrow(true);

    setCurrentPage(data.selected)

    setProductsDisplayed(products.slice(data.selected * productsPerPage, data.selected * productsPerPage + productsPerPage));

  };

  useEffect(()=>{

    setCurrentPage(0);
    setFirstArrow(false);
    setLastArrow( products?.length > productsPerPage )
    setProductsDisplayed( products?.slice(0,productsPerPage) );

  },[products])
  
  return (
    <div
      className={
        shopIdRoute
          ? `flex flex-col`
          : `w-full ${products.length == 0 ? 'min-h-screen md:h-screen' : 'min-h-screen' } pt-[103px] px-4 md:px-8 pb-7 flex flex-col`
      }
    >
      {/* Search and classification */}
      <div className="flex flex-col-reverse md:items-center md:flex-row md:justify-between">
        {/* Search */}
        <Search setProducts={setProducts} uniqueProducts={uniqueProducts} shopRoute={shopRoute} setSelectedOptionsForFemale={setSelectedOptionsForFemale} setSelectedOptionsForMale={setSelectedOptionsForMale}/>
        {/* Classification */}
        <div className="flex flex-col-reverse md:flex-row md:space-x-3 md:items-center">
          {/* woman */}
          <div className="relative z-10 flex flex-col group">
            <button className={`flex justify-between items-center py-2 px-3 ${WShow ? 'bg-[#bb0202] dark:bg-gradient-to-tl' : '' } mt-5 md:mt-0`} onClick={()=> { setWShow(prev=>!prev);setMShow(false);setPShow(false); }}>
              <TiArrowSortedDown className="mr-1 w-5 h-5" /> نسائي
            </button>

            <TiArrowSortedDown className={` absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] dark:text-[#474747] dark:md:text-[#323232] w-7 h-7 ${ WShow ? 'flex' : 'hidden' } `} />

            <Classification woman={true} WShow={WShow} setProducts={setProducts} uniqueProducts={uniqueProducts} shopRoute={shopRoute} selectedOptionsForMale={selectedOptionsForMale} selectedOptionsForFemale={selectedOptionsForFemale} setSelectedOptionsForFemale={setSelectedOptionsForFemale} setSelectedOptionsForMale={setSelectedOptionsForMale}/>
          </div>

          {/* man */}
          <div className="relative z-10 flex flex-col group">
            <button className={`flex justify-between items-center py-2 px-3 ${MShow ? 'bg-[#bb0202] dark:bg-gradient-to-tl' : '' } mt-5 md:mt-0`}
            onClick={()=> { setMShow(prev=>!prev);setWShow(false);setPShow(false); }}>
              <TiArrowSortedDown className="mr-1 w-5 h-5" />
              رجالي
            </button>

            <TiArrowSortedDown className={` absolute  top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] dark:text-[#474747] dark:md:text-[#323232] w-7 h-7 ${ MShow ? 'flex' : 'hidden' } `} />

            <Classification woman={false} MShow={MShow} setProducts={setProducts} uniqueProducts={uniqueProducts} shopRoute={shopRoute}
            selectedOptionsForMale={selectedOptionsForMale} selectedOptionsForFemale={selectedOptionsForFemale} setSelectedOptionsForFemale={setSelectedOptionsForFemale} setSelectedOptionsForMale={setSelectedOptionsForMale}/>
          </div>

          {/* price */}
          <div className="relative z-10 flex flex-col group">
            <button className={`flex justify-between items-center py-2 px-3 ${PShow ? 'bg-[#bb0202] dark:bg-gradient-to-tl' : '' }  mt-5 md:mt-0`} onClick={() => { setPShow(prev=>!prev);setWShow(false);setMShow(false); }}>
              <TiArrowSortedDown className="mr-1 w-5 h-5" />
              السعر
            </button>

            <TiArrowSortedDown className={`absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] dark:text-[#474747] dark:md:text-[#323232] w-7 h-7 ${PShow ? 'flex' : 'hidden' } `} />

            {/* drop down */}
            <PriceClassification PShow={PShow} setPShow={setPShow} setProducts={setProducts} uniqueProducts={uniqueProducts} shopRoute={shopRoute} setNoteMsg={setNoteMsg} setSelectedOptionsForFemale={setSelectedOptionsForFemale} setSelectedOptionsForMale={setSelectedOptionsForMale}/>
          </div>

          <div className="self-center">: ترتيب حسب </div>
        </div>
      </div>

      {/* line */}
      <div className="flex items-center space-x-3 my-7">
        <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
        <img src={logoUrl} className="w-20 xs:w-28 h-10" />
        <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
      </div>

      {
        role == 'seller' && (
          <div className='mb-7 flex space-x-3 justify-between items-center'>

            <button className='w-[100px] py-1' onClick={() => router.push("/profile/sellerDashboard/order")}>
              طلباتي
            </button>

            <button className='w-[100px] py-1' onClick={() => router.push("/profile/sellerDashboard/addProduct")}>
              إضافة منتج
            </button>

          </div>
        )
      }
      
      {
        products.length !== 0 ? (
            <div dir="rtl" className="flex justify-evenly flex-wrap">

            {
                productsDisplayed.map((one,index)=>{
                  if(shopRoute){
                    return <DynamicProduct key={index} brandId={one.brand._id} id={one.shippestProduct._id} img={one.shippestProduct.frontImgURL} fav={false} offer={one.shippestProduct.price !== one.price } oPrice={one.shippestProduct.price} nPrice={one.price} rating={String(one.meanRating)} setNoteMsg={setNoteMsg} offersRoute={offersRoute}/>
                  }else{
                    return <DynamicProduct key={index} brandId={one.product.brand} id={one.product._id} img={one.product.frontImgURL} fav={false} offer={one.product.price !== one.updatedPrice} oPrice={one.product.price} nPrice={one.updatedPrice} rating={String(one.meanRating)} setNoteMsg={setNoteMsg} offersRoute={offersRoute}/>
                  }
                  
                })
            }

            </div> 
        ) : (
            <div className='h-full flex justify-center items-center'>
              <Lottie animationData={emptyResult} loop={true} />
            </div>
        )
      }
       
      
      <ReactPaginateComponent
      FirstArrow={FirstArrow}
      LastArrow={LastArrow}
      currentPage={currentPage}
      handleChange={handleChange}
      pageCount={ Math.ceil(products.length / productsPerPage) }/>

    </div>
  );
};

export default ShopBody;
