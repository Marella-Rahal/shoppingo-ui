import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Placeholder = () => {
  return (
    <div className='w-[200px] h-[300px] m-5 rounded-lg shadow-md shadow-shadowColor flex justify-center items-center bg-gradient-to-tr from-darkBgColor to-darkTextColor2'>
        <Triangle
        height="50"
        width="50"
        color="#fff8f0"
        visible={true}
        />
    </div>
  )
}

export default Placeholder