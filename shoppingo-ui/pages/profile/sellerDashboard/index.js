import React from 'react'
import Chart from '../../../components/SellerDashboard/Chart'
import Navbar from '../../../components/Navbar'
import Product from '../../../components/SellerDashboard/Product'

const Index = () => {
  return (
    <div>
      <Navbar />

      <div className='pt-28 pb-10 flex flex-col space-y-10'>

        {/* ​‌‍‌div for tow rectangles ​​ */}
        <div className='px-4 md:px-8 flex flex-col-reverse md:flex-row md:justify-between md:space-x-3'>

            {/* ​‌‍‌first rectangle ​ */}
            <div className="bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 shadow-md shadow-shadowColor dark:shadow-none w-full md:w-1/2 xl:w-1/3 md:h-[175px] rounded-xl flex flex-col space-y-5">

              <div className='text-center text-white text-lg font-bold px-2 py-5 h-1/2'> عدد المستخدمين الذين اشتروا منتجاتي
              </div>

              <div className='flex justify-center items-center text-center text-white text-lg font-bold px-2 py-5 h-1/2'>
                مستخدم  
                <span className='ml-1'> 1000000000 </span>
              </div>
            
            </div>
            {/* second rectangle ​ */}
            <div className="bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 shadow-md shadow-shadowColor dark:shadow-none w-full md:w-1/2 xl:w-1/3 md:h-[175px] rounded-xl flex flex-col space-y-5 mb-10 md:mb-0">

                <div className='text-center text-white text-lg font-bold px-2 py-5 h-1/2'> 
                Shoppingo الدخل الكلي من 
                </div>
                <div className='flex justify-center items-center text-center text-white text-lg font-bold px-2 py-5 h-1/2'>
                  ل.س
                  <span className='ml-1'>1000000000000</span>
                </div>

          </div>
        </div>


        {/* ​‌‍‌Barchar section​ */}
        <div className='px-4 md:px-8 flex flex-col space-y-10 h-[500px]'>
          <Chart />
        </div>


        <div className='h-[1px] w-full bg-textColor dark:bg-darkTextColor'/>


        {/* PRODUCT SECTION */}
        <div className='px-4 md:px-8 flex space-x-3 justify-between items-center'>

          <button className='w-[100px] py-1'>
             طلباتي
          </button>

          <button className='w-[100px] py-1'>
            إضافة منتج
          </button>

        </div>

        <div className='px-4 md:px-8 text-lg font-bold text-center'>
            منتجاتي
        </div>

        {/* Products */}
        <div className="px-4 md:px-8 flex justify-evenly flex-wrap">
          
            <Product
            id="1" 
            img="../product.jpg"
            price="5000000000000000000"
            />
            <Product
            id="2" 
            img="../product.jpg"
            price="50000"
            />
            <Product
            id="3" 
            img="../product.jpg"
            price="50000"
            />
            <Product
            id="4" 
            img="../product.jpg"
            price="50000"
            />
            <Product
            id="5" 
            img="../product.jpg"
            price="50000"
            />
            <Product
            id="6" 
            img="../product.jpg"
            price="50000"
            />
            <Product
            id="7" 
            img="../product.jpg"
            price="50000"
            />
          
        </div>

      </div>
    </div>
  )
}

export default Index
