import React, { useEffect, useState } from "react";

const Classification = (props) => {
  //** for putting htmlfor and id for every input and label */
  const [gender, setGender] = useState("");
  useEffect(() => {
    props.woman == true ? setGender("woman") : setGender("man");
  }, []);
  //************************ */

  return (
    <>
      {/* drop down */}
      <div className="absolute top-[70px] left-[1px] md:top-[50px] md:-left-[37px] bg-white rounded-lg shadow-md shadow-shadowColor hidden group-hover:flex text-sm font-bold">
        {/* left section */}
        <div className="flex flex-col items-end p-2 space-y-2">
          {props.woman && (
            <>
              {/* one label */}
              <div className="flex space-x-2 items-center">
                <label htmlFor={`${gender} + skirt`} className="text-textColor">
                  تنورة
                </label>
                <input
                  type="checkbox"
                  id={`${gender} + skirt`}
                  className="w-[14px] h-[14px]"
                />
              </div>
            </>
          )}
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + short`} className="text-textColor">
              شورت
            </label>
            <input
              type="checkbox"
              id={`${gender} + short`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + bijama`} className="text-textColor">
              بجامة
            </label>
            <input
              type="checkbox"
              id={`${gender} + bijama`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + hoody`} className="text-textColor">
              هوديز
            </label>
            <input
              type="checkbox"
              id={`${gender} + hoody`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + hat`} className="text-textColor">
              قبعة
            </label>
            <input
              type="checkbox"
              id={`${gender} + hat`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + scarve`} className="text-textColor">
              وشاح
            </label>
            <input
              type="checkbox"
              id={`${gender} + scarve`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label
              htmlFor={`${gender} + tie`}
              className="text-textColor text-end"
            >
              ربطة عنق
            </label>
            <input
              type="checkbox"
              id={`${gender} + tie`}
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
        {/* middle */}
        <div className="min-h-full w-[3px] mx-1 bg-shadowColor/20" />
        {/* right section */}
        <div className="flex flex-col items-end p-2 space-y-2">
          {props.woman && (
            <>
              {/* one label */}
              <div className="flex space-x-2 items-center">
                <label htmlFor={`${gender} + dress`} className="text-textColor">
                  فستان
                </label>
                <input
                  type="checkbox"
                  id={`${gender} + dress`}
                  className="w-[14px] h-[14px]"
                />
              </div>
            </>
          )}
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + jacket`} className="text-textColor">
              جاكيت
            </label>
            <input
              type="checkbox"
              id={`${gender} + jacket`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + suit`} className="text-textColor">
              طقم
            </label>
            <input
              type="checkbox"
              id={`${gender} + suit`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + pant`} className="text-textColor">
              بنطال
            </label>
            <input
              type="checkbox"
              id={`${gender} + pant`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + shirt`} className="text-textColor">
              قميص
            </label>
            <input
              type="checkbox"
              id={`${gender} + shirt`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + tshirt`} className="text-textColor">
              كنزة
            </label>
            <input
              type="checkbox"
              id={`${gender} + tshirt`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + belt`} className="text-textColor">
              حزام
            </label>
            <input
              type="checkbox"
              id={`${gender} + belt`}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label
              htmlFor={`${gender} + swimwear`}
              className="text-textColor text-end"
            >
              ملابس سباحة
            </label>
            <input
              type="checkbox"
              id={`${gender} + swimwear`}
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Classification;
