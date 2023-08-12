import React from 'react'

const FailToGet = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>

        <div className='flex flex-col justify-center items-center space-y-20 text-center'>
            <div className='w-[75%] font-bold'>فشلنا في الحصول على البيانات أعد تحميل الصفحة للمحاولة مرة أخرى</div>
            <img src='../../failToGet.svg'/>
        </div>    

    </div>
  )
}

export default FailToGet