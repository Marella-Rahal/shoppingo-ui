import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion';
import Product from '../../components/Checkout/Product'
import Navbar from '../../components/Navbar';
import CheckoutForm from '../../components/Checkout/CheckoutForm';

const Checkout = () => {
    // ! to set constraint on how much i can drag the slider to the left
    // const [width, setWidth] = useState(0);
    // const slider = useRef();
    // useEffect(() => {
    //     setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
    // }, []);

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
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                        <img src="../logo.svg" className="w-20 xs:w-28 h-7" />
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                    </div>

                    {/* //* one section */}
                    <div className='flex flex-col space-y-5'>

                        {/* //! slider with framer motion */}
                        <motion.div
                            dir='rtl'
                            // ref={slider}
                            // className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-textColor dark:border-darkTextColor shadow-mapShadow dark:shadow-darkMapShadow"
                            className="overflow-auto sliderScroll p-5 rounded-lg border-x-4 border-textColor dark:border-darkTextColor shadow-mapShadow dark:shadow-darkMapShadow"
                        >
                            <motion.div
                                // drag="x"
                                // dragConstraints={{ right: 0, left: -width }}
                                className="flex"
                            >
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000000' type="onHand" />
                                <Product id='2' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='3' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='4' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='5' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='6' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='7' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='8' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='shadow-inner shadow-shadowColor rounded-md border-x-4 border-textColor dark:border-darkTextColor p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                    </div>

                    {/* line */}
                    <div className='w-full h-[1px] bg-effectColor my-10'/>

                    {/* //* second section */}
                    <div className='flex flex-col space-y-5'>

                        {/* //! slider with framer motion */}
                        <motion.div
                            dir='rtl'
                            // ref={slider}
                            // className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                            className="overflow-auto sliderScroll p-5 rounded-lg border-x-4 border-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                        >
                            <motion.div
                                // drag="x"
                                // dragConstraints={{ right: 0, left: -width }}
                                className="flex"
                            >
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='2' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                {/* <Product id='3' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='4' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='5' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='6' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='7' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='8' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" /> */}

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='shadow-inner shadow-shadowColor rounded-md border-x-4 border-[#3fb37f] p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                    </div>

                    {/* line */}
                    <div className='w-full h-[1px] bg-effectColor my-10'/>

                    {/* //* third section */}

                    <div className='flex flex-col space-y-5'>

                        {/* //! slider with framer motion */}
                        <motion.div
                            dir='rtl'
                            // ref={slider}
                            // className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                            className="overflow-auto sliderScroll p-5 rounded-lg border-x-4 border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f] shadow-mapShadow dark:shadow-darkMapShadow"
                        >
                            <motion.div
                                // drag="x"
                                // dragConstraints={{ right: 0, left: -width }}
                                className="flex"
                            >
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='2' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='3' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                {/* <Product id='4' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='5' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='6' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='7' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='8' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" /> */}

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='shadow-inner shadow-shadowColor rounded-md border-x-4 border-l-textColor dark:border-l-darkTextColor border-r-[#3fb37f] p-2 flex text-[13px] font-semibold items-center justify-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                    </div>

                    {/* line */}
                    <div className="lg:hidden flex items-center space-x-3 my-10">
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                        <img src="../logo.svg" className="w-20 xs:w-28 h-7" />
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                    </div>

                    {/* form */}
                    <CheckoutForm pos={false}/>

                </div>

            </form>
        </>
    )
}

export default Checkout