import React from "react";

export const showPopUpNote = () => {
  document.querySelector(".fullScreenNote").style.display = "flex";
};

const NotePopUp = ({ noteMsg }) => {
  const closePopUp = () => {
    document.querySelector(".fullScreenNote").style.display = "none";
  };

  return (
    <div className="fullScreenNote hidden fixed z-[100] w-full h-full bg-black/30 justify-center items-center">
      <div
        style={{ boxShadow: "0px 0px 5px 5px rgba(255,255,255,1)" }}
        className="w-full sm:w-2/3 md:w-1/3 mx-4 sm:mx-0 p-5 font-semibold bg-white rounded-lg flex flex-col space-y-5"
      >
        {noteMsg}

        <button
          className="py-1 px-5 rounded-lg self-center bg-gradient-to-l from-red-900 to-red-500 hover:bg-gradient-to-b dark:bg-gradient-to-l dark:from-red-900 dark:to-red-500 dark:hover:bg-gradient-to-b"
          onClick={closePopUp}
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default NotePopUp;
