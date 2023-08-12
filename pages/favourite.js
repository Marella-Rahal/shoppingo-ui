import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Placeholder from "../components/Shop/Placeholder";
import dynamic from 'next/dynamic';
const DynamicProduct=dynamic(()=>import('../components/Shop/Product'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

import InfiniteScroll from "react-infinite-scroll-component";
import { ColorRing } from "react-loader-spinner";

const products=[
  {
    img:'/1.jpg',
    fav:true,
    offer:true,
    oPrice:1000000,
    nPrice:700000,
    rating:"4.5"
  },
  {
    img:'/2.jpg',
    fav:true,
    offer:false,
    oPrice:'',
    nPrice:30000,
    rating:"3.5"
  },
  {
    img:'/15.jpg',
    fav:true,
    offer:true,
    oPrice:500000,
    nPrice:300000,
    rating:"1.5"
  },
  {
    img:'/18.jpg',
    fav:true,
    offer:false,
    oPrice:'',
    nPrice:50000,
    rating:"4.5"
  },
  {
    img:'/71.jpg',
    fav:true,
    offer:true,
    oPrice:100000,
    nPrice:90000,
    rating:"1.5"
  },
]

const Favourite = () => {

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
      <div className="w-full min-h-screen pt-28 pb-14 px-4 md:px-8">

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
              // endMessage={
              //   <div className="flex justify-center items-center my-5">
              //     <b>تهانينا ! لقد رأيت كل المنتجات</b>
              //   </div>
              // }
          >
    
              <div className="flex justify-evenly flex-wrap">

                {
                  displayProducts.map((one,index)=>{
                    return <DynamicProduct key={index} id={index}
                    img={one.img}
                    fav={one.fav}
                    offer={one.offer}
                    oPrice={one.oPrice}
                    nPrice={one.nPrice}
                    rating={one.rating}/>
                  })
                }

              </div>  

          </InfiniteScroll>

      </div>
    </>
  );
};

export default Favourite;
