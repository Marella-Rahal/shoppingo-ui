import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthenticationBody from "../../components/AuthenticationBody";
import Navbar from "../../components/Navbar";

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

      <Navbar/>
      <AuthenticationBody>

        <div className="flex flex-col space-y-5">
          <RiLockPasswordLine className="text-[30px] text-effectColor self-center" />

          {/* //todo email */}
          <form className="flex flex-col" onSubmit={sendCode}>
            <input
              type="email"
              placeholder="ادخل الإيميل"
              required
              className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
            />
            <button className="mt-3 p-2 w-[120px] text-sm self-center">
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
                className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
              />
              <button className="mt-3 p-2 w-[120px] text-sm self-center">
                تحقق من الكود
              </button>
            </form>
          )}

          {/*  //todo password   */}

          {displayPwd && (
            <form className="flex flex-col space-y-4" onSubmit={(e)=>e.preventDefault()}>
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
              <button className="text-sm self-center p-2 w-[120px]">
                تحديث كلمة السر
              </button>
            </form>
          )}
        </div>

      </AuthenticationBody>

    </>
  );
};

export default ForgetPassword;
