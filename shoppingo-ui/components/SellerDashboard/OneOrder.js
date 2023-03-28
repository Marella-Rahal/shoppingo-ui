import React from 'react';
import CustomerDetails from './CustomerDetails';
import ProductDetails from './ProductDetails';
import { AiFillCheckCircle } from 'react-icons/ai';
function OneOrder(props) {
  return (
    <>
      <div className="flex md:flex-row md:space-x-3 flex-col-reverse md:justify-between w-full md:w-3/4 border my-5 px-5 py-5 md:py-7 mx-auto shadow-md rounded-lg dark:border-0 dark:shadow-white dark:shadow-sm text-center">
        <div className="py-2 md:py-0 justify-between w-full md:w-auto flex flex-col-reverse md:flex-row ">
          {props.page2 && (
            <button className="p-3">
              إلغاء الطلبية
            </button>
          )}
          <CustomerDetails value={props} />
          <ProductDetails value={props} />
        </div>

        <div className="flex flex-col  justify-center items-center py-2 md:py-0 border-b md:border-0 ">
          <div className="font-bold">التاريخ والوقت</div>
          <div className="w-full">
            {props.value.Date}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
          <div className="font-bold">طريقة الشراء</div>
          <div>{props.value.TypeBuy}</div>
        </div>
        {props.page1 && (
          <div className=" flex flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
            <div className="font-bold">اسم الزبون</div>
            <div>{props.value.typeOfCustumer}</div>
          </div>
        )}
        <div className=" flex  flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
          <label className="font-bold" htmlFor={`done${props.id}`}>
            تمت معالجته
          </label>
          {props.page1 && (
            <input id={`done${props.id}`} type={'checkbox'} className="mt-1 w-4 h-4" />
          )}
          {props.page2 && (
            <AiFillCheckCircle className="text-[green] dark:text-darkTextColor mt-1 " size={20} />
          )}
        </div>
      </div>
    </>
  );
}

export default OneOrder;
