import React from "react";
import Link from "next/link";
import AuthenticationBody from "../components/AuthenticationBody";
import Navbar from "../components/Navbar";

const Signup = () => {
  return (
    <>
      <Navbar/>
      <AuthenticationBody>
        <form className="flex flex-col space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Link
            href="/login"
            className="text-textColor dark:text-darkBgColor self-center hover:scale-[1.05 hover:underline"
          >
            لديك حساب؟
          </Link>

          <input
            type="text"
            placeholder="الاسم"
            required
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            required
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <input
            type="password"
            placeholder="ادخل كلمة المرور"
            required
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <input
            type="password"
            placeholder=" أكد كلمة المرور"
            required
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <button className="p-2 self-center">
            إنشاء الحساب
          </button>
        </form>
      </AuthenticationBody>
    </>
  );
};

export default Signup;
