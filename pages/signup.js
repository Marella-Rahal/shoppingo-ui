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
            placeholder="ادخل الاسم"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
          />
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
          <input
            type="password"
            placeholder=" أكد كلمة السر"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
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
