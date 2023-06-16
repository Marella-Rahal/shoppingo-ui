import React from "react";
import {AnimatePresence, motion} from 'framer-motion';

const RatingPopUp = (props) => {

  //*************** */
  const sendRating = (e) => {
    e.preventDefault();
    props.setRatingPopUp(false);
  };
  //*************** */

  return (
    <AnimatePresence mode="wait">
        {
          props.ratingPopUp && (
            
              <motion.form
              initial={{opacity:0,y:'230%'}} animate={{opacity:1,y:'105%'}} exit={{opacity:0,y:'230%'}}
              transition={{ ease: "easeInOut", duration: 0.7 }}
              className="absolute w-[250px] p-5 px-[17px] bg-bgColor dark:bg-darkBgColor rounded-lg shadow-md shadow-shadowColor flex flex-col space-y-5 items-center"
              onSubmit={sendRating}
              >
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="1"
                    required
                    placeholder="3"
                    className="px-2 rounded-md shadow-md shadow-shadowColor w-full outline-none ring-yellow-400 dark:ring-darkTextColor2 focus:ring-2"
                  />

                  <div className="flex space-x-3">
                      <button
                        type="button"
                        className="bg-yellow-400 hover:bg-yellow-600 w-[75px]"
                        onClick={() => props.setRatingPopUp(false)}
                      >
                        إغلاق
                      </button>
                      <button
                        className="bg-yellow-400 hover:bg-yellow-600 w-[75px]"
                      >
                        تقييم
                      </button>
                  </div>

              </motion.form>
            
        )}

    </AnimatePresence>
  );
};

export default RatingPopUp;
