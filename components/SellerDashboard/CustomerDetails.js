import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import {motion} from 'framer-motion';

function CustomerDetails(props) {
  const [change, setChange] = useState(true);
  return (
    <Popup
      trigger={
        <button
          className={`${
            props.value.page1 ? 'px-2 mb-5 md:mb-0' : 'px-6'
          }  py-3 md:mr-2 my-2 md:my-0`}
        >
          {' '}
          {props.value.page1 && 'معلومات المستخدم'}
          {props.value.page2 && ' معلوماتي'}{' '}
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <>
          <motion.div
          initial={{opacity:0,y:'-200%',x:'-50%'}} 
          animate={{opacity:1,y:'-50%',x:'-50%'}} 
          transition={{ease:'easeInOut',duration:0.7}} 
          className="fixed z-10 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] flex flex-col justify-between shadow-2xl rounded-lg bg-gray-50 w-[90%] md:w-[600px] p-3 md:p-5">
            <div className="flex flex-col w-full">
              {/* first row */}
              <div className="flex md:flex-row flex-col-reverse w-full justify-between md:pb-5">
                {/* email */}
                <div className="flex flex-col space-y-2 text-right w-full md:w-1/2 pb-2">
                  <div className="font-bold text-lg text-textColor dark:text-darkBgColor">الإيميل</div>
                  <input
                    disabled={change}
                    type="Text"
                    defaultValue={`${props.value.value.email}`}
                    className="rounded-md outline-none text-end py-1 pr-2 shadow-sm shadow-shadowColor"
                  />
                </div>
                {/* full name */}
                <div className="flex flex-col space-y-2 text-right w-full md:w-1/2 pb-2 md:ml-3 ">
                  <div className="font-bold text-lg text-textColor dark:text-darkBgColor">الاسم الثلاثي</div>
                  <input
                    disabled={change}
                    type="Text"
                    defaultValue={`${props.value.value.fullName}`}
                    className="rounded-md outline-none text-end py-1 pr-2 shadow-sm shadow-shadowColor"
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col-reverse w-full justify-between md:pb-5">
                {/* city */}
                <div className="flex flex-col space-y-2 text-right w-full md:w-1/2  pb-2">
                  <div className="font-bold text-lg text-textColor dark:text-darkBgColor">المدينة</div>
                  <input
                    disabled={change}
                    type="Text"
                    defaultValue={`${props.value.value.city}`}
                    className="rounded-md outline-none text-end py-1 pr-2 shadow-sm shadow-shadowColor"
                  />
                </div>
                {/* number */}
                <div className="flex flex-col space-y-2 text-right w-full md:w-1/2 pb-2 md:ml-3">
                  <div className="font-bold text-lg text-textColor dark:text-darkBgColor">رقم الموبايل</div>
                  <input
                    disabled={change}
                    type="Text"
                    defaultValue={`${props.value.value.number}`}
                    className="rounded-md outline-none text-end py-1 pr-2 shadow-sm shadow-shadowColor"
                  />
                </div>
              </div>
              {/* address */}
              <div className="flex flex-col space-y-2 text-right w-full pb-2">
                <div className="font-bold text-lg text-textColor dark:text-darkBgColor">العنوان</div>
                <input
                  disabled={change}
                  type="Text"
                  defaultValue={`${props.value.value.Address}`}
                  className="rounded-md outline-none text-end py-1 pr-2 shadow-sm shadow-shadowColor"
                />
              </div>
            </div>

            <div className="flex w-full justify-between mt-5">
              <button
                className="px-4 py-3"
                onClick={() => close()}
              >
                إغلاق
              </button>
              {props.value.page2 && (
                <button
                  onClick={() => {
                    setChange(!change);
                  }}
                  className="px-4 py-3"
                >
                  {change ? 'تعديل' : 'تم'}
                </button>
              )}
            </div>
          </motion.div>
          <div className="z-0 relative w-screen h-screen bg-black opacity-50"></div>
        </>
      )}
    </Popup>
  );
}

export default CustomerDetails;
