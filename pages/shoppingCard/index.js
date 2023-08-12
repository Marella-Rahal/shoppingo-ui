import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Placeholder from '../../components/ShoppingCard/Placeholder';
import dynamic from 'next/dynamic';
const DynamicProduct = dynamic(
  () => import('../../components/ShoppingCard/Product'),
  {
    loading: () => <Placeholder />,
    ssr: false,
  }
);

import InfiniteScroll from 'react-infinite-scroll-component';
import { ColorRing } from 'react-loader-spinner';
import { parseCookies } from 'nookies';
import axios from 'axios';
import NotePopUp, { showPopUpNote } from '../../components/PopUp/NotePopUp';
import emptyResult from "../../public/emptyShoppingCard.json";
import Lottie from "lottie-react";
import FailToGet from '../../components/FailToGet';

const ShoppingCard = (props) => {
  const router = useRouter();
  console.log(props.cartItems);
  const [cartItems, setCartitems] = useState(props.cartItems);
  const [totalPrice, settotalPrice] = useState(props.totalPrice);
  //! this is tha data for InfiniteScrolling
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [page, setPage] = useState(1);

  const [displayProducts, setDisplayProducts] = useState(() => {
    if (cartItems != undefined) {
      return productsPerPage >= cartItems.length
        ? cartItems
        : cartItems.slice(0, productsPerPage);
    }
  });
  const [hasMore, setHasMore] = useState(() => {
    if (cartItems != undefined) {
      return productsPerPage >= cartItems.length ? false : true;
    }
  });

  //*******************************************/
  // console.log(
  //   'displayProducts :',
  //   displayProducts.length,
  //   'hasMore :',
  //   hasMore
  // );
  //*******************************************/

  const displayNext = () => {
    if (cartItems != undefined) {
      if (cartItems.length - displayProducts.length <= productsPerPage) {
        setTimeout(() => {
          setDisplayProducts((prev) => [
            ...prev,
            ...cartItems.slice(page * productsPerPage, cartItems.length),
          ]);
          setHasMore(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setDisplayProducts((prev) => [
            ...prev,
            ...cartItems.slice(
              page * productsPerPage,
              page * productsPerPage + productsPerPage
            ),
          ]);
          setPage((prev) => prev + 1);
        }, 1000);
      }
    }
  };
  //! ****************************************
  const [noteMsg, setNoteMsg] = useState('');

  const removeAllItems = async () => {
    const cookies = parseCookies();
    const token = cookies.token;

    try {
      const res = await axios.delete(
        `${process.env.server_url}/api/v2.0/cart/deleteCartItems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        console.log('تم الحذف');
        setCartitems([]);
        settotalPrice(0);
      }
    } catch (error) {
      console.log(error);

      setNoteMsg(
        <h5 className="text-red-600 text-center">{error?.message}</h5>
      );

      showPopUpNote();
    }
  };
  return (
    <>
      {
        props.success ? (
          <>
            <NotePopUp noteMsg={noteMsg} />
            <Navbar />
            <div className={`pt-28 pb-14 px-4 md:px-8 ${cartItems.length !== 0 ? 'min-h-screen' : 'h-screen' } flex flex-col`}>
              <div className="flex flex-col space-y-7 md:space-y-0 md:flex-row md:justify-between md:space-x-7">
                {/* Delete */}
                <button
                  onClick={() => {
                    removeAllItems();
                  }}
                  className="py-2 w-full md:w-[125px] flex space-x-2 justify-center items-center bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl"
                >
                  <span>حذف الكل</span>
                  <MdDelete className="w-5 h-5" />
                </button>

                {/* price */}
                <div className="py-2 px-4 w-full md:w-fit rounded-lg border-[1px] border-textColor dark:border-gray-500 shadow-sm shadow-shadowColor text-center">
                  {` السعر الكلي : ${totalPrice} ل.س`}  
                </div>

                {/* buy */}
                <button
                  className="py-2 w-full md:w-[125px] bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl"
                  onClick={() => router.push('/shoppingCard/checkout')}
                >
                  شراء
                </button>
              </div>
              {/* Product */}
              {
                cartItems.length !== 0 ? (
                    <InfiniteScroll
                      dataLength={ cartItems.length }
                      next={displayNext}
                      hasMore={hasMore}
                      loader={
                        <div className="flex justify-center items-center mt-10 mb-5">
                          <ColorRing
                            height="50"
                            width="50"
                            colors={['gray', 'gray', 'gray', 'gray', 'gray']}
                          />
                        </div>
                      }
                      endMessage={
                        <div className="flex justify-center items-center mt-10 mb-5">
                          <b>تهانينا ! لقد رأيت كل المنتجات</b>
                        </div>
                      }
                    >
                        <div className='flex justify-evenly flex-wrap'>
                          {
                              cartItems.map((one, index) => {
                                return (
                                  <DynamicProduct
                                    key={index}
                                    id={index}
                                    cartItems={cartItems}
                                    setNoteMsg={setNoteMsg}
                                    setCartitems={setCartitems}
                                    totalPrice={totalPrice}
                                    settotalPrice={settotalPrice}
                                    img={cartItems[index]['product']['frontImgURL']}
                                    shopName={
                                      cartItems[index]['product']['seller']['storeName']
                                    }
                                    shopId={cartItems[index]['product']['seller']['_id']}
                                    productId={cartItems[index]['_id']}
                                    color={cartItems[index]['color']}
                                    size={cartItems[index]['size']}
                                    price={cartItems[index]['price']}
                                    qty={cartItems[index]['quantity']}
                                  />
                                );
                              })
                          }
                        </div>
                    </InfiniteScroll>
                ) : (
                    <div className='h-full flex justify-center'>
                      <Lottie className='mt-20' animationData={emptyResult} loop={true} />
                    </div>
                )
              }
              
            </div>
          </>
        ) : (
          <FailToGet/>
        )
      }
      
    </>
  );
};

export default ShoppingCard;

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.token;

  try {
    const res = await axios.get(
      `${process.env.server_url}/api/v2.0/cart/getCart`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      props: {
        cartItems:
          res.data.success ? res.data.cart.cartItems : [],
        totalPrice:
          res.data.success ? res.data.cart.totalPrice : 0,
        success: true,  
      },
    };
  } catch (error) {

    if (error?.response?.status == 401) {
      return {
        redirect: {
          destination: '/login',
          permanent: false, // Set to false if it's a temporary redirect
        },
      };
    } else {
      return {
        props: {
          success: false,
        },
      };
    }
  }
};
