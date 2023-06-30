import React, { useEffect, useState } from 'react';
import { GiTeamUpgrade } from 'react-icons/gi';
import AuthenticationBody from '../../components/AuthenticationBody';
import Navbar from '../../components/Navbar';
import NotePopUp, { showPopUpNote } from '../../components/PopUp/NotePopUp';
import usePosition from '../../hooks/usePosition';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/router';

const PHONE_REGEX=/^09\d{8}$/

const Upgrade = () => {

  //! ******
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const [sendingStatus, setSendingStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [goBack , setGoBack ] = useState(false);

  const [coords, error] = usePosition();
  console.log(coords)

  const [storePhoneNumber, setStorePhoneNumber] = useState('');
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState([]);
  const handleCheckboxChange = (props) => {

    if(paymentMethod.includes(props)){

      setPaymentMethod( prev => prev.filter( x => x !== props ) )

    }else{

      setPaymentMethod( prev => [...prev,props] )

    }

  }
  const [wepayCode, setWepayCode] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [previewImgURL, setPreviewImgURL] = useState('../storePhoto.webp');


  useEffect(() => {
    setMsg('سيتم الوصول إلى إحداثيات موقعك بشكل تلقائي من أجل وضعها على الخريطة كموقع للمتجر لذلك الرجاء المتابعة من موقع المتجر لملء البيانات المطلوبة')
    showPopUpNote();
  }, []);

  const sendData = async (e) => {

    e.preventDefault();

    const fd = new FormData();
    
    if (coords.length == 0) {

      setMsg('فشلنا في الحصول على إحداثياتك  , انتظر قليلاً وأعد المحاولة مرة أخرى');
      showPopUpNote();
      return;

    } else {

      fd.append('coo', JSON.stringify(coords));

    }

    if (imgURL) {

      fd.append('storeImageURL', imgURL, imgURL.name);

    } else {

      setMsg('الرجاء رفع صورة المتجر');
      showPopUpNote();
      return;

    }

    if(!PHONE_REGEX.test(storePhoneNumber)){
      setMsg(
          <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
              <span>رقم هاتف غير صالح</span> 
              <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
          </h5>
      );
      showPopUpNote();
      return;
    }else{

      fd.append('storePhoneNumber', storePhoneNumber);

    }

    if(paymentMethod.length==0){

      setMsg(
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
        setMsg(
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

    fd.append('storeName', storeName);
    fd.append('location', location);

    try {

      setSendingStatus(true);

      const res = await axios.post(
        `${process.env.server_url}/api/v2.0/store/sellerRequest`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSendingStatus(false);
      setStoreName('');
      setLocation('');
      setStorePhoneNumber('');
      setPaymentMethod([]);
      setWepayCode('');
      setImgURL('');
      setPreviewImgURL('../storePhoto.webp')
      setGoBack(true);
      setMsg(res.data.message);
      showPopUpNote();

      
    } catch (error) {

      setSendingStatus(false);
      setMsg(<h5 className="text-red-600 text-center">{error?.message}</h5>);
      showPopUpNote();

    }
  };

  return (
    <>
      <NotePopUp
        goBack={goBack}
        noteMsg={
          <div className="text-red-600 text-center flex flex-col justify-center items-center">
            {msg}
          </div>
        }
      />
      <Navbar />
      <AuthenticationBody upgrade={true} setImgURL={setImgURL} previewImgURL={previewImgURL} setPreviewImgURL={setPreviewImgURL}>
        <form className="flex flex-col space-y-5" onSubmit={sendData}>
          <GiTeamUpgrade className="text-effectColor dark:text-darkTextColor2 text-[30px] self-center" />

          <div className="flex space-x-3">

            <input
              type="text"
              placeholder="عنوان المتجر "
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required
              className="w-1/2 p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2 placeholder:text-sm"
            />

            <input
              type="text"
              placeholder="اسم المتجر"
              value={storeName}
              onChange={(e) => {
                setStoreName(e.target.value);
              }}
              required
              className="w-1/2 p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2 placeholder:text-sm"
            />

          </div>

          <div className="flex justify-end">
            <input
              type="number"
              placeholder="رقم الهاتف"
              value={storePhoneNumber}
              onChange={(e) => {
                setStorePhoneNumber(e.target.value);
              }}
              required
              className="w-full p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2 placeholder:text-sm"
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-end dark:text-darkBgColor">: الدفع </h4>

            <div className="flex space-x-3">
              <div className="w-1/2 flex justify-center items-center space-x-1">
                <label
                  htmlFor="onHand"
                  className="text-xs font-bold text-center dark:text-darkBgColor"
                >
                  عند التسليم
                </label>
                <input
                  type="checkbox"
                  id="onHand"
                  checked={paymentMethod.includes('on delivery')}
                  onChange={() => handleCheckboxChange('on delivery')}
                />
              </div>

              <div className="w-1/2 flex justify-center items-center space-x-1">
                <label
                  htmlFor="wepay"
                  className="text-xs font-bold text-center dark:text-darkBgColor"
                >
                  wepay عن طريق
                </label>
                <input
                  type="checkbox"
                  id="wepay"
                  checked={paymentMethod.includes('wepay')}
                  onChange={() => handleCheckboxChange('wepay')}
                />
              </div>
            </div>

            {paymentMethod.includes('wepay') && (
              <input
                type="number"
                placeholder="wepay كود"
                required
                value={wepayCode}
                onChange={(e) => {
                  setWepayCode(e.target.value);
                }}
                className="w-full p-2 outline-none text-center bg-bgColor dark:bg-darkTextColor rounded-none border-b-[2px] focus:border-effectColor dark:focus:border-darkTextColor2 placeholder:text-sm"
              />
            )}
          </div>
          <button className="self-center h-8 w-[100px] flex justify-center items-center" disabled={sendingStatus}>
            {!sendingStatus ? (
              'ترقية الحساب'
            ) : (
              <ThreeDots
                width="30"
                height="30"
                color="#ffffff"
                visible={true}
              />
            )}
          </button>
        </form>
      </AuthenticationBody>
    </>
  );
};

export default Upgrade;
