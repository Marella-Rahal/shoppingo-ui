import React from "react";
import Navbar from "../../components/Navbar";
import { GiTeamUpgrade } from "react-icons/gi";
const Upgrade = () => {
  return (
    <>
      <Navbar />
      <div
        id="coloredDiv"
        className="relative w-full min-h-screen md:h-screen flex bg-gradient-to-tr from-gradientTo to-bgColor md:bg-gradient-to-tr md:from-bgColor md:to-bgColor"
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
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-bgColor rounded-xl shadow-md shadow-shadowColor p-7 w-[80%] md:w-[300px] flex flex-col space-y-5"
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
          <div className="space-y-2">
            <h4 className="text-end text-textColor">: الدفع </h4>
            <div className="flex justify-between">
              <div className="flex items-center space-x-1">
                <label htmlFor="onHand" className="text-xs font-bold text-end">
                  عند التسليم
                </label>
                <input type="checkbox" id="onHand" />
              </div>
              <div className="flex items-center space-x-1">
                <label htmlFor="wepay" className="text-xs font-bold text-end">
                  wepay عن طريق{" "}
                </label>
                <input type="checkbox" id="wepay" />
              </div>
            </div>
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

          @media (orientation: landscape) and (max-width: 767px) and (max-height: 673px) {
            #coloredDiv {
              padding: 336px;
            }
          }
          @media (orientation: landscape) and (min-width: 767px) and (max-height: 600px) {
            #form {
              margin-block: 50px;
            }

            #imageDiv {
              padding-block: 350px;
            }

            #gradientDiv {
              padding-block: 350px;
            }
          }

          @media (orientation: landscape) and (min-width: 767px) and (max-height: 599px) {
            #form {
              margin-block: 140px;
            }

            #imageDiv {
              padding-block: 350px;
            }

            #gradientDiv {
              padding-block: 350px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Upgrade;
