import React, { useState } from 'react';
import { BsCamera } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import { wrapper } from '../../Redux/Store'
import { parseCookies, setCookie } from 'nookies';
import axios from 'axios';
import { saveSeller, saveUser, selectSeller, selectUser } from '../../Redux/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import FailToGet from '../../components/FailToGet'
import { MdEdit } from 'react-icons/md';
import NotePopUp, { showPopUpNote } from '../../components/PopUp/NotePopUp';
import { ThreeDots } from 'react-loader-spinner';

const NAME_REGEX=/^([\p{L}\s]+ ){2}[\p{L}\s]+$/u;

const Profile = (props) => {

  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const user = useSelector(selectUser);
  const seller = useSelector(selectSeller);
  const dispatch = useDispatch();
  const [typeOfInfo, setTypeOfInfo]=useState('personal');
  const [noteMsg,setNoteMsg]=useState('');
  const [sendingStatus,setSendingStatus]=useState(false);

  const [enableFullName, setEnableFullName] = useState(true);
  const [enableStoreName, setEnableStoreName] = useState(true);
  const [enableLocation, setEnableLocation] = useState(true);
  const [enableWepayCode, setEnableWepayCode] = useState(true);

  const [fullName, setFullName] = useState(user?.fullName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPasswordd] = useState('');
  const [storeName, setStoreName] = useState(seller?.storeName);
  const [location, setLocation] = useState(seller?.location);
  const [paymentMethod,setPaymentMethod]=useState(seller?.paymentMethod);
  const handleCheckboxChange = (props) => {

    if(paymentMethod.includes(props)){

      setPaymentMethod( prev => prev.filter( x => x !== props ) )

    }else{

      setPaymentMethod( prev => [...prev,props] )

    }

  }
  const [wepayCode, setWepayCode] = useState(seller?.wepayCode == undefined ? '' : seller?.wepayCode );

  const [imgURL, setImgURL] = useState('');
  const [previewImgURL,setPreviewImgURL] =useState(user?.imgURL)
  const updateImage = (e) => {
    
    if (e.target.files[0]) {

      //! for preview
      setPreviewImgURL(URL.createObjectURL(
        e.target.files[0]
      ))
      //! to store it for the backend
      setImgURL(e.target.files[0]);

    }

  };
  
  const updateInfo =async (e) => {

      e.preventDefault();

      const fd=new FormData();

      if(oldPassword.length==0){
        setNoteMsg(
          <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
            الرجاء إدخال كلمة المرور القديمة لإجراء أي تعديل
          </h5>
        );
        showPopUpNote();
        return;
      }else{
        fd.append('oldPassword',oldPassword)
      }

      if( imgURL ){
        fd.append('imgURL',imgURL,imgURL.name);
      }

      if( !NAME_REGEX.test(fullName) ){
        setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>  الرجاء إدخال الاسم الثلاثي </span>   
            </h5>
          );
        showPopUpNote();
        return;
      }else{

        fd.append("fullName",fullName);

      }

      if( newPassword ){

        if(newPassword.length < 8){
          setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>كلمة المرور الجديدة غير صالحة</span>
                <span>يجب أن تكون أكثر من 7 أحرف </span>
            </h5>
          );
          showPopUpNote();
          return;
        }else{

          fd.append("newPassword",newPassword);

        }
        
      }

      if(user.role == 'seller'){

        if(storeName.length==0){

          setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                الرجاء إدخال اسم المتجر
            </h5>
          );
          showPopUpNote();
          return;

        }else{
          fd.append('storeName',storeName)
        }

        if(location.length==0){

          setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                الرجاء إدخال  عنوان المتجر
            </h5>
          );
          showPopUpNote();
          return;

        }else{
          fd.append('location',location)
        }

        if(paymentMethod.length==0){

          setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                الرجاء اختيار طريقة دفع واحدة على الأقل
            </h5>
          );
          showPopUpNote();
          return;

        }else{
          fd.append('paymentMethod',JSON.stringify(paymentMethod))
        }

        if( paymentMethod.includes('wepay') ){

          if(wepayCode.length!==6){
            setNoteMsg(
              <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                  <span>  كود تحويل غير صالح </span>
                  <span> يجب أن يكون مؤلف من 6 أرقام </span>   
              </h5>
            );
            showPopUpNote();
            return ;
          }else{
            fd.append('wepayCode',wepayCode);
          }

        }
      }

      // printing the form data values
      // for (const entry of fd.entries()) {
      //   console.log(entry[0] + ': ' + entry[1]);
      // }

      try {

        setSendingStatus(true);

        const res = await axios.put(`${process.env.server_url}/api/v2.0/auth/updateInfo`,fd,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if(!res.data.success){

          setSendingStatus(false);

          setNoteMsg(
            <h5 className='text-red-600 text-center'>{res.data.message}</h5>
          );

          showPopUpNote();

        }else{

          dispatch(saveUser(res.data.user));

          // Set the imgURL in the cookie
          setCookie(null, 'imgURL', res.data.user.imgURL, {
            secure: true, // Set to true if using HTTPS
            sameSite: 'none', // Adjust according to your requirements
          });

          setCookie(null, 'role', res.data.user.role , {
            secure:true,
            sameSite:'none'
          })

          res.data.user.role == 'seller' && dispatch(saveSeller(res.data.seller))

          setImgURL('');
          setEnableFullName(true);
          setOldPassword('');
          setNewPasswordd('');
          setEnableStoreName(true);
          setEnableLocation(true);
          !paymentMethod.includes('wepay') && setWepayCode('')
          setEnableWepayCode(true);

          setSendingStatus(false);
        }
        
      } catch (error) {

        setSendingStatus(false);

        setNoteMsg(
          <h5 className='text-red-600 text-center'>{error?.message}</h5>
        );

        showPopUpNote();
        
      }


  }

  return (
    <>
      {
          props.success ? (
            <>
              {
                sendingStatus && (
                  <div className='fixed z-[100] w-full h-full bg-black/30 flex justify-center items-center'>
                      <ThreeDots
                      width="75"
                      color="white"
                      visible={true}
                      /> 
                  </div>
                )
              }
              <NotePopUp noteMsg={noteMsg}/>
              <Navbar />
              <div
                className='pt-32 pb-4 px-4 md:px-8 w-full min-h-screen md:h-screen flex flex-col md:flex-row text-textColor dark:text-darkTextColor'
              >
                {/* Left */}
                <div
                  className='w-full md:w-1/2 flex flex-col space-y-10 justify-center items-center'
                >
                  {
                    typeOfInfo == 'personal' ? (
                        <div className="relative select-none">
                          <img
                            src={previewImgURL}
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
                    ) : (

                        <img
                          src={seller?.storeImageURL}
                          className="w-48 h-48 md:w-72 md:h-72 rounded-full shadow-md shadow-shadowColor dark:shadow-none dark:border-[1px] border-shadowColor/30"
                        />

                    )
                  }
                  
                  <div className="flex  space-x-5">
                    <button
                      onClick={() => router.push('/profile/myPurchases')}
                      className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl py-2 w-[110px]"
                    >
                      مشترياتي
                    </button>
                    {user.role == 'admin' ? (
                      <button
                        onClick={() => router.push('/profile/confirmSellers')}
                        className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl py-2 w-[110px]"
                      >
                        ترقية التجار
                      </button>
                    ) : user.role == 'seller' ? (
                      <button
                        onClick={() => router.push('/profile/sellerDashboard')}
                        className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl py-2 w-[110px]"
                      >
                        إحصائياتي
                      </button>
                    ) : (
                      <button
                        onClick={() => router.push('/profile/upgrade')}
                        className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl py-2 w-[110px]"
                      >
                        ترقية الحساب
                      </button>
                    )}
                  </div>
                </div>

                {/* Right */}
                <form onSubmit={updateInfo} className="py-14 md:pt-0 md:pb-7 w-full md:w-1/2 flex flex-col space-y-5">

                  <div className='mb-[10px] w-[100%] md:w-[80%] self-end flex items-center justify-center md:justify-end space-x-5 text-center font-bold text-[14px] md:text-base'>
                    {
                      user.role == 'seller' && (
                        <div
                        onClick={ () => setTypeOfInfo('store') } 
                        className={ typeOfInfo == 'store' ? "select-none py-2 w-1/2 cursor-pointer rounded-md border-[1px] text-effectColor border-effectColor dark:text-darkTextColor dark:border-darkTextColor" : 'select-none py-2 w-1/2 cursor-pointer rounded-md text-darkTextColor2 border-[1px] border-darkTextColor2 hover:text-effectColor hover:border-effectColor dark:hover:text-darkTextColor dark:hover:border-darkTextColor' }>معلومات المتجر</div>
                      )
                    }
                    
                    <div
                    onClick={ () => setTypeOfInfo('personal') } 
                    className={ typeOfInfo == 'personal' ? `select-none py-2 ${user.role !== 'seller' ? 'w-full md:w-1/2' : 'w-1/2' } cursor-pointer rounded-md border-[1px] text-effectColor border-effectColor dark:text-darkTextColor dark:border-darkTextColor` : `select-none py-2 ${user.role !== 'seller' ? 'w-full md:w-1/2' : 'w-1/2' } cursor-pointer rounded-md text-darkTextColor2 border-[1px] border-darkTextColor2 hover:text-effectColor hover:border-effectColor dark:hover:text-darkTextColor dark:hover:border-darkTextColor`}>معلوماتي</div>
                  </div>
                  
                  {
                    typeOfInfo == 'personal' ? (
                      <div className="h-full flex flex-col space-y-5 justify-center">
                          <div className='w-[100%] md:w-[80%] self-end flex justify-between items-center space-x-3'>

                            <div
                              className={`bg-darkTextColor ${enableFullName ? 'text-darkTextColor2' : 'text-textColor dark:text-darkBgColor' } px-2 py-[5px] rounded-lg cursor-pointer flex items-center justify-center shadow-lg`}
                              onClick={() => setEnableFullName((prev) => !prev)}
                            >
                              <MdEdit className="w-6 h-6" />
                            </div>
                            <label className="text-end pr-2"> : الاسم الثلاثي </label>

                          </div>    
                          <input
                            type="text"
                            disabled={enableFullName}
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="self-end h-10 w-[100%] md:w-[80%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                          />
                          
                          <label className="text-end pr-2">: البريد الإلكتروني </label>
                          <input
                              type="email"
                              disabled={true}
                              value={user.email}
                              className="self-end h-10 w-[100%] md:w-[80%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                          />

                          <label className="text-end pr-2">أدخل كلمة المرور القديمة</label>
                          <input
                            type="password"
                            value={oldPassword}
                            onChange={(e)=>setOldPassword(e.target.value)}
                            className="self-end h-10 w-[100%] md:w-[80%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
                          />
                          <label className="text-end pr-2">أدخل كلمة المرور الجديدة</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e)=>setNewPasswordd(e.target.value)}
                            className="self-end h-10 w-[100%] md:w-[80%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor"
                          />
                      </div>
                    ) : (
                      <div className="h-full flex flex-col space-y-5 justify-center">

                          <div className='w-[100%] md:w-[80%] self-end flex justify-between items-center space-x-3'>

                            <div
                              className={`bg-darkTextColor ${enableStoreName ? 'text-darkTextColor2' : 'text-textColor dark:text-darkBgColor' } px-2 py-[5px] rounded-lg cursor-pointer flex items-center justify-center shadow-lg`}
                              onClick={() => setEnableStoreName((prev) => !prev)}
                            >
                              <MdEdit className="w-6 h-6" />
                            </div>
                            <label className="text-end pr-2"> : اسم المتجر </label>

                          </div>             
                          <input
                            type="text"
                            disabled={enableStoreName}
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="self-end h-10 w-[100%] md:w-[80%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                          />
                          
                          <div className='w-[100%] md:w-[80%] self-end flex justify-between items-center space-x-3'>

                            <div
                              className={`bg-darkTextColor ${enableLocation ? 'text-darkTextColor2' : 'text-textColor dark:text-darkBgColor' } px-2 py-[5px] rounded-lg cursor-pointer flex items-center justify-center shadow-lg`}
                              onClick={() => setEnableLocation((prev) => !prev)}
                            >
                              <MdEdit className="w-6 h-6" />
                            </div>
                            <label className="text-end pr-2"> : عنوان المتجر </label>

                          </div>   
                          <input
                            type="text"
                            disabled={enableLocation}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="self-end h-10 w-[100%] md:w-[80%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                          />
                          

                          <label className="w-[100%] md:w-[80%] self-end text-end pr-2">: الدفع</label>
                          <div className="w-[100%] md:w-[80%] self-end flex justify-around space-x-3">

                            <div className="flex items-center space-x-2">
                              <label
                                htmlFor="onHand"
                                className="select-none text-sm md:text-md font-bold text-end"
                              >
                                عند التسليم
                              </label>
                              <input
                                type="checkbox"
                                id="onHand"
                                checked={paymentMethod.includes('on delivery')}
                                onChange={() => handleCheckboxChange('on delivery')}
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
                                type="checkbox"
                                id="wepay"
                                checked={paymentMethod.includes('wepay')}
                                onChange={() => handleCheckboxChange('wepay')}
                                className="w-4 h-4"
                              />
                            </div>

                          </div>
                          {
                            paymentMethod.includes('wepay') && (
                              <>
                                <div className='w-[100%] md:w-[80%] self-end flex justify-between items-center space-x-3'>

                                  <div
                                    className={`bg-darkTextColor ${enableWepayCode ? 'text-darkTextColor2' : 'text-textColor dark:text-darkBgColor' } px-2 py-[5px] rounded-lg cursor-pointer flex items-center justify-center shadow-lg`}
                                    onClick={() => setEnableWepayCode((prev) => !prev)}
                                  >
                                    <MdEdit className="w-6 h-6" />
                                  </div>
                                  <label className="text-end pr-2"> : wepay كود  </label>

                                </div> 
                                
                                <input
                                  type="text"
                                  disabled={enableWepayCode}
                                  value={wepayCode}
                                  onChange={(e) => setWepayCode(e.target.value)}
                                  className="self-end h-10 w-[100%] md:w-[80%] rounded-md outline-none text-end pr-2 shadow-sm shadow-shadowColor disabled:text-darkTextColor"
                                />
                                
                              </>
                            )
                          }
                      </div>
                    )
                  }


                  <div className='self-end w-[100%] md:w-[80%] flex justify-center'>
                    <button className="mt-[5px] py-1 px-5">حفظ التغييرات</button>
                  </div>

                </form>

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

        store.dispatch(saveUser(res.data.user))

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

        res.data.user.role == 'seller' && store.dispatch(saveSeller(res.data.seller)) 

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
