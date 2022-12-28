import React from "react";

const Colors = ({ color }) => {
  return (
    <>
      <input
        type="radio"
        name="color"
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
            box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
          }
          .colors:checked::after {
            content: "";
            width: 20px;
            height: 20px;
            border-radius: 100%;
            position: absolute;
            background-color: white;
            box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
            border: solid 6px #111d4a;
          }
        `}
      </style>
    </>
  );
};

export default Colors;
