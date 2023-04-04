import React from 'react';
import ReactPaginate from 'react-paginate';
import Navbar from '../../../components/Navbar';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useState } from 'react';
import OneOrder from '../../../components/SellerDashboard/OneOrder';

function Order() {
  // constants
  const items = [
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
    {
      typeOfCustumer: 'غيث عثمان',
      TypeBuy: 'WePay',
      price: '50000000',
      Date: '10:45 pm 14/1/2001',
      img: '../../defaultProduct.jfif',
      sizes: {
        XL: ['#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000','#50d71e', '#000000', '#50d71e', '#000000' ,'#50d71e', '#000000', '#50d71e', '#000000','#000000'],
        L: ['#50d71e', '#000000', '#50d71e', '#000000'],
        M: ['#50d71e', '#000000', '#50d71e', '#000000'],
        S: ['#50d71e', '#000000', '#50d71e', '#000000'],
      },
      fullName: 'غيث فيصل عثمان',
      email: 'ghaethoo2001.go@gmail.com',
      number: '+963937082264',
      city: 'حمص',
      Address: ' شارع الحضارة',
    },
  ];
  const [ItemsDisplayed, setItemsDisplayed] = useState(items.slice(0, 10));
  const [FirstArrow, setFirstArrow] = useState(false);
  const [LastArrow, setLastArrow] = useState(true);
  // const [popUpIsOpen,setPopUpIsOpen]=useState(false);
  // functions
  const handleChange = (data) => {
    // for left arrow
    if (data.selected == 0) setFirstArrow(false);
    else setFirstArrow(true);
    // for right arrow
    if (data.selected == Math.ceil(items.length / 10) - 1 ) setLastArrow(false);
    else setLastArrow(true);

    setItemsDisplayed(items.slice(data.selected * 10, data.selected * 10 + 10));
  };
  return (
    <>
      <Navbar />
      <div className="pt-[86px] flex flex-col w-full">
        <div className="py-3 mb-3 w-full font-bold flex justify-center bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 text-white text-xl">
          طلباتي
        </div>
        <div className="flex flex-col items-center md:flex-row w-full justify-between px-4 md:px-8 py-5">
          <select className="mb-2 md:mb-0 rounded-lg text-textColor dark:text-darkBgColor text-end bg-darkTextColor shadow-md shadow-shadowColor  outline-none px-2 pb-1 w-[240px]">
            <option selected hidden>
              تصنيف حسب المعالجة
            </option>
            <option value="Done">تمت المعالجة</option>
            <option value="NotYet">لم تتم المعالجة بعد</option>
            <option value="allOrders">كل الطلبات</option>
          </select>

          <select className="rounded-lg text-textColor dark:text-darkBgColor text-end bg-darkTextColor shadow-md shadow-shadowColor  outline-none px-2 pb-1 w-[240px]">
            <option selected hidden>
              تصنيف حسب التاريخ
            </option>
            <option value="NTO">من الأحدث للأقدم</option>
            <option value="OTN">من الأقدم للأحدث</option>
          </select>
        </div>

        <div className='px-4 md:px-8'>

          
          {ItemsDisplayed.map((item, index) => {
            return (
              <OneOrder id={index} value={item} key={index} page1={true} page2={false} />
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
          pageCount={items.length / 10}
          previousLabel={
            FirstArrow ? (
              <span className="text-white w-4 md:w-10 flex items-center justify-center rounded-md mr-4">
                <BsChevronLeft />
              </span>
            ) : null
          }
          containerClassName="flex items-center justify-center py-3 mt-8 bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 "
          pageClassName="block text-white text-sm md:text-lg w-2  md:w-10 flex items-center justify-center rounded-md mr-4"
          activeClassName=" text-lg font-bold"
        />

      </div>
    </>
  );
}

export default Order;
