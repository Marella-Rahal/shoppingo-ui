import React from 'react'

const Contactus = () => {
  return (
    <div className="pt-16 px-4 md:px-8">

        <h2 className="text-center">تواصل معنا</h2>

        <div className='mt-16 flex flex-col-reverse md:flex-row md:space-x-10 md:justify-between'>
            <textarea
            id='textarea'
            required 
            placeholder='محتوى الرسالة'
            className='md:w-1/2 text-end px-2 py-1 bg-transparent border-2 border-gray-500 rounded-lg outline-none mt-16 md:mt-0 h-36 md:h-auto dark:text-darkTextColor'
            />

            <div className='md:w-1/2 flex flex-col space-y-10'>
                <input 
                type="text"
                required 
                placeholder='الاسم الكامل' className='bg-transparent border-b-2 border-gray-500 outline-none rounded-none dark:text-darkTextColor text-end'/>
                <input 
                type="email"
                required 
                placeholder='البريد الإلكتروني' className='bg-transparent border-b-2 border-gray-500 outline-none rounded-none dark:text-darkTextColor text-end'/>
                <input 
                type="text"
                required 
                placeholder='الموضوع' 
                className='bg-transparent border-b-2 border-gray-500 outline-none rounded-none dark:text-darkTextColor text-end'/>

            </div>

        </div>

        <div className='mt-16 flex justify-center items-center'>

            <button className='px-3 py-1'>إرسال</button>

        </div>

        <style jsx>{`
        
            /* width */
            #textarea::-webkit-scrollbar {
                width: 0px;
                height:0px;
            }

        `}</style>
    </div>
  )
}

export default Contactus