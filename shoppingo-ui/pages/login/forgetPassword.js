import Navbar from "../../components/Navbar";
import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";

const ForgetPassword = () => {
  const [displayCode, setDisplayCode] = useState(false);
  const [displayPwd, setDisplayPwd] = useState(false);

  const sendCode = (e) => {
    e.preventDefault();
    setDisplayCode(true);
  };

  const checkCode = (e) => {
    e.preventDefault();
    setDisplayPwd(true);
  };

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

        <div
          id="form"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-47%] bg-bgColor rounded-xl shadow-md shadow-shadowColor p-7 w-[80%] md:w-[330px] flex flex-col space-y-4"
        >
          <RiLockPasswordLine className="text-[30px] text-effectColor self-center" />

          {/* //todo email */}
          <form className="flex flex-col" onSubmit={sendCode}>
            <input
              type="email"
              placeholder="ادخل الإيميل"
              required
              className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
            />
            <button className="mt-3 p-2 w-[120px] text-sm self-center  hover:scale-[1.1]">
              ارسل الكود
            </button>
          </form>

          {/*  //todo code */}

          {displayCode && (
            <form className="flex flex-col" onSubmit={checkCode}>
              <input
                type="text"
                placeholder="ادخل الكود الذي تم إرساله إليك"
                required
                className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
              />
              <button className="mt-3 p-2 w-[120px] text-sm self-center hover:scale-[1.1]">
                تحقق من الكود
              </button>
            </form>
          )}

          {/*  //todo password   */}

          {displayPwd && (
            <form className="flex flex-col space-y-4">
              <input
                type="password"
                placeholder="ادخل كلمة السر"
                required
                className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
              />
              <input
                type="password"
                placeholder=" أكد كلمة السر"
                required
                className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
              />
              <button className="text-sm self-center p-2 w-[120px] hover:scale-[1.1]">
                تحديث كلمة السر
              </button>
            </form>
          )}
        </div>
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
              margin-block: 165px;
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

export default ForgetPassword;
