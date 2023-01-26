import React, { useState } from "react";
import { BsCamera } from "react-icons/bs";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const router = useRouter();

  //*** to know if the user is a normal user or a seller or an admin : (0) user , (1) seller , (2) admin
  const [userStatus, setUserStatus] = useState(1);

  //***  to allow edit
  const [enableName, setEnableName] = useState(true);
  const [enableEmail, setEnableEmail] = useState(true);
  const [enableStore, setEnableStore] = useState(true);
  const [enableAddress, setEnableAddress] = useState(true);
  const [enableWepayCode, setEnableWepayCode] = useState(true);

  //! **********************
  
  //*** the default values for inputs (meaning the deafault values as defaultchecked ...) from redux
  //! if the user does not have a profile photo then we put default.jpg but if he has we put his photo

  //*** the values which will be sent to the backend
  const [img, setImg] = useState("default.jpg");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [store, setStore] = useState();
  const [address, setAddress] = useState();
  const [online, setOnline] = useState(true);
  const [onhand, setOnhand] = useState(false);
  const [wepayCode, setWepayCode] = useState();


  //************************************************ */

  //! change the image and send it to backend then change it in redux
  const updateImage = (e) => {
    console.log(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  return (
    <>
      <Navbar/>
      <div
        className={
          userStatus == 1
            ? "pt-28 px-4 md:px-8 w-full min-h-screen flex flex-col md:flex-row text-textColor dark:text-darkTextColor"
            : "pt-40 pb-10 px-4 md:px-8 w-full min-h-screen flex flex-col md:flex-row text-textColor dark:text-darkTextColor"
        }
      >
        {/* Left */}
        <div
          className={
            userStatus == 1
              ? "md:pt-20 w-full md:w-1/2 flex flex-col space-y-10  items-center"
              : "w-full md:w-1/2 flex flex-col space-y-5  items-center"
          }
        >
          <div className="relative">
            <img
              src={img}
              className="w-60 h-60 md:w-72 md:h-72 rounded-full shadow-md shadow-shadowColor"
            />

            <label
              htmlFor="profilePhoto"
              className="absolute bottom-1 right-9 md:bottom-2 md:right-10 w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-full bg-bgColor shadow-md shadow-shadowColor hover:scale-[1.1] cursor-pointer"
            >
              <BsCamera className="w-6 h-6 md:w-7 md:h-7 text-textColor" />
            </label>

            <input
              type="file"
              id="profilePhoto"
              className="hidden"
              onChange={updateImage}
            />
          </div>

          {userStatus == 2 ? (
            <button
              onClick={() => router.push("/profile/confirmSellers")}
              className="p-2 px-4 bg-gradient-to-l from-gradientFrom to-gradientTo hover:scale-[1.1] "
            >
              ترقية التجار
            </button>
          ) : userStatus == 1 ? (
            <button
              onClick={() => router.push("/profile/sellerDashboard")}
              className="p-2 px-4 bg-gradient-to-l from-gradientFrom to-gradientTo hover:scale-[1.1] "
            >
              إحصائياتي
            </button>
          ) : (
            <button
              onClick={() => router.push("/profile/upgrade")}
              className="p-2 bg-gradient-to-l from-gradientFrom to-gradientTo hover:scale-[1.1] "
            >
              ترقية الحساب
            </button>
          )}
        </div>

        {/* Right */}
        <div className="py-14 md:pt-0 md:pb-7 w-full md:w-1/2 flex flex-col space-y-5">
          <h3 className="text-end">معلوماتي الشخصية</h3>

          <label className="text-end">اسمي</label>
          <div className="flex h-10 justify-end space-x-5">
            <span
              onClick={() => setEnableName((prev) => !prev)}
              className="text-gray-500 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
            >
              تعديل
            </span>
            <input
              type="text"
              defaultValue="ماريلا"
              disabled={enableName}
              onChange={(e) => setName(e.target.value)}
              className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
            />
          </div>

          <label className="text-end">إيميلي</label>
          <div className="flex h-10 justify-end space-x-5">
            <span
              onClick={() => setEnableEmail((prev) => !prev)}
              className="text-gray-500 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
            >
              تعديل
            </span>
            <input
              type="email"
              defaultValue="marellarahhal@gmail.com"
              disabled={enableEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
            />
          </div>

          {userStatus == 1 ? (
            <>
              <label className="text-end">اسم متجري</label>
              <div className="flex justify-end h-10 space-x-5">
                <span
                  onClick={() => setEnableStore((prev) => !prev)}
                  className="text-gray-500 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
                >
                  تعديل
                </span>
                <input
                  type="text"
                  defaultValue="For_you"
                  disabled={enableStore}
                  onChange={(e) => setStore(e.target.value)}
                  className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
                />
              </div>

              <label className="text-end">عنوان متجري</label>
              <div className="flex justify-end h-10 space-x-5">
                <span
                  onClick={() => setEnableAddress((prev) => !prev)}
                  className="text-gray-500 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
                >
                  تعديل
                </span>
                <input
                  type="text"
                  defaultValue="حمص شارع الحضارة"
                  disabled={enableAddress}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
                />
              </div>

              <label className="text-end">: الدفع</label>
              <div className="flex justify-end space-x-14">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="onHand"
                    className="text-sm md:text-md font-bold text-end"
                  >
                    عند التسليم
                  </label>
                  <input
                    defaultChecked={false}
                    type="checkbox"
                    id="onHand"
                    onChange={() => setOnhand(prev => !prev)}
                    className="w-4 h-4"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <label
                    htmlFor="wepay"
                    className="text-sm md:text-md font-bold text-end"
                  >
                    wepay عن طريق
                  </label>
                  <input
                    defaultChecked={true}
                    type="checkbox"
                    id="wepay"
                    onChange={() => setOnline(prev => !prev)}
                    className="w-4 h-4"
                  />
                </div>
              </div>
              {
                online && (
                  <>
                    <label className="text-end">: wepay كود حسابي على </label>
                    <div className="flex justify-end h-10 space-x-5">
                      <span
                        onClick={() => setEnableWepayCode((prev) => !prev)}
                        className="text-gray-500 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
                      >
                        تعديل
                      </span>
                      <input
                        type="text"
                        defaultValue="1234567890"
                        disabled={enableWepayCode}
                        onChange={(e) => setWepayCode(e.target.value)}
                        className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
                      />
                    </div>
                  </>
                )
              }
            </>
          ) : (
            <></>
          )}

          <button className="self-end py-1 px-5 hover:scale-[1.1]">
            إرسال
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
