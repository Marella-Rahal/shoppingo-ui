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
      <AuthenticationBody upgrade={false}>

        <div className="flex flex-col space-y-5">
          <RiLockPasswordLine className="text-[30px] text-effectColor dark:text-darkTextColor2 self-center" />

          {/* //todo email */}
          <form className="flex space-x-5" onSubmit={sendCode}>
            <button className="p-2 w-[150px] font-bold text-[10px] xl:text-sm xl:font-normal">
              ارسل الكود
            </button>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              required
              className="w-full p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />
          </form>

          {/*  //todo code */}

          {displayCode && (
            <form className="flex space-x-5" onSubmit={checkCode}>
              <button className="p-2 w-[150px] font-bold text-[10px] xl:text-sm xl:font-normal">
                تحقق من الكود
              </button>
              <input
                type="text"
                placeholder="ادخل الكود"
                required
                className="w-full p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
              />
            </form>
          )}

          {/*  //todo password   */}

          {displayPwd && (
            <form className="flex flex-col space-y-4" onSubmit={(e)=>e.preventDefault()}>
              <input
                type="password"
                placeholder="ادخل كلمة المرور الجديدة"
                required
                className="p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
              />
              <input
                type="password"
                placeholder=" أكد كلمة المرور الجديدة"
                required
                className="p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
              />
              <button className="text-sm self-center p-2">
                تحديث كلمة المرور
              </button>
            </form>
          )}
        </div>

      </AuthenticationBody>

    </>
  );
};

export default ForgetPassword;
