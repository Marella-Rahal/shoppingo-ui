import React from "react";

const Colors = ({ color , productColor , setProductColor }) => {
  return (
    <>
      <input
        type="radio"
        name="color"
        value={color}
        checked={color == productColor}
        onChange={(e) => setProductColor(e.target.value)}
        className="colors relative w-5 h-5 mt-3"
      />
      <style jsx>
        {`
          .colors::after {
            content: "";
            width: 20px;
            height: 20px;
            border-radius: 100%;
            position: absolute;
            background-color: ${color};
            box-shadow: 0px 0px 2px 1px rgba(128, 128, 128, 0.5);
          }
          .colors:checked::after {
            width: 27px;
            height: 27px;
            top:-4px;
            left:-4px;
          }
        `}
      </style>
    </>
  );
};

export default Colors;
