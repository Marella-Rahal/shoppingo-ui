import React, { useState } from "react";
import { GiTeamUpgrade } from "react-icons/gi";
import AuthenticationBody from "../../components/AuthenticationBody";
import Navbar from "../../components/Navbar";
const Upgrade = () => {
  const [wepayCode, setWepayCode] = useState(false);
  return (
    <>
      <Navbar/>
      <AuthenticationBody>

        <form className="flex flex-col space-y-5" onSubmit={(e) => e.preventDefault()}>

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
                <label htmlFor="onHand" className="text-xs font-bold text-end dark:text-textColor">
                  عند التسليم
                </label>
                <input type="checkbox" id="onHand" />
              </div>

              <div className="flex items-center space-x-1">
                <label htmlFor="wepay" className="text-xs font-bold text-end dark:text-textColor">
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
