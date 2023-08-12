import React from 'react';
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/Navbar';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import Placeholder from '../../components/SellerDashboard/OneOrderPlaceholder';
import dynamic from 'next/dynamic';
import { parseCookies } from 'nookies';
import axios from 'axios';
import FailToGet from '../../components/FailToGet';
const DynamicOrder = dynamic(
  () => import('../../components/SellerDashboard/OneOrder'),
  {
    loading: () => <Placeholder />,
    ssr: false,
  }
);
import emptyResult from "../../public/empty.json";
import Lottie from "lottie-react";

function MyPurchases(props) {
  
  const [orders, setOrders] = useState(props?.orders);
  const [ItemsDisplayed, setItemsDisplayed] = useState(orders?.slice(0, 10));
  const [FirstArrow, setFirstArrow] = useState(false);
  const [LastArrow, setLastArrow] = useState(true);
  // const [popUpIsOpen,setPopUpIsOpen]=useState(false);

  // functions
  const handleChange = (data) => {
    // for left arrow
    if (data.selected == 0) setFirstArrow(false);
    else setFirstArrow(true);
    // for right arrow
    if (data.selected == Math.ceil(orders.length / 10) - 1) setLastArrow(false);
    else setLastArrow(true);

    setItemsDisplayed(
      orders.slice(data.selected * 10, data.selected * 10 + 10)
    );
  };

  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (selectedOption === 'NTO') {
      const descendingOrder = orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setOrders(descendingOrder);
      setItemsDisplayed(orders.slice(0, 10));
    } else if (selectedOption === 'OTN') {
      const ascendingOrder = orders.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setOrders(ascendingOrder);
      setItemsDisplayed(orders.slice(0, 10));
    }
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      {
        props.success ? (
          <>
            <Navbar />
            <div className={`${props.orders.length == 0 ? 'h-screen' : ''} pt-[86px] flex flex-col w-full`}>
              <div className=" py-3 mb-3 w-full font-bold flex justify-center bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 text-white text-xl">
                مشترياتي
              </div>
              {
                props.orders.length !==0 ? (
                  <>
                    <div className="flex w-full flex-col items-center md:flex-row justify-between px-4 md:px-8 my-5">
                      <select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        className="w-[190px] text-end rounded-lg shadow-md shadow-shadowColor outline-none px-2 pb-1 bg-white text-textColor dark:text-darkBgColor"
                      >
                        <option selected hidden>
                          تصنيف حسب التاريخ
                        </option>

                        <option value="NTO">من الأحدث للأقدم</option>
                        <option value="OTN">من الأقدم للأحدث</option>
                      </select>
                    </div>

                    <div className="px-4 md:px-8">
                      {ItemsDisplayed.map((item, index) => {
                        return (
                          <DynamicOrder
                            key={index}
                            id={index}
                            page2={true}
                            page1={false}
                            value={item}
                          />
                        );
                      })}
                    </div>

                    <ReactPaginate
                      breakLabel={<span className="md:mr-4 mr-1 text-white">...</span>}
                      nextLabel={
                        LastArrow ? (
                          <span className="w-4 md:w-10 flex items-center justify-center text-white rounded-md">
                            <BsChevronRight />
                          </span>
                        ) : null
                      }
                      onPageChange={handleChange}
                      pageRangeDisplayed={1}
                      pageCount={orders.length / 10}
                      previousLabel={
                        FirstArrow ? (
                          <span className="text-white w-4 md:w-10 flex items-center justify-center rounded-md mr-4">
                            <BsChevronLeft />
                          </span>
                        ) : null
                      }
                      containerClassName="flex items-center justify-center mt-8 py-3  bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 "
                      pageClassName="block text-white text-sm md:text-lg w-2 md:w-10 flex items-center justify-center rounded-md mr-4"
                      activeClassName=" text-lg font-bold"
                    />
                  </>
                ) : (
                  <div className='h-full flex justify-center items-center'>
                      <Lottie animationData={emptyResult} loop={true} />
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
}

export default MyPurchases;

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.token;

  try {
    const res = await axios.get(
      `${process.env.server_url}/api/v2.0/shop/myPurchase`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return {
      props: {
        orders: res.data.success ? res.data.orders : [],
        success : true
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
