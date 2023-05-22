import React from "react";

const Sizes = ({ size }) => {
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
            border: solid 5px #d7271a;
          }
        `}
      </style>
    </>
  );
};

export default Sizes;
