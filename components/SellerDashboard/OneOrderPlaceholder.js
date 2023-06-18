import React from 'react'
import { Triangle } from 'react-loader-spinner'


const OneOrderPlaceholder = () => {
  return (
    <div className='w-full h-[435px] md:h-[100px] my-5 rounded-lg flex justify-center items-center bg-gradient-to-tr from-darkBgColor to-darkTextColor2'>
        <Triangle
        height="50"
        width="50"
        color="#fff8f0"
        visible={true}
        />
    </div>
  )
}

export default OneOrderPlaceholder