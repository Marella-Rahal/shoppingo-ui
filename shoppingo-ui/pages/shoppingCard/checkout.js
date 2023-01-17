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
            <form className='pt-28 pb-14 px-4 md:px-8 w-full flex flex-col md:flex-row md:space-x-10' onSubmit={(e) => e.preventDefault()}>

                {/* //todo the info */}
                <div className='w-full md:w-1/2 lg:w-1/3 flex flex-col space-y-10'>

                    {/* notes */}
                    <div className='flex flex-col items-end space-y-7 text-textColor2 font-semibold text-end'>

                        {/* transport price */}
                        <div>
                            تنبيه : أجرة الشحن من أجل كل منتج  5000 ل.س
                        </div>

                        {/* price clarification */}
                        <div>
                            تنبيه : السعر الكلي  لكل قسم يتضمن سعر المنتجات في هذا القسم إضافة إلى أجور شحنها
                        </div>

                        {/* payment methodes */}
                        <div className='flex flex-col space-y-5'>
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

                    {/* form */}
                    <div className='hidden md:flex flex-col space-y-7'>
                        <div className='flex space-x-3'>
                            <input type="text" placeholder='الاسم الأخير' className='text-end outline-none py-1 px-2 w-1/3 rounded-md border-2 border-textColor  focus:border-effectColor ' required />
                            <input type="text" placeholder='الاسم الأوسط' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor  w-1/3' required />
                            <input type="text" placeholder='الاسم الأول' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor w-1/3' required />
                        </div>

                        <input type="email" placeholder='الإيميل' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor' required />

                        <input type="number" placeholder='+963' className='outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor' required />

                        <div className='flex space-x-3'>

                            <input type="text" placeholder='المحافظة' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor w-1/2' required />

                            <input type="text" value='سوريا' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor w-1/2' disabled={true} />

                        </div>

                        <input type="text" placeholder='العنوان' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor' required />

                        {/* //! total Price */}

                        <div className='flex shadow-md shadow-shadowColor rounded-md border-x-4 border-effectColor p-2 justify-center text-[14px] font-semibold'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                        <button className='py-2 rounded-md bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-r'>شراء</button>
                    </div>


                </div>

                {/* //todo The Products */}
                <div className='w-full md:w-1/2 lg:w-2/3 flex flex-col'>

                    {/* line */}
                    <div className="md:hidden flex items-center space-x-3 my-7">
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                        <img src="../logo.svg" className="w-20 xs:w-28 h-7" />
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                    </div>

                    {/* //* one section */}
                    <div className='flex flex-col space-y-5'>

                        {/* //! slider with framer motion */}
                        <motion.div
                            ref={slider}
                            style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                            className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-textColor"
                        >
                            <motion.div
                                drag="x"
                                dragConstraints={{ right: 0, left: -width }}
                                className="flex  space-x-5"
                            >
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000000' type="onHand" />
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />
                                <Product id='1' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onHand" />

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='shadow-md shadow-shadowColor rounded-md border-x-4 border-textColor p-2 flex text-[13px] font-semibold self-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                    </div>

                    {/* line */}
                    <div className="flex items-center space-x-3 my-7">
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                        <img src="../logo.svg" className="w-20 xs:w-28 h-7" />
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                    </div>

                    {/* //* second section */}
                    <div className='flex flex-col space-y-5'>

                        {/* //! slider with framer motion */}
                        <motion.div
                            ref={slider}
                            style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                            className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-[green]"
                        >
                            <motion.div
                                drag="x"
                                dragConstraints={{ right: 0, left: -width }}
                                className="flex space-x-5"
                            >
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="onLine" />

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='shadow-md shadow-shadowColor rounded-md border-x-4 border-[green] p-2 flex text-[13px] font-semibold self-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                    </div>

                    {/* line */}
                    <div className="flex items-center space-x-3 my-7">
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                        <img src="../logo.svg" className="w-20 xs:w-28 h-7" />
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                    </div>

                    {/* //* third section */}

                    <div className='flex flex-col space-y-5'>

                        {/* //! slider with framer motion */}
                        <motion.div
                            ref={slider}
                            style={{ boxShadow: "0px 0px 15px 7px rgba(0,0,0,0.1)" }}
                            className="overflow-hidden cursor-grab p-5 rounded-lg border-x-4 border-l-textColor border-r-[green]"
                        >
                            <motion.div
                                drag="x"
                                dragConstraints={{ right: 0, left: -width }}
                                className="flex space-x-5"
                            >
                                <Product id='1' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='2' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='3' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='4' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='5' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='6' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='7' shopId='1' img='../product1.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />
                                <Product id='8' shopId='1' img='../product.jpg' shopName="For_you" color='red' qty='1000000000' size='7xl' price='1000000000' type="both" />

                            </motion.div>
                        </motion.div>

                        {/* total Price */}

                        <div className='shadow-md shadow-shadowColor rounded-md border-x-4 border-l-textColor border-r-[green] p-2 flex text-[13px] font-semibold self-center'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                    </div>

                    {/* line */}
                    <div className="md:hidden flex items-center space-x-3 my-7">
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                        <img src="../logo.svg" className="w-20 xs:w-28 h-7" />
                        <div className="w-1/2 h-[1px] bg-effectColor" />
                    </div>

                    {/* form */}
                    <div className='md:hidden flex flex-col space-y-7'>
                        <div className='flex space-x-3'>
                            <input type="text" placeholder='الاسم الأخير' className='text-end outline-none py-1 px-2 w-1/3 rounded-md border-2 border-textColor  focus:border-effectColor ' required />
                            <input type="text" placeholder='الاسم الأوسط' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor  w-1/3' required />
                            <input type="text" placeholder='الاسم الأول' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor w-1/3' required />
                        </div>

                        <input type="email" placeholder='الإيميل' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor' required />

                        <input type="number" placeholder='+963' className='outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor' required />

                        <div className='flex space-x-3'>

                            <input type="text" placeholder='المحافظة' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor w-1/2' required />

                            <input type="text" value='سوريا' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor w-1/2' disabled={true} />

                        </div>

                        <input type="text" placeholder='العنوان' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor' required />

                        {/* //! total Price */}

                        <div className='flex shadow-md shadow-shadowColor rounded-md border-x-4 border-effectColor p-2 justify-center text-[14px] font-semibold'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

                        <button className='py-2 rounded-md bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-r'>شراء</button>
                    </div>

                </div>

            </form>
        </>
    )
}

export default Checkout