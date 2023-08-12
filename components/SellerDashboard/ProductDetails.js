import React from 'react';
import Popup from 'reactjs-popup';
import { motion } from 'framer-motion';

function ProductDetails(props) {
  // console.log(props.value.value);
  return (
    <Popup
      trigger={<button className="p-3">معلومات المنتج</button>}
      modal
      nested
    >
      {(close) => (
        <>
          <motion.div
            initial={{ opacity: 0, y: '-200%', x: '-50%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%' }}
            transition={{ ease: 'easeInOut', duration: 0.7 }}
            className="fixed z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col space-y-5 justify-between shadow-2xl rounded-lg bg-gray-50 w-[90%] md:w-[600px] p-3 md:p-5 text-textColor dark:text-darkBgColor"
          >
            <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:justify-between md:items-center">
              <img
                src={props.value.item.product.frontImgURL}
                className="self-center w-32 h-36 rounded-lg shadow-md shadow-shadowColor"
              />

              <div className="flex flex-col space-y-3 text-end">
                <div className="font-bold text-lg"> السعر </div>
                <div className="flex flex-wrap-reverse justify-end">
                  <span className="mr-1">ل.س</span>
                  {props.value.item.price}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 text-end">
              <div className="w-full flex justify-end font-bold text-lg">
                القياس واللون والكمية{' '}
              </div>
              {/* ////////////////////////////////// */}
              <div
                dir="rtl"
                className="w-full p-2 shadow-mapShadow rounded-lg h-[100px] overflow-x-auto sliderScroll flex items-center"
              >
                {/* {Object.keys(props.value.item.product.variations).map(function (
                  key,
                  index
                ) {
                  return (
                    // one size card
              
                  );
                })} */}
                <div
                  className="min-w-[200px] flex flex-col border-2 rounded-lg mx-2"
                  // key={index}
                >
                  {/* section for size and qty */}
                  <div className="font-semibold w-full text-center border-b-2 rounded-t-lg">
                    {props.value.item.size} - {props.value.item.quantity}
                  </div>
                  {/* 20683 */}
                  {/* section for colors */}
                  <div
                    dir="rtl"
                    className="flex justify-between overflow-x-auto sliderScroll rounded-b-lg"
                  >
                    {/* {props.value.item.product.variations[key].colors.map(
                          function (value, index) {
                            return (
                              
                            );
                          }
                        )} */}
                    <div className="w-fit h-fit rounded-full m-2">
                      <div
                        style={{
                          backgroundColor: `${props.value.item.color}`,
                          minWidth: '15px',
                        }}
                        className="h-4 rounded-full bg-black"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ////////////////////////////////// */}
            </div>

            <div className="flex w-full">
              <button className="px-4 py-3" onClick={() => close()}>
                إغلاق
              </button>
            </div>
          </motion.div>
          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>
        </>
      )}
    </Popup>
  );
}

export default ProductDetails;
