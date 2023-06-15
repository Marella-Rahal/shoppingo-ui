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

          <GiTeamUpgrade className="text-effectColor dark:text-darkTextColor2 text-[30px] self-center" />

          <div className="flex space-x-3">

            <input
              type="number"
              placeholder="رقم الهاتف"
              required
              className="w-1/2 p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />
            <input
              type="email"
              placeholder="الإيميل"
              required
              className="w-1/2 p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />

          </div>

          <div className="flex space-x-3">

            <input
              type="text"
              placeholder="عنوان المتجر "
              required
              className="w-1/2 p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />

            <input
              type="text"
              placeholder="اسم المتجر"
              required
              className="w-1/2 p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />

          </div>
          
          <div className="space-y-3">

            <h4 className="text-end dark:text-darkBgColor">: الدفع </h4>

            <div className="flex justify-between">

              <div className="flex items-center space-x-1">
                <label htmlFor="onHand" className="text-xs font-bold text-center dark:text-darkBgColor">
                  عند التسليم
                </label>
                <input type="checkbox" id="onHand" />
              </div>

              <div className="flex items-center space-x-1">
                <label htmlFor="wepay" className="text-xs font-bold text-center dark:text-darkBgColor">
                  wepay عن طريق
                </label>
                <input type="checkbox" id="wepay" onChange={() => setWepayCode(prev => !prev)} />
              </div>

            </div>

            {wepayCode && (
              <input
                type="number"
                placeholder="wepay كود"
                className="w-full p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
              />
            )}
          </div>
          <button className="self-center p-2">
            ترقية الحساب
          </button>
        </form>
      </AuthenticationBody>

    </>
  );
};

export default Upgrade;
