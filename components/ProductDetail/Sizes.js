import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const Sizes = ({ size , productSize , setProductSize, setProductColor }) => {

  const { theme , setTheme } = useTheme();
  const [radioColor , setRadioColor] = useState('');
  useEffect(()=>{
    setRadioColor(theme == 'light' ? '#d7271a' : 'gray')
  },[theme])
  
  return (
    <>
      <div className="flex space-x-2 mt-2">
        <label htmlFor={size} className="uppercase font-semibold">
          {size}
        </label>
        <input
          type="radio"
          name="size"
          id={size}
          value={size}
          checked={size == productSize}
          onChange={(e) => {setProductSize(e.target.value);setProductColor('')} }
          className="sizes relative w-4 h-4 self-center"
        />
      </div>

      <style jsx>
        {`
          .sizes::after {
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 100%;
            position: absolute;
            background-color: white;
            box-shadow: 0px 0px 2px 1px rgba(128, 128, 128, 0.5);
          }
          .sizes:checked::after {
            border: solid 5px ${radioColor};
          }
        `}
      </style>
    </>
  );
};

export default Sizes;
