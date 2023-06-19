import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Placeholder from "../../components/ShoppingCard/Placeholder";
import dynamic from 'next/dynamic';
const DynamicProduct=dynamic(()=>import('../../components/ShoppingCard/Product'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";

const products=[
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
  {
    img:"product.jpg",
    shopName:"For_you",
    shopId:"6",
    color:"red",
    size:"XXL",
    price:"500000",
    qty:"10000",
  },
]

const ShoppingCard = () => {
  const router = useRouter();

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
    <>
      <Navbar/>
      <div className="pt-28 pb-14 px-4 md:px-8 min-h-screen flex flex-col">

          <div className="flex flex-col space-y-7 md:space-y-0 md:flex-row md:justify-between md:space-x-7">

            {/* Delete */}
            <button className="py-2 w-full md:w-[125px] flex space-x-2 justify-center items-center bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl">
              <span>
                حذف الكل
              </span>
              <MdDelete className="w-5 h-5"/>
            </button>

            {/* price */}
            <div className="py-2 px-4 w-full md:w-fit rounded-lg border-[1px] border-textColor dark:border-gray-500 shadow-sm shadow-shadowColor text-center">
                السعر الكلي : 100000 ل.س
            </div>

            {/* buy */}
            <button className="py-2 w-full md:w-[125px] bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl" onClick={() => router.push('/shoppingCard/checkout')}>
                شراء
            </button>


          </div>

          {/* Product */}
          <InfiniteScroll
              dataLength={displayProducts.length}
              next={displayNext}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center items-center mt-10 mb-5">
                  <ColorRing
                  height="50"
                  width="50"
                  colors={['gray','gray','gray','gray','gray']}
                  />
                </div>  
              }
              endMessage={
                <div className="flex justify-center items-center mt-10 mb-5">
                  <b>تهانينا ! لقد رأيت كل المنتجات</b>
                </div>
              }
          >
    
              <div className="flex justify-evenly flex-wrap">

                  {
                    displayProducts.map((one,index)=>{
                      return <DynamicProduct key={index} id={index}
                      img={one.img}
                      shopName={one.shopName}
                      shopId={one.shopId}
                      color={one.color}
                      size={one.size}
                      price={one.price}
                      qty={one.qty}/>
                    })
                  }

              </div>  

          </InfiniteScroll>

      </div>
    </>
  );
};

export default ShoppingCard;
