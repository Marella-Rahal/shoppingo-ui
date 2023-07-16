import React, { useState } from 'react';
import CustomerDetails from './CustomerDetails';
import ProductDetails from './ProductDetails';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { AnimatePresence, motion } from 'framer-motion';

function OneOrder(props) {
  const [isopen, setIsopen] = useState(false);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={props.id}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: '100%' }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
        className="flex-col md:space-x-3  md:justify-between w-full border my-5 px-5 py-5 md:py-7 shadow-md rounded-lg dark:border-0 dark:shadow-white dark:shadow-sm text-center"
      >
        <div className="flex flex-col-reverse md:flex-row md:justify-between w-full border my-5 px-5 py-5 md:py-7 shadow-md rounded-lg dark:border-0 dark:shadow-white dark:shadow-sm ">
          {!isopen && (
            <button
              className="bg-transparent text-textColor shadow-none hover:bg-transparent m-auto md:m-0"
              onClick={() => {
                setIsopen(!isopen);
              }}
            >
              <IoIosArrowDown
                className=" dark:text-darkTextColor mt-1 "
                size={40}
              />
            </button>
          )}
          {isopen && (
            <button
              className="bg-transparent text-textColor shadow-none hover:bg-transparent m-auto md:m-0"
              onClick={() => {
                setIsopen(!isopen);
              }}
            >
              <IoIosArrowUp
                className=" dark:text-darkTextColor mt-1  "
                size={40}
              />
            </button>
          )}
          <div className="py-2 md:py-0 justify-between w-full md:w-auto flex flex-col-reverse md:flex-row ">
            {props.page2 && (
              <button className="p-3 md:mr-2">إلغاء الطلبية</button>
            )}
            <CustomerDetails value={props} />
          </div>

          <div className="flex flex-col  justify-center items-center py-2 md:py-0 border-b md:border-0 ">
            <div className="font-bold">التاريخ والوقت</div>
            <div className="w-full">{props.value.Date}</div>
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
              <input
                id={`done${props.id}`}
                type={'checkbox'}
                className="mt-1 w-4 h-4"
              />
            )}
            {props.page2 && (
              <AiFillCheckCircle
                className="text-[green] dark:text-darkTextColor mt-1 "
                size={20}
              />
            )}
          </div>
        </div>
        {isopen && (
          <div>
            <div className="flex flex-col-reverse md:flex-row md:justify-between w-full border my-5 px-5 py-5 md:py-7 rounded-lg ">
              <div className="py-2 md:py-0 justify-between w-full md:w-auto flex flex-col-reverse md:flex-row ">
                <ProductDetails value={props} />
              </div>
              <div className="flex flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                <div className="font-bold">طريقة الشراء</div>
                <div>{props.value.TypeBuy}</div>
              </div>
              <div className=" flex  flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                <label className="font-bold" htmlFor={`done${props.id}`}>
                  تمت معالجته
                </label>
                {props.page1 && (
                  <input
                    id={`done${props.id}`}
                    type={'checkbox'}
                    className="mt-1 w-4 h-4"
                  />
                )}
                {props.page2 && (
                  <AiFillCheckCircle
                    className="text-[green] dark:text-darkTextColor mt-1 "
                    size={20}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row md:justify-between w-full border my-5 px-5 py-5 md:py-7 rounded-lg ">
              <div className="py-2 md:py-0 justify-between w-full md:w-auto flex flex-col-reverse md:flex-row ">
                <ProductDetails value={props} />
              </div>
              <div className="flex flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                <div className="font-bold">طريقة الشراء</div>
                <div>{props.value.TypeBuy}</div>
              </div>
              <div className=" flex  flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                <label className="font-bold" htmlFor={`done${props.id}`}>
                  تمت معالجته
                </label>
                {props.page1 && (
                  <input
                    id={`done${props.id}`}
                    type={'checkbox'}
                    className="mt-1 w-4 h-4"
                  />
                )}
                {props.page2 && (
                  <AiFillCheckCircle
                    className="text-[green] dark:text-darkTextColor mt-1 "
                    size={20}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default OneOrder;
