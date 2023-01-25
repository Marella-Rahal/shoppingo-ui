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
              className="text-center self-center text-textColor hover:scale-[1.1] hover:underline"
            >
              إنشاء حساب جديد
            </Link>

            <input
              type="email"
              placeholder="ادخل الإيميل"
              required
              className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
            />
            <input
              type="password"
              placeholder="ادخل كلمة السر"
              required
              className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
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


      </AuthenticationBody>

    </>
  );
};

export default LogIn;
