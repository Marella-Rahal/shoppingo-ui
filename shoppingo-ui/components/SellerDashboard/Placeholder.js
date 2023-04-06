import React from 'react'
import { Bars } from 'react-loader-spinner'

const Placeholder = () => {
  return (
    <div className='w-[200px] h-[300px] m-5 rounded-lg shadow-md shadow-shadowColor flex justify-center items-center bg-darkTextColor2'>
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