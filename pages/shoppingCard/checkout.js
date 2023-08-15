import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import CheckoutForm from '../../components/Checkout/CheckoutForm';
import Placeholder from "../../components/Checkout/Placeholder";
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { parseCookies } from 'nookies';
import axios from 'axios';
import FailToGet from '../../components/FailToGet';
const DynamicProduct=dynamic(()=>import('../../components/Checkout/Product'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})
import emptyResult from "../../public/empty.json";
import Lottie from "lottie-react";
import NotePopUp, { showPopUpNote } from '../../components/PopUp/NotePopUp'
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/router';

const EMAIL_REGEX=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX=/^09\d{8}$/

const Checkout = (props) => {

    const cookies = parseCookies();
    const token = cookies.token;
    const router = useRouter();

    const [sendingStatus,setSendingStatus]=useState(false);
    const [checkoutStatus,setCheckOutStatus]=useState(false);
    const [noteMsg,setNoteMsg]=useState('');

    // ! to set constraint on how much i can drag the slider to the left
    // const [width, setWidth] = useState(0);
    // const slider = useRef();
    // useEffect(() => {
    //     setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
    // }, []);

    const { theme ,setTheme } = useTheme();
    const [logoUrl,setLogoUrl]=useState('');
    useEffect(()=>{

        if(theme == 'light'){
            setLogoUrl('../logo.svg')
        }else{
            setLogoUrl('../darkLogo.svg');
        }

    },[theme])

    const [onDeliveryItems,setOnDeliveryItems]=useState(props?.onDelivery?.onDeliveryItems);
    const [wepayItems,setWepayItems]=useState(props?.wepayItems?.wepayItems);
    const [restItems,setRestItems]=useState(props?.restItems?.restItems);

    const [onDeliveryItemsPrice,setOnDeliveryItemsPrice]=useState(props?.onDelivery?.onDeliveryItemsPrice);
    const [wepayItemsPrice,setWepayItemsPrice]=useState(props?.wepayItems?.wepayItemsPrice);
    const [restItemsPrice,setRestItemsPrice]=useState(props?.restItems?.restItemsPrice);

    const [sendingOnDeliveryItems,setSendingOnDeliveryItems]=useState([]);
    const [sendingWepayItems,setSendingWepayItems]=useState([]);

    const [firstName,setFirstName]=useState('');
    const [middleName,setMiddleName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');
    const [city,setCity]=useState('');
    const [address,setAddress]=useState('');

    const checkOutFunction = async (e) => {

        
        e.preventDefault();

        const sendingD = [...sendingOnDeliveryItems,...onDeliveryItems];
        const sendingW = [...sendingWepayItems,...wepayItems]
    
        if(sendingD.length == 0 && sendingW.length == 0 ){
    
          setNoteMsg(
            <h5 className='text-red-600 text-center'>لا يوجد أي منتجات لشرائها</h5>
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
    
        if(!PHONE_REGEX.test(phoneNumber)){
    
          setNoteMsg(
              <h5 className='text-red-600 text-center flex flex-col justify-center items-center'>
                  <span>رقم هاتف غير صالح</span> 
                  <span>يجب أن يبدأ ب 09 ويكون مؤلف من 10 أرقام</span> 
              </h5>
          );
          showPopUpNote();
          return;
    
        }
    
        try {
    
            setSendingStatus(true);
    
            if(sendingD.length !== 0){
    
                setCheckOutStatus(true);
                setNoteMsg(
                  'جاري معالجة الطلبات التي تقبل الدفع عند الاستلام'
                );
    
                const resD = await axios.post(`${process.env.server_url}/api/v2.0/cart/deliveryOrder`,{
                  firstName,middleName,lastName,email,phoneNumber,city,address,onDeliveryItems : sendingD
                },{
                  headers : {
                    Authorization: `Bearer ${token}`
                  }
                })
    
            }
            
            if(sendingW.length !== 0){
    
                setCheckOutStatus(true);
                setNoteMsg(
                  'wepay جاري معالجة الطلبات التي تقبل الدفع عن طريق'
                );
        
                const resW = await axios.post(`${process.env.server_url}/api/v2.0/cart/wepayOrder`,{
                  firstName,middleName,lastName,email,phoneNumber,city,address,wepayItems : sendingW
                },{
                  headers : {
                    Authorization: `Bearer ${token}`
                  }
                })
    
            }
    
            setNoteMsg(
              'على وشك الانتهاء الرجاء الانتظار قليلاً'
            );
            const res = await axios.delete(`${process.env.server_url}/api/v2.0/cart/deleteCartItems`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
    
            router.push('/profile/myPurchases');
    
        } catch (error) {

            setCheckOutStatus(false);
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
                            <div className={`fixed z-[100] w-full h-full bg-black/30 ${checkoutStatus ? 'flex flex-col justify-center items-center' : 'flex justify-center items-center'} `}>
                                <ThreeDots
                                width={checkoutStatus ? 50 : 75}
                                color="white"
                                visible={true}
                                /> 
                                {
                                    checkoutStatus && (
                                        <div className='text-white text-center'>
                                            {noteMsg}
                                        </div>
                                    )
                                }
                            </div>
                            )
                        }
                        <NotePopUp noteMsg={noteMsg}/>
                        <Navbar/>
                        <form className='pt-28 pb-14 px-4 md:px-8 w-full flex flex-col lg:flex-row lg:space-x-10' onSubmit={checkOutFunction}>

                            {/* //todo the info */}
                            <div className='w-full lg:w-1/2 xl:w-1/3 flex flex-col space-y-10'>

                                {/* notes */}
                                <div className='flex flex-col items-end space-y-7 text-textColor2 dark:text-darkTextColor2 font-semibold text-end'>

                                    {/* transport price */}
                                    <div>
                                        ملاحظة : أجرة الشحن من أجل كل منتج  5000 ل.س
                                    </div>

                                    {/* price clarification */}
                                    <div>
                                        ملاحظة : السعر الكلي  لكل قسم يتضمن سعر المنتجات في هذا القسم إضافة إلى أجور شحنها
                                    </div>

                                    {/* payment methodes */}
                                    <div className='flex flex-col space-y-5'>
                                        <div>
                                            : طرق الدفع للمنتجات
                                        </div>

                                        <div className='flex self-end items-center space-x-3'>
                                            <div>الدفع عند الاستلام</div>
                                            <div className='w-5 h-5 border-x-[3px] border-textColor dark:border-darkTextColor' />
                                        </div>

                                        <div className='flex self-end items-center space-x-3'>
                                            <div>WePay الدفع عن طريق موقع</div>
                                            <div className='w-5 h-5 border-x-[3px] border-[#3fb37f]' />
                                        </div>

                                        <div className='flex self-end items-center space-x-3'>
                                            <div>يرجى تحديد طريقة الدفع قبل تأكيد الشراء</div>
                                            <div className='w-5 h-5 border-x-[3px] border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f]' />
                                        </div>

                                    </div>
                                </div>

                                {/* form */}
                            <CheckoutForm pos={true} firstName={firstName} setFirstName={setFirstName} middleName={middleName} setMiddleName={setMiddleName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} city={city} setCity={setCity} address={address} setAddress={setAddress} totalPrice={onDeliveryItemsPrice+wepayItemsPrice+restItemsPrice}/>


                            </div>

                            {/* //todo The Products */}
                            <div className='w-full lg:w-1/2 xl:w-2/3 flex flex-col'>

                                {/* line */}
                                <div className="lg:hidden flex items-center space-x-3 my-10">
                                    <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
                                    <img src={logoUrl} className="w-20 xs:w-28 h-7" />
                                    <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
                                </div>

                                {/* //* one section */}
                                <div className='flex flex-col space-y-5'>

                                    {/* //! slider with framer motion */}
                                    <motion.div
                                        dir='rtl'
                                        // ref={slider}
                                        // className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-textColor dark:border-darkTextColor shadow-mapShadow dark:shadow-darkMapShadow"
                                        className="overflow-auto sliderScroll p-5 border-x-4 border-textColor dark:border-darkTextColor shadow-mapShadow dark:shadow-darkMapShadow"
                                    >
                                        <motion.div
                                            // drag="x"
                                            // dragConstraints={{ right: 0, left: -width }}
                                            className="flex"
                                        >
                                            {
                                                onDeliveryItems.length !== 0 ? (
                                                    onDeliveryItems.map((one,index)=>{
                                                        return <DynamicProduct key={index} id={one.item._id} productId={one.item.product._id} shopId={one.seller} img={one.item.product.frontImgURL} shopName={one.item.product.seller.storeName} color={one.item.color} qty={one.item.quantity} size={one.item.size} price={one.item.price} type={'onHand'} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setOnDeliveryItems={setOnDeliveryItems} setWepayItems={setWepayItems} setRestItems={setRestItems} setOnDeliveryItemsPrice={setOnDeliveryItemsPrice} setWepayItemsPrice={setWepayItemsPrice} setRestItemsPrice={setRestItemsPrice} setSendingOnDeliveryItems={setSendingOnDeliveryItems} setSendingWepayItems={setSendingWepayItems} value={one}/>
                                                    })
                                                ) : (
                                                    <div className='w-full h-32 flex justify-center'>
                                                        <Lottie animationData={emptyResult} loop={true} />
                                                    </div>
                                                )
                                                
                                            }

                                        </motion.div>
                                    </motion.div>

                                    {/* total Price */}

                                    <div className='border-x-4 border-textColor dark:border-darkTextColor p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> {onDeliveryItemsPrice} </div>

                                </div>

                                {/* line */}
                                <div className='w-full h-[1px] bg-textColor dark:bg-darkTextColor my-10'/>

                                {/* //* second section */}
                                <div className='flex flex-col space-y-5'>

                                    {/* //! slider with framer motion */}
                                    <motion.div
                                        dir='rtl'
                                        // ref={slider}
                                        // className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                                        className="overflow-auto sliderScroll p-5 border-x-4 border-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                                    >
                                        <motion.div
                                            // drag="x"
                                            // dragConstraints={{ right: 0, left: -width }}
                                            className="flex"
                                        >
                                            {
                                                wepayItems.length !== 0 ? (
                                                    wepayItems.map((one,index)=>{
                                                        return <DynamicProduct key={index} id={one.item._id} productId={one.item.product._id} shopId={one.seller} img={one.item.product.frontImgURL} shopName={one.item.product.seller.storeName} color={one.item.color} qty={one.item.quantity} size={one.item.size} price={one.item.price} type={'onLine'} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setOnDeliveryItems={setOnDeliveryItems} setWepayItems={setWepayItems} setRestItems={setRestItems} setOnDeliveryItemsPrice={setOnDeliveryItemsPrice} setWepayItemsPrice={setWepayItemsPrice} setRestItemsPrice={setRestItemsPrice} setSendingOnDeliveryItems={setSendingOnDeliveryItems} setSendingWepayItems={setSendingWepayItems} value={one}/>
                                                    })
                                                ) : (
                                                    <div className='w-full h-32 flex justify-center'>
                                                        <Lottie animationData={emptyResult} loop={true} />
                                                    </div>
                                                )
                                                
                                            }

                                        </motion.div>
                                    </motion.div>

                                    {/* total Price */}

                                    <div className='border-x-4 border-[#3fb37f] p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> {wepayItemsPrice} </div>

                                </div>

                                {/* line */}
                                <div className='w-full h-[1px] bg-[#3fb37f] my-10'/>

                                {/* //* third section */}

                                <div className='flex flex-col space-y-5'>

                                    {/* //! slider with framer motion */}
                                    <motion.div
                                        dir='rtl'
                                        // ref={slider}
                                        // className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                                        className="overflow-auto sliderScroll p-5 border-x-4 border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                                    >
                                        <motion.div
                                            // drag="x"
                                            // dragConstraints={{ right: 0, left: -width }}
                                            className="flex"
                                        >
                                            {
                                                restItems.length !== 0 ? (
                                                    restItems.map((one,index)=>{
                                                        return <DynamicProduct key={index} id={one.item._id} productId={one.item.product._id} shopId={one.seller} img={one.item.product.frontImgURL} shopName={one.item.product.seller.storeName} color={one.item.color} qty={one.item.quantity} size={one.item.size} price={one.item.price} type={'both'} setSendingStatus={setSendingStatus} setNoteMsg={setNoteMsg} setOnDeliveryItems={setOnDeliveryItems} setWepayItems={setWepayItems} setRestItems={setRestItems} setOnDeliveryItemsPrice={setOnDeliveryItemsPrice} setWepayItemsPrice={setWepayItemsPrice} setRestItemsPrice={setRestItemsPrice} setSendingOnDeliveryItems={setSendingOnDeliveryItems} setSendingWepayItems={setSendingWepayItems} value={one}/>
                                                    })
                                                ) : (
                                                    <div className='w-full h-32 flex justify-center'>
                                                        <Lottie animationData={emptyResult} loop={true} />
                                                    </div>
                                                )
                                                
                                            }

                                        </motion.div>
                                    </motion.div>

                                    {/* total Price */}

                                    <div className='border-x-4 border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f] p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> {restItemsPrice} </div>

                                </div>

                                {/* line */}
                                <div className="lg:hidden flex items-center space-x-3 my-10">
                                    <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
                                    <img src={logoUrl} className="w-20 xs:w-28 h-7" />
                                    <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
                                </div>

                                {/* form */}
                                <CheckoutForm pos={false} firstName={firstName} setFirstName={setFirstName} middleName={middleName} setMiddleName={setMiddleName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} city={city} setCity={setCity} address={address} setAddress={setAddress} totalPrice={onDeliveryItemsPrice+wepayItemsPrice+restItemsPrice}/>

                            </div>

                        </form>
                    </>
                ) : (
                    <FailToGet/>
                )
            }
            
        </>
    )
}

export default Checkout

export const getServerSideProps = async (context) => {
    const cookies = parseCookies(context);
    const token = cookies.token;
  
    try {
      const res = await axios.get(
        `${process.env.server_url}/api/v2.0/cart/getCart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return {
        props: {
            success: true,
            onDelivery : res.data.success ? res.data.onDelivery : { onDeliveryItemsPrice:0,onDeliveryItems:[] } ,
            wepayItems : res.data.success ? res.data.wepayItems : { wepayItemsPrice:0,wepayItems:[] } ,
            restItems : res.data.success ? res.data.restItems : { restItemsPrice:0,restItems:[] } ,
        },
      };

    } catch (error) {
  
      if (error?.response?.status == 401) {
        return {
          redirect: {
            destination: '/login',
            permanent: false, // Set to false if it's a temporary redirect
          },
        };
      } else {
        return {
          props: {
            success: false,
          },
        };
      }
    }
  };