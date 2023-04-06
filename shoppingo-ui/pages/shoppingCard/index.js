import React from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Placeholder from "../../components/ShoppingCard/Placeholder";
import dynamic from 'next/dynamic';
const DynamicProduct=dynamic(()=>import('../../components/ShoppingCard/Product'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

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
]

const ShoppingCard = () => {
  const router = useRouter();
  return (
    <>
      <Navbar/>
      <div className="pt-28 px-4 md:px-8 min-h-screen flex flex-col justify-between">
        <div className="flex flex-col">
          {/* Delete */}
          <div className="flex space-x-2 self-end items-center cursor-pointer group">
            <span className="text-textColor dark:text-darkTextColor underline group-hover:scale-[1.1]">
              حذف الكل
            </span>
            <MdDelete className="w-7 h-7 group-hover:scale-[1.1]" />
          </div>

          {/* Product */}

          <div className="flex justify-evenly flex-wrap">
            {
              products.map((one,index)=>{
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
        </div>

        <div className="mt-14 mb-10 flex flex-col space-y-7 md:space-y-0 md:flex-row md:justify-between md:space-x-7">
          <div className="py-2 px-4 w-full md:w-fit rounded-lg shadow-md shadow-shadowColor text-center">
            السعر الكلي : 999999999999 ل.س
          </div>
          <button className="py-2 w-full md:w-[200px] bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl" onClick={() => router.push('/shoppingCard/checkout')}>
            شراء
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCard;
