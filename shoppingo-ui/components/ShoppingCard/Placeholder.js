import React from 'react'
import { Bars } from 'react-loader-spinner'

const Placeholder = () => {
  return (
    <div className='w-[275px] h-[425px] mt-14 mx-1 xs:mx-3 rounded-md shadow-md shadow-shadowColor flex justify-center items-center bg-gray-400'>
        <Bars
        height="50"
        width="50"
        color="#fff8f0"
        visible={true}
        />
    </div>
  )
}

export default Placeholder