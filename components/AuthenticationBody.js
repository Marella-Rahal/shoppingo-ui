import React from 'react';
import { BsCamera } from 'react-icons/bs';

const AuthenticationBody = ({ children, upgrade, setImgURL , previewImgURL , setPreviewImgURL }) => {

  const updateImage = (e) => {
    if (e.target.files[0]) {

      //! for preview
      setPreviewImgURL(URL.createObjectURL(
        e.target.files[0]
      ))
      //! to store it for the backend
      setImgURL(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="pt-28 pb-14 w-full min-h-screen md:h-screen flex flex-col justify-center md:flex-row bg-gradient-to-bl from-bgColor to-gradientTo md:to-gradientTo/50 dark:from-darkTextColor2 dark:to-darkBgColor">
        {!upgrade ? (

          <div className="hidden md:flex w-1/2 h-full opacity-80">
            <img src="../authentication.svg" className="w-full h-full" />
          </div>

        ) : (
          <div className="flex w-full md:w-1/2 h-full mb-10 md:mb-0">
            <div className="w-full flex flex-col items-center h-full justify-center align-middle">
              <div className="relative select-none">
                <img
                  src={previewImgURL}
                  className="w-48 h-48 md:w-72 md:h-72 rounded-full bg-bgColor dark:bg-darkTextColor shadow-2xl shadow-darkTextColor2"
                />

                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 right-7 md:bottom-1 md:right-10 w-10 h-10 md:w-14 md:h-14 flex justify-center items-center rounded-full bg-bgColor dark:bg-darkTextColor shadow-2xl shadow-darkTextColor2 hover:scale-[1.1] cursor-pointer"
                >
                  <BsCamera className="w-6 h-6 md:w-10 md:h-10 text-textColor dark:text-darkBgColor" />
                </label>

                <input
                  type="file"
                  accept="image/*"
                  id="profilePhoto"
                  className="hidden"
                  onChange={updateImage}
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full md:w-1/2 md:h-full flex justify-center items-center">

          <div className="bg-bgColor dark:bg-darkTextColor rounded-lg md:shadow-2xl md:shadow-darkTextColor2 px-4 py-7 md:p-7 w-[90%] md:w-[75%]">
            {children}
          </div>

        </div>

      </div>
    </>
  );
};

export default AuthenticationBody;
