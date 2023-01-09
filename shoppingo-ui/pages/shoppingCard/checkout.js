import React, { useState, useRef, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion';
import Product from '../../components/Checkout/Product'

const Checkout = () => {
    // ! to set constraint on how much i can drag the slider to the left
    const [width, setWidth] = useState(0);

    const slider = useRef();

    useEffect(() => {
        setWidth(slider.current.scrollWidth - slider.current.offsetWidth);
    }, []);
    return (
        <>
            <Navbar />
            <form className='pt-28 pb-14 px-4 md:px-8 w-full min-h-screen flex flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-8' onSubmit={(e) => e.preventDefault()}>

                {/* the info */}
                <div className='w-full md:w-1/3 flex flex-col justify-between space-y-5'>

                    <div className='flex flex-col space-y-5'>
                        {/* transport price */}
                        <div className='font-semibold self-end text-end text-textColor2'>
                            ملاحظة : أجرة الشحن من أجل كل منتج تساوي 5000 ل.س
                        </div>

                        {/* price clarification */}
                        <div className='font-semibold self-end text-end text-textColor2'>
                            ملاحظة : السعر الكلي  لكل قسم يتضمن سعر المنتجات في هذا القسم إضافة إلى أجور شحنها
                        </div>

                        {/* payment methodes */}
                        <div className='font-semibold self-end text-end text-textColor2 flex flex-col space-y-5'>
                            <div>
                                : طرق الدفع للمنتجات
                            </div>

                            <div className='flex self-end items-center space-x-3'>
                                <div>الدفع عند الاستلام</div>
                                <div className='w-5 h-5 rounded-md border-x-[3px] border-textColor shadow-md shadow-shadowColor' />
                            </div>

                            <div className='flex self-end items-center space-x-3'>
                                <div>WePay الدفع عن طريق موقع</div>
                                <div className='w-5 h-5 rounded-md border-x-[3px] border-[green] shadow-md shadow-shadowColor' />
                            </div>

                            <div className='flex self-end items-center space-x-3'>
                                <div>يرجى تحديد طريقة الدفع قبل تأكيد الشراء</div>
                                <div className='w-5 h-5 rounded-md border-x-[3px] border-l-textColor border-r-[green] shadow-md shadow-shadowColor' />
                            </div>

                        </div>
                    </div>


                    <div className='flex space-x-3 pt-5 md:pt-0'>
                        <input type="text" placeholder='الاسم الأخير' className='text-end outline-none py-1 px-2 rounded-sm outline-2 outline-textColor w-1/3 focus:outline-effectColor ' required />
                        <input type="text" placeholder='الاسم الأوسط' className='text-end outline-none py-1 px-2 rounded-sm focus:outline-effectColor outline-2 outline-textColor w-1/3' required />
                        <input type="text" placeholder='الاسم الأول' className='text-end outline-none py-1 px-2 rounded-sm focus:outline-effectColor outline-2 outline-textColor w-1/3' required />
                    </div>

                    <input type="email" placeholder='الإيميل' className='text-end outline-none py-1 px-2 rounded-sm focus:outline-effectColor outline-2 outline-textColor' required />

                    <input type="number" placeholder='+963' className='outline-none py-1 px-2 rounded-sm focus:outline-effectColor outline-2 outline-textColor' required />

                    <div className='flex space-x-3'>

                        <input type="text" placeholder='المحافظة' className='text-end outline-none py-1 px-2 rounded-sm focus:outline-effectColor outline-2 outline-textColor w-1/2' required />

                        <input type="text" value='سوريا' className='text-end outline-none py-1 px-2 rounded-sm outline-2 outline-textColor w-1/2' disabled={true} />

                    </div>

                    <input type="text" placeholder='العنوان' className='text-end outline-none py-1 px-2 rounded-sm focus:outline-effectColor outline-2 outline-textColor' required />

                    <button className='py-2 rounded-md bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-r'>شراء</button>

                </div>

                {/* The Products */}
                <div className='w-full md:w-2/3 flex flex-col space-y-5'>

                    {/* total Price */}

                    <div className='flex flex-col-reverse md:flex-row justify-between items-center font-semibold'>
                        <div className='shadow-md shadow-shadowColor rounded-md p-2 flex mt-3 md:mt-0'><span className='mr-2'>ل.س</span> 100000000000000000 </div>
                        <div>: السعر الكلي </div>
                    </div>



                    {/* //! slider with framer motion */}
                    <motion.div
                        ref={slider}
                        style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                        className="overflow-hidden cursor-grab p-5 pt-10 rounded-lg border-x-4 border-textColor"
                    >
                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            className="flex  space-x-5"
                        >
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />

                        </motion.div>
                    </motion.div>

                    {/* total Price */}

                    <div className='flex flex-col-reverse md:flex-row justify-between items-center font-semibold'>
                        <div className='shadow-md shadow-shadowColor rounded-md p-2 flex mt-3 md:mt-0'><span className='mr-2'>ل.س</span> 100000000000000000 </div>
                        <div>: السعر الكلي </div>
                    </div>

                    {/* //! slider with framer motion */}
                    <motion.div
                        ref={slider}
                        style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                        className="overflow-hidden cursor-grab p-5 pt-10 rounded-lg border-x-4 border-[green]"
                    >
                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            className="flex space-x-5"
                        >
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />

                        </motion.div>
                    </motion.div>


                    {/* total Price */}

                    <div className='flex flex-col-reverse md:flex-row justify-between items-center font-semibold'>
                        <div className='shadow-md shadow-shadowColor rounded-md p-2 flex mt-3 md:mt-0'><span className='mr-2'>ل.س</span> 100000000000000000 </div>
                        <div>: السعر الكلي </div>
                    </div>

                    {/* //! slider with framer motion */}
                    <motion.div
                        ref={slider}
                        style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                        className="overflow-hidden cursor-grab p-5 pt-10 rounded-lg border-x-4 border-l-textColor border-r-[green]"
                    >
                        <motion.div
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            className="flex space-x-5"
                        >
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />

                        </motion.div>
                    </motion.div>

                </div>

            </form>
        </>
    )
}

export default Checkout