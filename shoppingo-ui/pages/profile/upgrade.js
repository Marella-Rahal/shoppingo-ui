import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { GiTeamUpgrade } from "react-icons/gi";
import AuthenticationBody from "../../components/AuthenticationBody";
const Upgrade = () => {
  const [wepayCode, setWepayCode] = useState(false);
  return (
    <>
      <Navbar />
      <AuthenticationBody>
        <form
          id="form"
          className="md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] bg-bgColor rounded-xl shadow-md shadow-shadowColor p-7 w-[90%] md:w-[300px] flex flex-col space-y-5"
        >
          <GiTeamUpgrade className="text-effectColor text-[30px] self-center" />

          <input
            type="email"
            placeholder="ادخل الإيميل"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
          />
          <input
            type="text"
            placeholder="ادخل رقم الهاتف"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
          />
          <input
            type="text"
            placeholder="ادخل اسم المتجر"
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
          />
          <input
            type="text"
            placeholder=" ادخل عنوان المتجر "
            required
            className="p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
          />
          <div className="space-y-3">

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
                  wepay عن طريق
                </label>
                <input type="checkbox" id="wepay" onChange={() => setWepayCode(prev => !prev)} />
              </div>

            </div>

            {wepayCode && (
              <input
                type="text"
                placeholder="wepay ادخل كود"
                className="w-full p-2 outline-none text-end rounded-lg shadow-md shadow-shadowColor border-effectColor focus:border-2"
              />
            )}
          </div>
          <button className="self-center p-2 hover:scale-[1.1]">
            ترقية الحساب
          </button>
        </form>
      </AuthenticationBody>

    </>
  );
};

export default Upgrade;
