import React from 'react'

const CheckoutForm = (props) => {
  return (
    <div className={props.pos?'hidden lg:flex flex-col space-y-7':'flex lg:hidden flex-col space-y-7'}>
        <div className='flex space-x-3'>
            <input type="text" placeholder='الاسم الأخير' className='text-end outline-none py-1 px-2 w-1/3 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-darkTextColor2' required 
            value={props.lastName} onChange={(e)=>props.setLastName(e.target.value)}/>
            <input type="text" placeholder='الاسم الأوسط' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-darkTextColor2  w-1/3' required 
            value={props.middleName} onChange={(e)=>props.setMiddleName(e.target.value)}/>
            <input type="text" placeholder='الاسم الأول' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-darkTextColor2 w-1/3' required 
            value={props.firstName} onChange={(e)=>props.setFirstName(e.target.value)}/>
        </div>

        <input type="email" placeholder='الإيميل' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-darkTextColor2' required 
        value={props.email} onChange={(e)=>props.setEmail(e.target.value)}/>

        <input type="number" placeholder='+963' className='outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-darkTextColor2' required 
        value={props.phoneNumber} onChange={(e)=>props.setPhoneNumber(e.target.value)}/>

        <div className='flex space-x-3'>

            <input type="text" placeholder='المحافظة' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-darkTextColor2 w-1/2' required 
            value={props.city} onChange={(e)=>props.setCity(e.target.value)}/>

            <input type="text" value='سوريا' className='text-end outline-none py-1 px-2 rounded-md w-1/2 border-2 border-textColor dark:border-transparent disabled:bg-white disabled:text-textColor dark:disabled:text-darkBgColor' disabled={true} />

        </div>

        <input type="text" placeholder='العنوان' className='text-end outline-none py-1 px-2 rounded-md border-2 border-textColor  focus:border-effectColor dark:border-transparent dark:focus:border-darkTextColor2' required 
        value={props.address} onChange={(e)=>props.setAddress(e.target.value)}/>

        {/* //! total Price */}

        <div className='flex shadow-md shadow-shadowColor rounded-md border-x-4 border-effectColor dark:border-darkTextColor2 bg-white text-textColor dark:text-darkBgColor p-2 justify-center text-[14px] font-semibold'><span className='mr-2'>ل.س</span> {props.totalPrice} </div>

        <button type='submit' className='py-2 rounded-md bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl'>شراء</button>
    </div>
  )
}

export default CheckoutForm