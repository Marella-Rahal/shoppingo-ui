import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { GiTeamUpgrade } from "react-icons/gi";
const Upgrade = () => {
  const [wepayCode, setWepayCode] = useState(false);
  return (
    <>
      <Navbar />
      <div
        id="coloredDiv"
        className="md:relative w-full min-h-screen md:h-screen flex items-center justify-center bg-gradient-to-tr from-gradientTo to-bgColor md:from-bgColor md:to-bgColor pt-28 pb-20 md:py-0"
      >
        <div
          id="imageDiv"
          className="hidden md:block custom-img bg-no-repeat bg-center w-[50%] h-full opacity-50"
        />

        <div
          id="gradientDiv"
          className="hidden md:block bg-gradient-to-l from-gradientTo to-bgColor w-[50%] h-full opacity-60"
        />

        <form
          id="form"
          className="md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] bg-bgColor rounded-xl shadow-md shadow-shadowColor p-7 w-[90%] md:w-[300px] flex flex-col space-y-5"
        >
          <GiTeamUpgrade className="text-effectColor text-[30px] self-center" />

          <input
            type="email"
            placeholder="ادخل الإيميل"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />
          <input
            type="text"
            placeholder="ادخل رقم الهاتف"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />
          <input
            type="text"
            placeholder="ادخل اسم المتجر"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />
          <input
            type="text"
            placeholder=" ادخل عنوان المتجر "
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />
          <div className="space-y-3">

            <h4 className="text-end text-textColor">: الدفع </h4>

            <div className="flex justify-between">

              <div className="flex items-center space-x-1">
                <label htmlFor="onHand" className="text-xs font-bold text-end">
                  عند التسليم
                </label>
                <input type="checkbox" id="onHand"/>
              </div>

              <div className="flex items-center space-x-1">
                <label htmlFor="wepay" className="text-xs font-bold text-end">
                  wepay عن طريق
                </label>
                <input type="checkbox" id="wepay" onChange={() => setWepayCode(prev => !prev)} />
              </div>

            </div>

            {wepayCode && (
              <input
                type="text"
                placeholder="wepay ادخل كود"
                className="w-full p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
              />
            )}
          </div>
          <button className="self-center p-2 hover:scale-[1.1]">
            ترقية الحساب
          </button>
        </form>

      </div>

      <style jsx>
        {`
          .custom-img {
            background-image: url("../authentication.svg");
          }

          @media (orientation: landscape) and (min-width: 767px) and (max-height: 711px) {
            #form {
              margin-block: 50px;
            }

            #imageDiv {
              padding-block: 400px;
            }

            #gradientDiv {
              padding-block: 400px;
            }
          }

          @media (orientation: landscape) and (min-width: 767px) and (max-height: 611px) {
            #form {
              margin-block: 100px;
            }

            #imageDiv {
              padding-block: 450px;
            }

            #gradientDiv {
              padding-block: 450px;
            }
          }

          @media (orientation: landscape) and (min-width: 767px) and (max-height: 511px) {
            #form {
              margin-block: 150px;
            }

            #imageDiv {
              padding-block: 500px;
            }

            #gradientDiv {
              padding-block: 500px;
            }
          }

          @media (orientation: landscape) and (min-width: 767px) and (max-height: 411px) {
            #form {
              margin-block: 200px;
            }

            #imageDiv {
              padding-block: 550px;
            }

            #gradientDiv {
              padding-block: 550px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Upgrade;
