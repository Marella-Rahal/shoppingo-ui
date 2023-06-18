import React, { useState } from "react";
import Link from "next/link";
import AuthenticationBody from "../../components/AuthenticationBody";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import axios from "axios";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";
import { setCookie } from "nookies";
import { saveUser } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

const LogIn = () => {

  const router=useRouter();
  const dispatch =useDispatch();
  const [noteMsg,setNoteMsg]=useState('');
  const [sendingStatus,setSendingStatus]=useState(false);

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const sendInfo = async (e) => {
      
      e.preventDefault();

      try {

        setSendingStatus(true);

        const res= await axios.post(`${process.env.server_url}/api/v2.0/auth/login`,{
          email , password
        })

        if(!res.data.success){

          setSendingStatus(false);

          setNoteMsg(
            <h5 className='text-red-600 text-center'>{res.data.message}</h5>
          );
          showPopUpNote();

        }else{

          // Set the token in the cookie
          setCookie(null, 'token', res.data.token, {
            secure: true, // Set to true if using HTTPS
            sameSite: 'none', // Adjust according to your requirements
          });

          // Set the imgURL in the cookie
          setCookie(null, 'imgURL', res.data.user.imgURL, {
              secure: true, // Set to true if using HTTPS
              sameSite: 'none', // Adjust according to your requirements
          });

          // Set the role in the cookie
          setCookie(null, 'role', res.data.user.role, {
              secure: true, // Set to true if using HTTPS
              sameSite: 'none', // Adjust according to your requirements
          });

          dispatch(saveUser(res.data.user));

          router.replace('/shop');

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
      <NotePopUp noteMsg={noteMsg}/>
      <Navbar/>
      <AuthenticationBody>

        <form className="flex flex-col space-y-5" onSubmit={sendInfo}>

            <Link
              href="/signup"
              className="text-center self-center text-textColor dark:text-darkBgColor hover:underline"
            >
              إنشاء حساب جديد
            </Link>

            <input
              type="email"
              placeholder="البريد الإلكتروني"
              required
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
            />

            <div className="flex justify-between space-x-2 md:space-x-0 ">
              <Link
                href="/login/forgetPassword"
                className="self-center text-center text-sm text-textColor dark:text-darkBgColor hover:underline"
              >
                هل نسيت كلمة المرور؟
              </Link>

              <button
              disabled={sendingStatus}
              className="text-sm p-0 w-[105px] h-[35px] flex justify-center items-center">
              { 
                  !sendingStatus 
                  ? "تسجيل الدخول" 
                  : <ThreeDots
                      width="30"
                      color="#ffffff"
                      visible={true}
                    />                       
              }
              </button>
            </div>

        </form>


      </AuthenticationBody>

    </>
  );
};

export default LogIn;
