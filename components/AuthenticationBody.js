import React from 'react'

const AuthenticationBody = ({ children }) => {

    return (
        <>
            <div
                className="pt-28 pb-14 w-full min-h-screen md:h-screen flex bg-gradient-to-bl from-bgColor to-gradientTo md:to-gradientTo/50 dark:from-darkTextColor2 dark:to-darkBgColor"
            >
                <div
                    className="hidden md:flex w-1/2 h-full opacity-80"
                >
                    <img src='../authentication.svg' className='w-full h-full'/>
                </div>

                <div className='w-full md:w-1/2 md:h-full flex justify-center items-center'>
                    <div
                        className="bg-bgColor dark:bg-darkTextColor rounded-lg md:shadow-2xl md:shadow-darkTextColor2 px-4 py-7 md:p-7 w-[90%] md:w-[75%]"
                    >
                        {children}
                    </div>
                </div>

            </div>

        </>
    )
}

export default AuthenticationBody