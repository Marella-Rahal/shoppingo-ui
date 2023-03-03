import React from 'react'

const CheckoutForm = (props) => {
  return (
    <div className={props.pos?'hidden lg:flex flex-col space-y-7':'flex lg:hidden flex-col space-y-7'}>
        <div className='flex space-x-3'>
            <input type="text" placeholder='الاسم الأخير' className='text-end outline-none py-1 px-2 w-1/3 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-effectColor' required />
            <input type="text" placeholder='الاسم الأوسط' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-effectColor  w-1/3' required />
            <input type="text" placeholder='الاسم الأول' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-effectColor w-1/3' required />
        </div>

        <input type="email" placeholder='الإيميل' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-effectColor' required />

        <input type="number" placeholder='+963' className='outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-effectColor' required />

        <div className='flex space-x-3'>

            <input type="text" placeholder='المحافظة' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-effectColor w-1/2' required />

            <input type="text" value='سوريا' className='text-end outline-none py-1 px-2 rounded-md w-1/2 border-2 border-textColor dark:border-transparent disabled:bg-white disabled:text-textColor' disabled={true} />

        </div>

        <input type="text" placeholder='العنوان' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-effectColor' required />

        {/* //! total Price */}

        <div className='flex shadow-md shadow-shadowColor rounded-md border-x-4 border-effectColor bg-white text-textColor p-2 justify-center text-[14px] font-semibold'><span className='mr-2'>ل.س</span> 100000000000000000 </div>

        <button className='py-2 rounded-md bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b'>شراء</button>
    </div>
  )
}

export default CheckoutForm