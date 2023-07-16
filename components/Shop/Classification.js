import React, { useEffect, useState } from "react";

const Classification = ({ woman , WShow , MShow , setProducts , uniqueProducts ,shopRoute }) => {

  //** for putting htmlfor and id for every input and label */
  const [gender, setGender] = useState("");
  useEffect(() => {
    woman == true ? setGender("female") : setGender("male");
  }, []);
  //************************ */

  const [selectedOptions,setSelectedOptions]=useState([]);

  const handleCheckBoxChange = (type) => {

    // remove the value from the selectedOptions or adding it
    if(selectedOptions.includes(type)){
      setSelectedOptions( prev => prev.filter( t => t!= type ) )
    }else{
      setSelectedOptions( [...selectedOptions , type ] )
    }

  }

  useEffect(()=>{

    if(selectedOptions.length!==0){

      // Filter your data based on the selected options
      const filteredData = uniqueProducts.filter((p) => {
        // Check if any of the selected options matches the product
        return selectedOptions.some((option) => ( shopRoute ? (p.shippestProduct.type == option && p.shippestProduct.gender == gender) : (p.product.type == option && p.shippestProduct.gender == gender) ) );
      });

      setProducts(filteredData);

    }else{
      setProducts(uniqueProducts);
    }

  },[selectedOptions])

  return (
    <>
      {/* drop down */}
      <div className={`absolute top-[70px] left-[1px] md:top-[50px] md:-left-[37px] bg-white text-textColor dark:text-darkBgColor rounded-lg shadow-md shadow-shadowColor ${ (WShow || MShow) ? 'flex' : 'hidden' } text-sm font-bold select-none`}>
        {/* left section */}
        <div className="flex flex-col items-end p-2 space-y-2">
          {woman && (
            <>
              {/* one label */}
              <div className="flex space-x-2 items-center">
                <label htmlFor={`${gender} + skirt`}>
                  تنورة
                </label>
                <input
                  type="checkbox"
                  id={`${gender} + skirt`}
                  checked={selectedOptions.includes("تنورة")}
                  onChange={() => handleCheckBoxChange("تنورة")}
                  className="w-[14px] h-[14px]"
                />
              </div>
            </>
          )}
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + short`}>
              شورت
            </label>
            <input
              type="checkbox"
              id={`${gender} + short`}
              checked={selectedOptions.includes("شورت")}
              onChange={() => handleCheckBoxChange("شورت")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + bijama`}>
              بجامة
            </label>
            <input
              type="checkbox"
              id={`${gender} + bijama`}
              checked={selectedOptions.includes("بجامة")}
              onChange={() => handleCheckBoxChange("بجامة")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + hoody`}>
              هوديز
            </label>
            <input
              type="checkbox"
              id={`${gender} + hoody`}
              checked={selectedOptions.includes("هوديز")}
              onChange={() => handleCheckBoxChange("هوديز")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + hat`}>
              قبعة
            </label>
            <input
              type="checkbox"
              id={`${gender} + hat`}
              checked={selectedOptions.includes("قبعة")}
              onChange={() => handleCheckBoxChange("قبعة")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + scarve`}>
              وشاح
            </label>
            <input
              type="checkbox"
              id={`${gender} + scarve`}
              checked={selectedOptions.includes("وشاح")}
              onChange={() => handleCheckBoxChange("وشاح")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label
              htmlFor={`${gender} + tie`}
              className="text-end"
            >
              ربطة عنق
            </label>
            <input
              type="checkbox"
              id={`${gender} + tie`}
              checked={selectedOptions.includes("ربطة عنق")}
              onChange={() => handleCheckBoxChange("ربطة عنق")}
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
        {/* middle */}
        <div className="min-h-full w-[3px] mx-1 bg-shadowColor/20" />
        {/* right section */}
        <div className="flex flex-col items-end p-2 space-y-2">
          {woman && (
            <>
              {/* one label */}
              <div className="flex space-x-2 items-center">
                <label htmlFor={`${gender} + dress`}>
                  فستان
                </label>
                <input
                  type="checkbox"
                  id={`${gender} + dress`}
                  checked={selectedOptions.includes("فستان")}
                  onChange={() => handleCheckBoxChange("فستان")}
                  className="w-[14px] h-[14px]"
                />
              </div>
            </>
          )}
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + jacket`}>
              جاكيت
            </label>
            <input
              type="checkbox"
              id={`${gender} + jacket`}
              checked={selectedOptions.includes("جاكيت")}
              onChange={() => handleCheckBoxChange("جاكيت")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + suit`}>
              طقم
            </label>
            <input
              type="checkbox"
              id={`${gender} + suit`}
              checked={selectedOptions.includes("طقم")}
              onChange={() => handleCheckBoxChange("طقم")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + pant`}>
              بنطال
            </label>
            <input
              type="checkbox"
              id={`${gender} + pant`}
              checked={selectedOptions.includes("بنطال")}
              onChange={() => handleCheckBoxChange("بنطال")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + shirt`}>
              قميص
            </label>
            <input
              type="checkbox"
              id={`${gender} + shirt`}
              checked={selectedOptions.includes("قميص")}
              onChange={() => handleCheckBoxChange("قميص")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + tshirt`}>
              كنزة
            </label>
            <input
              type="checkbox"
              id={`${gender} + tshirt`}
              checked={selectedOptions.includes("كنزة")}
              onChange={() => handleCheckBoxChange("كنزة")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label htmlFor={`${gender} + belt`}>
              حزام
            </label>
            <input
              type="checkbox"
              id={`${gender} + belt`}
              checked={selectedOptions.includes("حزام")}
              onChange={() => handleCheckBoxChange("حزام")}
              className="w-[14px] h-[14px]"
            />
          </div>
          {/* one label */}
          <div className="flex space-x-2 items-center">
            <label
              htmlFor={`${gender} + swimwear`}
              className="text-end"
            >
              ملابس سباحة
            </label>
            <input
              type="checkbox"
              id={`${gender} + swimwear`}
              checked={selectedOptions.includes("ملابس سباحة")}
              onChange={() => handleCheckBoxChange("ملابس سباحة")}
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Classification;
