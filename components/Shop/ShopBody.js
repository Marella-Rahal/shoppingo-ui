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

import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";
import { useTheme } from "next-themes";

const products=[
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"3.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"0.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"1.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:"",
    nPrice:70000,
    rating:"5.0"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:200000,
    nPrice:150000,
    rating:"2.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"3.0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"3.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"0.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"1.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:"",
    nPrice:70000,
    rating:"5.0"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:200000,
    nPrice:150000,
    rating:"2.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"3.0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"3.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"0.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"1.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:"",
    nPrice:70000,
    rating:"5.0"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:200000,
    nPrice:150000,
    rating:"2.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"3.0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"3.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"0.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"1.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:false,
    oPrice:'',
    nPrice:70000,
    rating:"0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"4.5"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:"",
    nPrice:70000,
    rating:"5.0"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:200000,
    nPrice:150000,
    rating:"2.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"3.0"
  },
  {
    img:'../product.jpg',
    fav:true,
    offer:false,
    oPrice:"",
    nPrice:70000,
    rating:"5.0"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:200000,
    nPrice:150000,
    rating:"2.5"
  },
  {
    img:'../product.jpg',
    fav:false,
    offer:true,
    oPrice:100000,
    nPrice:70000,
    rating:"3.0"
  },
]

const ShopBody = ({ shopRoute, offersRoute, shopIdRoute }) => {

  const { theme, setTheme } = useTheme();
  const [logoUrl,setLogoUrl]=useState('');
  useEffect(()=>{
    if(theme == 'light'){
      setLogoUrl('../logo.svg')
    }else{
      setLogoUrl('../darkLogo.svg')
    }
  },[theme])

  //! this is tha data for InfiniteScrolling
  const [productsPerPage,setProductsPerPage]=useState(12);
  const [page,setPage]=useState(1);
  const [displayProducts,setDisplayProducts] = useState(()=>{
    return productsPerPage>=products.length ? products : products.slice(0,productsPerPage)
  });
  const [hasMore,setHasMore]=useState(()=>{
    return productsPerPage>=products.length ? false : true
  });

  //*******************************************/
  console.log('displayProducts :',displayProducts.length,'hasMore :',hasMore);
  //*******************************************/

  const displayNext=()=>{

    if(products.length-displayProducts.length<=productsPerPage){

      setTimeout(()=>{

        setDisplayProducts(prev=> [...prev,...products.slice(page*productsPerPage,products.length)]);
        setHasMore(false);

      },1000)

    }else{

      setTimeout(()=>{

        setDisplayProducts(prev => [...prev,...products.slice( (page*productsPerPage) , (page*productsPerPage)+productsPerPage )]);
        setPage(prev=>prev+1)

      },1000)

    }

  }
  //! ****************************************
  
  return (
    <div
      className={
        shopIdRoute
          ? "flex flex-col"
          : "w-full min-h-screen pt-28 px-4 md:px-8 pb-14 flex flex-col"
      }
    >
      {/* Search and classification */}
      <div className="flex flex-col-reverse md:items-center md:flex-row md:justify-between md:px-0 px-7">
        {/* Search */}
        <Search />
        {/* Classification */}
        <div className="flex flex-col-reverse md:flex-row md:space-x-3 md:items-center">
          {/* woman */}
          <div className="relative z-10 flex flex-col group">
            <button className="flex justify-between items-center py-2 px-3 group-hover:bg-[#bb0202] mt-5 md:mt-0">
              <TiArrowSortedDown className="mr-1 w-5 h-5" /> نسائي
            </button>

            <TiArrowSortedDown className="hidden absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] dark:text-darkTextColor w-7 h-7 group-hover:flex" />

            <Classification woman={true} />
          </div>

          {/* man */}
          <div className="relative z-10 flex flex-col group">
            <button className="flex justify-between items-center py-2 px-3 group-hover:bg-[#bb0202] mt-5 md:mt-0">
              <TiArrowSortedDown className="mr-1 w-5 h-5" />
              رجالي
            </button>

            <TiArrowSortedDown className="hidden absolute  top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] dark:text-darkTextColor w-7 h-7 group-hover:flex" />

            <Classification woman={false} />
          </div>

          {/* price */}
          <div className="relative z-10 flex flex-col group">
            <button className="flex justify-between items-center py-2 px-3 group-hover:bg-[#bb0202] mt-5 md:mt-0">
              <TiArrowSortedDown className="mr-1 w-5 h-5" />
              السعر
            </button>

            <TiArrowSortedDown className="hidden absolute top-[50px] left-[8px] md:top-[30px] md:left-[30px] text-[#bb0202] dark:text-darkTextColor w-7 h-7 group-hover:flex" />

            {/* drop down */}
            <PriceClassification />
          </div>

          <div className="self-center">: ترتيب حسب </div>
        </div>
      </div>

      {/* line */}
      <div className="flex items-center space-x-3 my-10">
        <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
        <img src={logoUrl} className="w-20 xs:w-28 h-10" />
        <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
      </div>

      <InfiniteScroll
          dataLength={displayProducts.length}
          next={displayNext}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center my-5">
              <ColorRing
              height="50"
              width="50"
              colors={['gray','gray','gray','gray','gray']}
              />
            </div>  
          }
          endMessage={
            <div className="flex justify-center items-center my-5">
              <b>تهانينا ! لقد رأيت كل المنتجات</b>
            </div>
          }
      >
 
          <div className="flex justify-evenly flex-wrap">

            {
              displayProducts.map((one,index)=>{
                return <DynamicProduct key={index} id={index} img={one.img} fav={one.fav} offer={one.offer} oPrice={one.oPrice} nPrice={one.nPrice} rating={one.rating}/>
              })
            }

          </div>  

      </InfiniteScroll>

    </div>
  );
};

export default ShopBody;
