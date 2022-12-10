import React from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const Signup = () => {
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
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-bgColor rounded-xl shadow-md shadow-shadowColor p-7 w-[80%] md:w-[300px] flex flex-col space-y-7"
        >
          <Link
            href="/login"
            className="text-textColor self-center hover:scale-[1.1] hover:underline"
          >
            لديك حساب؟
          </Link>

          <input
            type="text"
            placeholder="ادخل الاسم"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />
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
          <input
            type="password"
            placeholder=" أكد كلمة السر"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor"
          />
          <button className="p-2 self-center hover:scale-[1.1]">
            إنشاء الحساب
          </button>
        </form>
      </div>

      <style jsx>
        {`
          .custom-img {
            background-image: url("authentication.svg");
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

export default Signup;
