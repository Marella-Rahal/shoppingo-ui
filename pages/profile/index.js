import React, { useState } from 'react';
import { BsCamera } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { wrapper } from '../../Redux/Store'
import { parseCookies, setCookie } from 'nookies';
import axios from 'axios';
import { saveUser, selectUser } from '../../Redux/Slices/userSlice';
import { useSelector } from 'react-redux';
import FailToGet from '../../components/FailToGet'

const Profile = (props) => {

  const router = useRouter();
  const user = useSelector(selectUser);
  const [typeOfInfo, setTypeOfInfo]=useState('personal');

  //***  to allow edit
  const [enableFullName, setEnableFullName] = useState(true);
  const [enableStoreName, setEnableStoreName] = useState(true);
  const [enableLocation, setEnableLocation] = useState(true);
  const [enableWepayCode, setEnableWepayCode] = useState(true);

  const [fullName, setFullName] = useState(user?.fullName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPasswordd] = useState('');
  const [storeName, setStoreName] = useState(user?.storeName);
  const [location, setLocation] = useState(user?.location);
  const [paymentMethod,setPaymentMethod]=useState(user?.paymentMethod);
  const [online, setOnline] = useState(true);
  const [onhand, setOnhand] = useState(false);
  const [wepayCode, setWepayCode] = useState( user?.wepayCode !== undefined ? user?.wepayCode : '');

  //************************************************ */

  //! if the user does not have a profile photo then we put default.jpg but if he has we put his photo
  //! change the image and send it to backend then change it in redux
  const [img, setImg] = useState('default.jpg');
  const updateImage = (e) => {
    //! for preview
    if (e.target.files[0]) {
      document.getElementById('imgProfile').src = URL.createObjectURL(
        e.target.files[0]
      );
    }
  };

  return (
    <>
      {
          props.success ? (
            <>
              <Navbar />
              <div
                className='pt-28 md:pt-32 pb-10 px-4 md:px-8 w-full min-h-screen flex flex-col md:flex-row text-textColor dark:text-darkTextColor'
              >
                {/* Left */}
                <div
                  className='md:pt-16 w-full md:w-1/2 flex flex-col space-y-10  items-center'
                >
                  <div className="relative">
                    <img
                      src={img}
                      id="imgProfile"
                      className="w-48 h-48 md:w-72 md:h-72 rounded-full shadow-md shadow-shadowColor dark:shadow-none dark:border-[1px] border-shadowColor/30"
                    />

                    <label
                      htmlFor="profilePhoto"
                      className="absolute bottom-0 right-7 md:bottom-1 md:right-10 w-10 h-10 md:w-14 md:h-14 flex justify-center items-center rounded-full bg-bgColor shadow-md shadow-shadowColor dark:shadow-none dark:border-[1px] border-shadowColor/30 hover:scale-[1.1] cursor-pointer"
                    >
                      <BsCamera className="w-6 h-6 md:w-10 md:h-10 text-textColor dark:text-darkBgColor" />
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      id="profilePhoto"
                      className="hidden"
                      onChange={updateImage}
                    />
                  </div>
                  <div className="flex  space-x-5">
                    <button
                      onClick={() => router.push('/profile/myPurchases')}
                      className="p-2 bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl"
                    >
                      مشترياتي
                    </button>
                    {user.role == 'admin' ? (
                      <button
                        onClick={() => router.push('/profile/confirmSellers')}
                        className="p-2 bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl"
                      >
                        ترقية التجار
                      </button>
                    ) : user.role == 'seller' ? (
                      <button
                        onClick={() => router.push('/profile/sellerDashboard')}
                        className="p-2 bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl"
                      >
                        إحصائياتي
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push('/profile/upgrade')}
                        className="p-2 bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl"
                      >
                        ترقية الحساب
                      </button>
                    )}
                  </div>
                </div>

                {/* Right */}
                <div className="py-14 md:pt-0 md:pb-7 w-full md:w-1/2 flex flex-col space-y-5">

                  <div className='mb-1 flex items-center justify-end space-x-5 text-center font-bold text-lg'>
                    <div
                    onClick={ () => setTypeOfInfo('store') } 
                    className={ typeOfInfo == 'store' ? "select-none p-1 px-2 cursor-pointer rounded-md border-[1px] text-effectColor border-effectColor dark:text-darkTextColor dark:border-darkTextColor" : 'select-none p-1 px-2 cursor-pointer rounded-md text-darkTextColor2 border-[1px] border-darkTextColor2 hover:text-effectColor hover:border-effectColor dark:hover:text-darkTextColor dark:hover:border-darkTextColor' }>معلومات المتجر</div>
                    <div
                    onClick={ () => setTypeOfInfo('personal') } 
                    className={ typeOfInfo == 'personal' ? "select-none p-1 px-2 cursor-pointer rounded-md border-[1px] text-effectColor border-effectColor dark:text-darkTextColor dark:border-darkTextColor" : 'select-none p-1 px-2 cursor-pointer rounded-md text-darkTextColor2 border-[1px] border-darkTextColor2 hover:text-effectColor hover:border-effectColor dark:hover:text-darkTextColor dark:hover:border-darkTextColor'}>معلوماتي</div>
                  </div>
                  
                  {
                    typeOfInfo == 'personal' ? (
                      <>
                          <label className="text-end pr-2"> : الاسم الثلاثي </label>
                          <div className="flex h-10 justify-end space-x-5">
                            <span
                              onClick={() => setEnableFullName((prev) => !prev)}
                              className="select-none text-darkTextColor2 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
                            >
                              تعديل
                            </span>
                            <input
                              type="text"
                              disabled={enableFullName}
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                            />
                          </div>

                          <label className="text-end pr-2">: البريد الإلكتروني </label>
                          <input
                              type="email"
                              disabled={true}
                              value={user.email}
                              className="self-end h-10 w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                          />

                          <label className="text-end pr-2">أدخل كلمة المرور القديمة</label>
                          <input
                            type="password"
                            value={oldPassword}
                            onChange={(e)=>setOldPassword(e.target.value)}
                            className="self-end h-10 w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
                          />
                          <label className="text-end pr-2">أدخل كلمة المرور الجديدة</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e)=>setNewPasswordd(e.target.value)}
                            className="self-end h-10 w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
                          />
                      </>
                    ) : (
                      <>
                          <label className="text-end pr-2">: اسم المتجر</label>
                          <div className="flex justify-end h-10 space-x-5">
                            <span
                              onClick={() => setEnableStoreName((prev) => !prev)}
                              className="select-none text-darkTextColor2 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
                            >
                              تعديل
                            </span>
                            <input
                              type="text"
                              disabled={enableStoreName}
                              value={storeName}
                              onChange={(e) => setStoreName(e.target.value)}
                              className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                            />
                          </div>

                          <label className="text-end pr-2">: عنوان المتجر</label>
                          <div className="flex justify-end h-10 space-x-5">
                            <span
                              onClick={() => setEnableLocation((prev) => !prev)}
                              className="select-none text-darkTextColor2 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
                            >
                              تعديل
                            </span>
                            <input
                              type="text"
                              disabled={enableLocation}
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                            />
                          </div>

                          <label className="text-end pr-2">: الدفع</label>
                          <div className="flex justify-end space-x-14 pr-2">
                            <div className="flex items-center space-x-2">
                              <label
                                htmlFor="onHand"
                                className="select-none text-sm md:text-md font-bold text-end"
                              >
                                عند التسليم
                              </label>
                              <input
                                defaultChecked={false}
                                type="checkbox"
                                id="onHand"
                                onChange={() => setOnhand((prev) => !prev)}
                                className="w-4 h-4"
                              />
                            </div>
                            <div className="flex items-center space-x-1">
                              <label
                                htmlFor="wepay"
                                className="select-none text-sm md:text-md font-bold text-end"
                              >
                                wepay عن طريق
                              </label>
                              <input
                                defaultChecked={true}
                                type="checkbox"
                                id="wepay"
                                onChange={() => setOnline((prev) => !prev)}
                                className="w-4 h-4"
                              />
                            </div>
                          </div>
                          {
                            online && (
                              <>
                                <label className="text-end pr-2">: wepay كود حسابي على </label>
                                <div className="flex justify-end h-10 space-x-5">
                                  <span
                                    onClick={() => setEnableWepayCode((prev) => !prev)}
                                    className="select-none text-darkTextColor2 underline hover:text-textColor dark:hover:text-darkTextColor cursor-pointer self-center"
                                  >
                                    تعديل
                                  </span>
                                  <input
                                    type="text"
                                    disabled={enableWepayCode}
                                    value={wepayCode}
                                    onChange={(e) => setWepayCode(e.target.value)}
                                    className="w-[70%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                                  />
                                </div>
                              </>
                            )
                          }
                      </>
                    )
                  }


                  <div className='self-end w-[70%] flex justify-center'>
                    <button className="mt-1 py-1 px-5">إرسال</button>
                  </div>

                </div>

              </div>

            </>
          ) : (
            <FailToGet/>
          )
      }
    </>
  );
};

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps( store => async (context) =>{

  const cookies=parseCookies(context);
  const token=cookies.token;

  try {

        const res = await axios.get(`${process.env.server_url}/api/v2.0/auth/getUserInfo`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCookie(context, 'imgURL', res.data.user.imgURL, {
          path:'/',
          secure:true,
          sameSite:'none'
        })

        setCookie(context, 'role', res.data.user.role, {
          path:'/',
          secure:true,
          sameSite:'none'
        })

        store.dispatch(saveUser(res.data.user))

        return {
          props : {
            success : true
          }
        }
    
  } catch (error) {

        if(error?.response?.status == 401){

          return {
            redirect: {
              destination: '/login',
              permanent: false, // Set to false if it's a temporary redirect
            },
          }

        }else{

            return {
              props : {
                success : false
              }
            }

        }
    
  }

})
