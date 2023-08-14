import React, { useState } from 'react';
import CustomerDetails from './CustomerDetails';
import ProductDetails from './ProductDetails';
import { AiFillCheckCircle } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { AnimatePresence, motion } from 'framer-motion';

function OneOrder(props) {
  console.log('Ghaith');
  console.log(props);
  const [isopen, setIsopen] = useState(false);
  const [checked, setChecked] = useState();
  const date = new Date(props.value.createdAt);
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
            <div className="w-full">{date.toLocaleString()}</div>
          </div>

          {props.page1 && (
            <div className=" flex flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
              <div className="font-bold">اسم الزبون</div>
              <div>
                {props.value.details.firstName} {props.value.details.lastName}
              </div>
            </div>
          )}
        </div>
        {isopen && (
          <div>
            {props.value.onDeliveryItems.map((item, index) => {
              console.log(props.value);
              console.log(typeof item.deliveryStatus);
              console.log('asdfasdfasdfasdfasdf');
              return (
                <div key={index} className="flex flex-col-reverse md:flex-row md:justify-between w-full border my-5 px-5 py-5 md:py-7 rounded-lg ">
                  <div className="py-2 md:py-0 justify-between w-full md:w-auto flex flex-col-reverse md:flex-row ">
                    <ProductDetails value={item} />
                  </div>
                  <div className="flex flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                    <div className="font-bold">طريقة الشراء</div>
                    <div>on Delivery</div>
                  </div>
                  <div className=" flex  flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                    {item.deliveryStatus == 'true' ? (
                      <label className="font-bold">تمت معالجته</label>
                    ) : (
                      <label className="font-bold">لم تتم معالجته</label>
                    )}

                    {props.page1 &&
                      (item.deliveryStatus == 'true' ? (
                        <input
                          onChange={() => {}}
                          type={'checkbox'}
                          checked={true}
                          className="mt-1 w-4 h-4"
                        />
                      ) : (
                        <input
                          onChange={() => {}}
                          type={'checkbox'}
                          checked={false}
                          className="mt-1 w-4 h-4"
                        />
                      ))}
                    {props.page2 &&
                      (item.deliveryStatus == 'true' ? (
                        <AiFillCheckCircle
                          className="text-[green] dark:text-darkTextColor mt-1 "
                          size={20}
                        />
                      ) : (
                        <MdCancel
                          className="text-[red] dark:text-darkTextColor mt-1 "
                          size={20}
                        />
                      ))}
                  </div>
                </div>
              );
            })}

            {props.value.wepayItems.map((item, index) => {
              return (
                <div key={index} className="flex flex-col-reverse md:flex-row md:justify-between w-full border my-5 px-5 py-5 md:py-7 rounded-lg ">
                  <div className="py-2 md:py-0 justify-between w-full md:w-auto flex flex-col-reverse md:flex-row ">
                    <ProductDetails value={item} />
                  </div>
                  <div className="flex flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                    <div className="font-bold">طريقة الشراء</div>
                    <div>wepay</div>
                  </div>
                  <div className=" flex  flex-col justify-center items-center py-2 md:py-0 border-b md:border-0">
                    {item.deliveryStatus == 'true' ? (
                      <label className="font-bold">تمت معالجته</label>
                    ) : (
                      <label className="font-bold">لم تتم معالجته</label>
                    )}
                    {props.page1 &&
                      (item.deliveryStatus == 'true' ? (
                        <input
                          onChange={() => {}}
                          type={'checkbox'}
                          checked={true}
                          className="mt-1 w-4 h-4"
                        />
                      ) : (
                        <input
                          onChange={() => {}}
                          type={'checkbox'}
                          checked={false}
                          className="mt-1 w-4 h-4"
                        />
                      ))}
                    {props.page2 &&
                      (item.deliveryStatus == 'true' ? (
                        <AiFillCheckCircle
                          className="text-[green] dark:text-darkTextColor mt-1 "
                          size={20}
                        />
                      ) : (
                        <MdCancel
                          className="text-[red] dark:text-darkTextColor mt-1 "
                          size={20}
                        />
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default OneOrder;
