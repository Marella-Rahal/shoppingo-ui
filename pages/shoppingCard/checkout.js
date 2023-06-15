import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import CheckoutForm from '../../components/Checkout/CheckoutForm';
import Placeholder from "../../components/Checkout/Placeholder";
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
const DynamicProduct=dynamic(()=>import('../../components/Checkout/Product'),{
  loading: () => <Placeholder/> ,
  ssr: false,
})

const productsOnLine=[
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onLine"
    },   
]

const productsOnHand=[
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onHand"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onHand"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onHand"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onHand"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onHand"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onHand"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"onHand"
    },
]

const products=[
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"both"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"both"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"both"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"both"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"both"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"both"
    },
    {
        shopId:'1',
        img:'../product1.jpg',
        shopName:"For_you",
        color:'red',
        qty:'1000000000',
        size:'7xl',
        price:'1000000000',
        type:"both"
    },
]

const Checkout = () => {
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

    return (
        <>
            <Navbar/>
            <form className='pt-28 pb-14 px-4 md:px-8 w-full flex flex-col lg:flex-row lg:space-x-10' onSubmit={(e) => e.preventDefault()}>

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
                                <div className='w-5 h-5 rounded-md border-x-[3px] border-textColor dark:border-darkTextColor' />
                            </div>

                            <div className='flex self-end items-center space-x-3'>
                                <div>WePay الدفع عن طريق موقع</div>
                                <div className='w-5 h-5 rounded-md border-x-[3px] border-[#3fb37f]' />
                            </div>

                            <div className='flex self-end items-center space-x-3'>
                                <div>يرجى تحديد طريقة الدفع قبل تأكيد الشراء</div>
                                <div className='w-5 h-5 rounded-md border-x-[3px] border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f]' />
                            </div>

                        </div>
                    </div>

                    {/* form */}
                   <CheckoutForm pos={true}/>


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
                                    productsOnHand.map((one,index)=>{
                                        return <DynamicProduct key={index} id={index} shopId={one.shopId} img={one.img} shopName={one.shopName} color={one.color} qty={one.qty} size={one.size} price={one.price} type={one.type}/>
                                    })
                                }

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='border-x-4 border-textColor dark:border-darkTextColor p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

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
                                    productsOnLine.map((one,index)=>{
                                        return <DynamicProduct key={index} id={index} shopId={one.shopId} img={one.img} shopName={one.shopName} color={one.color} qty={one.qty} size={one.size} price={one.price} type={one.type}/>
                                    })
                                }

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='border-x-4 border-[#3fb37f] p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

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
                                    products.map((one,index)=>{
                                        return <DynamicProduct key={index} id={index} shopId={one.shopId} img={one.img} shopName={one.shopName} color={one.color} qty={one.qty} size={one.size} price={one.price} type={one.type}/>
                                    })
                                }

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='border-x-4 border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f] p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                    </div>

                    {/* line */}
                    <div className="lg:hidden flex items-center space-x-3 my-10">
                        <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
                        <img src={logoUrl} className="w-20 xs:w-28 h-7" />
                        <div className="w-1/2 h-[1px] bg-effectColor dark:bg-darkTextColor" />
                    </div>

                    {/* form */}
                    <CheckoutForm pos={false}/>

                </div>

            </form>
        </>
    )
}

export default Checkout