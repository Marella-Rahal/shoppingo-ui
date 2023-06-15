import React from "react";
import Link from "next/link";
import AuthenticationBody from "../../components/AuthenticationBody";
import Navbar from "../../components/Navbar";

const LogIn = () => {
  return (
    <>
      <Navbar/>
      <AuthenticationBody>

        <form className="flex flex-col space-y-5" onSubmit={(e) => e.preventDefault()}>

            <Link
              href="/signup"
              className="text-center self-center text-textColor dark:text-darkBgColor hover:underline"
            >
              إنشاء حساب جديد
            </Link>

            <input
              type="email"
              placeholder="البريد الإلكتروني"
              required
              className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              required
              className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />

            <div className="flex justify-between space-x-2 md:space-x-0 ">
              <Link
                href="/login/forgetPassword"
                className="self-center text-center text-sm text-textColor dark:text-darkBgColor hover:underline"
              >
                هل نسيت كلمة المرور؟
              </Link>

              <button className="text-sm p-2">
                تسجيل الدخول
              </button>
            </div>

        </form>


      </AuthenticationBody>

    </>
  );
};

export default LogIn;
