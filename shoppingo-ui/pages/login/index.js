import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";

const Index = () => {
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
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-bgColor rounded-xl shadow-md shadow-shadowColor p-7 w-[80%] md:w-[310px] flex flex-col space-y-10"
        >
          <Link
            href="/signup"
            className="text-center self-center text-textColor hover:scale-[1.1] hover:underline"
          >
            إنشاء حساب جديد
          </Link>

          <input
            type="email"
            placeholder="ادخل الإيميل"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />
          <input
            type="password"
            placeholder="ادخل كلمة السر"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />

          <div className="flex justify-between space-x-2 md:space-x-0 ">
            <Link
              href="/login/forgetPassword"
              className="self-center text-center text-sm text-textColor hover:scale-[1.1] hover:underline"
            >
              هل نسيت كلمة السر؟
            </Link>

            <button className="text-sm p-2 hover:scale-[1.1]">
              تسجيل الدخول
            </button>
          </div>
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

export default Index;
