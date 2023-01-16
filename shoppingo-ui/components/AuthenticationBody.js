import { useRouter } from 'next/router'
import React from 'react'

const AuthenticationBody = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <div
                id="coloredDiv"
                className="md:relative w-full min-h-screen md:h-screen flex items-center justify-center bg-gradient-to-tr from-gradientTo to-bgColor md:from-bgColor md:to-bgColor pt-28 pb-20 md:py-0"
            >
                <div
                    id="imageDiv"
                    className="hidden md:block custom-img bg-no-repeat bg-center w-[50%] h-full opacity-50"
                />

                <div
                    id="gradientDiv"
                    className="hidden md:block bg-gradient-to-l from-gradientTo to-bgColor w-[50%] h-full opacity-60"
                />
                <div
                    id="form"
                    className="md:absolute md:top-[50%] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%] bg-bgColor rounded-xl shadow-md shadow-shadowColor px-4 py-7 md:p-7 w-[90%] md:w-[300px]"
                >
                    {children}
                </div>

            </div>

            <style jsx>
                {`
                    .custom-img {
                        background-image: url("../authentication.svg");
                    }

                    @media (orientation: landscape) and (min-width: 767px) and (max-height: 711px) {
                        #form {
                        margin-block: 50px;
                        }

                        #imageDiv {
                        padding-block: 400px;
                        }

                        #gradientDiv {
                        padding-block: 400px;
                        }
                    }

                    @media (orientation: landscape) and (min-width: 767px) and (max-height: 611px) {
                        #form {
                        margin-block: 100px;
                        }

                        #imageDiv {
                        padding-block: 450px;
                        }

                        #gradientDiv {
                        padding-block: 450px;
                        }
                    }

                    @media (orientation: landscape) and (min-width: 767px) and (max-height: 511px) {
                        #form {
                        margin-block: 150px;
                        }

                        #imageDiv {
                        padding-block: 500px;
                        }

                        #gradientDiv {
                        padding-block: 500px;
                        }
                    }

                    @media (orientation: landscape) and (min-width: 767px) and (max-height: 411px) {
                        #form {
                        margin-block: 200px;
                        }

                        #imageDiv {
                        padding-block: 550px;
                        }

                        #gradientDiv {
                        padding-block: 550px;
                        }
                    }
                `}
            </style>
        </>
    )
}

export default AuthenticationBody