import React from "react";

const Classification = (props) => {
  return (
    <>
      {/* drop down */}
      <div className="absolute top-12 md:-right-10 bg-white rounded-lg shadow-md shadow-shadowColor hidden group-hover:flex text-sm font-bold">
        {/* left section */}
        <div className="flex flex-col items-end p-2 space-y-2">
          {props.woman && (
            <>
              {/* one label */}
              <div className="flex space-x-2 items-center">
                <label htmlFor="skirt" className="text-textColor">
                  تنورة
                </label>
                <input
                  type="checkbox"
                  id="skirt"
                  className="w-[14px] h-[14px]"
                />
              </div>
            </>
          )}
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="short" className="text-textColor">
              شورت
            </label>
            <input type="checkbox" id="short" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="bijama" className="text-textColor">
              بجامة
            </label>
            <input type="checkbox" id="bijama" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="hoody" className="text-textColor">
              هوديز
            </label>
            <input type="checkbox" id="hoody" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="hat" className="text-textColor">
              قبعة
            </label>
            <input type="checkbox" id="hat" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="scarve" className="text-textColor">
              وشاح
            </label>
            <input type="checkbox" id="scarve" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="tie" className="text-textColor text-xs font-bold">
              ربطة عنق
            </label>
            <input type="checkbox" id="tie" className="w-[14px] h-[14px]" />
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
                <label htmlFor="dress" className="text-textColor">
                  فستان
                </label>
                <input
                  type="checkbox"
                  id="dress"
                  className="w-[14px] h-[14px]"
                />
              </div>
            </>
          )}
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="jacket" className="text-textColor">
              جاكيت
            </label>
            <input type="checkbox" id="jacket" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="suit" className="text-textColor">
              طقم
            </label>
            <input type="checkbox" id="suit" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="pant" className="text-textColor">
              بنطال
            </label>
            <input type="checkbox" id="pant" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="shirt" className="text-textColor">
              قميص
            </label>
            <input type="checkbox" id="shirt" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="tshirt" className="text-textColor">
              كنزة
            </label>
            <input type="checkbox" id="tshirt" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor="belt" className="text-textColor">
              حزام
            </label>
            <input type="checkbox" id="belt" className="w-[14px] h-[14px]" />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label
              htmlFor="swimwear"
              className="text-textColor text-xs font-bold"
            >
              ملابس سباحة
            </label>
            <input
              type="checkbox"
              id="swimwear"
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Classification;
