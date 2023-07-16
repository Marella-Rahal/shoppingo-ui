import React, { useEffect, useState } from "react";

const Classification = ({ woman , WShow , MShow , setProducts , uniqueProducts ,shopRoute ,selectedOptionsForMale ,selectedOptionsForFemale , setSelectedOptionsForFemale , setSelectedOptionsForMale  }) => {

  //** for putting htmlfor and id for every input and label */
  const [gender, setGender] = useState("");
  useEffect(() => {
    woman == true ? setGender("female") : setGender("male");
  }, []);
  //************************ */

  const handleCheckBoxChange = (type) => {

    // remove the value from the selectedOptions or adding it
    if(woman){
      if(selectedOptionsForFemale.includes(type)){
        setSelectedOptionsForFemale( prev => prev.filter( t => t!= type ) )
      }else{
        setSelectedOptionsForFemale( [...selectedOptionsForFemale , type ] )
      }
    }else{
      if(selectedOptionsForMale.includes(type)){
        setSelectedOptionsForMale( prev => prev.filter( t => t!= type ) )
      }else{
        setSelectedOptionsForMale( [...selectedOptionsForMale , type ] )
      }
    }
    

  }

  useEffect(()=>{

    if(selectedOptionsForFemale.length !== 0 || selectedOptionsForMale.length !== 0){

      // Filter your data based on the selected options
      const filteredData = uniqueProducts.filter((p) => {
        // Check if any of the selected options matches the product
        return selectedOptionsForFemale.some((option) => ( shopRoute ? (p.shippestProduct.type == option && p.shippestProduct.gender == 'female' ) : (p.product.type == option && p.product.gender == 'female') )) || selectedOptionsForMale.some((option) => ( shopRoute ? (p.shippestProduct.type == option && p.shippestProduct.gender == 'male' ) : (p.product.type == option && p.product.gender == 'male') )) ;

      });

      setProducts(filteredData);

    }else{

      setProducts(uniqueProducts);

    }

  },[selectedOptionsForMale , selectedOptionsForFemale])

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
                  checked={selectedOptionsForFemale.includes("تنورة")}
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
              checked={woman? selectedOptionsForFemale.includes("شورت") : selectedOptionsForMale.includes("شورت") }
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
              checked={woman? selectedOptionsForFemale.includes("بجامة") : selectedOptionsForMale.includes("بجامة")}
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
              checked={woman? selectedOptionsForFemale.includes("هوديز") : selectedOptionsForMale.includes("هوديز")}
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
              checked={woman? selectedOptionsForFemale.includes("قبعة") : selectedOptionsForMale.includes("قبعة")}
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
              checked={woman? selectedOptionsForFemale.includes("وشاح") : selectedOptionsForMale.includes("وشاح")}
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
              checked={woman? selectedOptionsForFemale.includes("ربطة عنق") : selectedOptionsForMale.includes("ربطة عنق")}
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
                  checked={selectedOptionsForFemale.includes("فستان")}
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
              checked={woman? selectedOptionsForFemale.includes("جاكيت") : selectedOptionsForMale.includes("جاكيت")}
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
              checked={woman? selectedOptionsForFemale.includes("طقم") : selectedOptionsForMale.includes("طقم")}
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
              checked={woman? selectedOptionsForFemale.includes("بنطال") : selectedOptionsForMale.includes("بنطال")}
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
              checked={woman? selectedOptionsForFemale.includes("قميص") : selectedOptionsForMale.includes("قميص")}
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
              checked={woman? selectedOptionsForFemale.includes("كنزة") : selectedOptionsForMale.includes("كنزة")}
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
              checked={woman? selectedOptionsForFemale.includes("حزام") : selectedOptionsForMale.includes("حزام")}
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
              checked={woman? selectedOptionsForFemale.includes("ملابس سباحة") : selectedOptionsForMale.includes("ملابس سباحة")}
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
