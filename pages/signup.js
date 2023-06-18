import React, { useState } from "react";
import Link from "next/link";
import AuthenticationBody from "../components/AuthenticationBody";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { setCookie } from 'nookies'
import NotePopUp , {showPopUpNote} from '../components/PopUp/NotePopUp';
import { ThreeDots } from 'react-loader-spinner'
import axios from 'axios';
import { useDispatch } from "react-redux";
import {saveUser} from '../Redux/Slices/userSlice'

const NAME_REGEX=/^([\p{L}\s]+ ){2}[\p{L}\s]+$/u;
const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Signup = () => {

  const router=useRouter();
  const [noteMsg,setNoteMsg]=useState("");  
  const [sendingStatus,setSendingStatus]=useState(false);
  const dispatch=useDispatch();

  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');

  const sendInfo = async (e) => {

      e.preventDefault();

      if( !NAME_REGEX.test(fullName) ){
        setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>  الرجاء إدخال الاسم الثلاثي </span>   
            </h5>
          );
        showPopUpNote();
        return;
      }

      if(!EMAIL_REGEX.test(email)){
        setNoteMsg(
            <h5 className='text-red-600 text-center'>بريدإلكتروني غير صالح</h5>
        );
        showPopUpNote();
        return;
      }

      if(password.length < 8){
        setNoteMsg(
            <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                <span>كلمة مرور غير صالحة</span>
                <span>يجب أن تكون أكثر من 7 أحرف </span>
            </h5>
        );
        showPopUpNote();
        return;
      }

      if(password!==confirmPassword){
          setNoteMsg(
              <h5 className='text-red-600 text-center'>كلمة المرور غير مطابقة</h5>
          );
          showPopUpNote();
          return;
      }

      try {

        setSendingStatus(true);

        const res = await axios.post(`${process.env.server_url}/api/v2.0/auth/signup`,{
          fullName,email,password
        });

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
            href="/login"
            className="text-textColor dark:text-darkBgColor self-center hover:scale-[1.05 hover:underline"
          >
            لديك حساب؟
          </Link>

          <input
            type="text"
            placeholder="الاسم الثلاثي"
            required
            value={fullName}
            onChange={(e)=> setFullName(e.target.value)}
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            required
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <input
            type="password"
            placeholder="ادخل كلمة المرور"
            required
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <input
            type="password"
            placeholder=" أكد كلمة المرور"
            required
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
            className="p-2 outline-none text-end bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2"
          />
          <button
          disabled={sendingStatus}
          className="self-center p-0 w-[105px] h-[35px] flex justify-center items-center">
          { 
              !sendingStatus 
              ? "إنشاء حساب" 
              : <ThreeDots
                  width="30"
                  color="#ffffff"
                  visible={true}
                />                       
          }
          </button>
        </form>
      </AuthenticationBody>
    </>
  );
};

export default Signup;
