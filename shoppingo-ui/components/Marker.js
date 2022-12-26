import React from "react";

const Marker = ({ image, color }) => {
  return (
    <>
      <button
        type="button"
        className="marker-btn after:top-[87%] xs:after:top-[89%] sm:after:top-[91%]"
        style={{ backgroundColor: color, borderColor: color }}
      >
        <img src={image} alt="product image" className="marker-img" />
      </button>
      <style jsx>
        {`
          // the div arround th button
          .marker {
            width: fit-content;
            height: fit-content;
            border-radius: 100%;
            z-index: 0;
          }

          // the button that containes th image
          .marker-btn {
            border: solid 3px;
            border-radius: 100%;
            width: 35px;
            height: 38px;
            padding: 0px;
          }

          // the tooltip
          .marker-btn::after {
            content: " ";
            position: absolute;
            left: 50%;
            margin-left: -10px;
            border-width: 10px;
            border-style: solid;
            border-top-color: inherit;
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
          }

          // the image
          .marker-img {
            width: 26px;
            height: 28px;
            border-radius: 100%;
            margin: auto;
          }
        `}
      </style>
    </>
  );
};

export default Marker;
