import React from "react";
import {AnimatePresence, motion} from 'framer-motion';
import axios from "axios";
import { parseCookies } from "nookies";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { showPopUpNote } from "./NotePopUp";

const RatingPopUp = (props) => {

  const cookies = parseCookies();
  const token = cookies.token;

  const [value,setValue] = useState('');
  const [sendingStatus,setSendingStatus]=useState(false);

  const sendRating = async (e) => {

    e.preventDefault();

    try {
      
      setSendingStatus(true);

      const res = await axios.post(`${process.env.server_url}/api/v2.0/shop/addReview/${props.brandId}`,{
        value
      },{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      setSendingStatus(false);

      setValue('');

      props.setRatingPopUp(false);

      props.setNoteMsg(<h5 className='text-red-600 text-center'>{res.data.message}</h5>);
      showPopUpNote();

      props.setRating(String(res.data.meanRating));

      props.uniqueProducts.forEach((p)=>{
        if(props.shopRoute){
          p.brand._id==props.brandId ? p.meanRating = res.data.meanRating : null
        }else{
          p.product.brand==props.brandId ? p.meanRating = res.data.meanRating : null
        }
      })

    } catch (error) {

      setSendingStatus(false);

      props.setNoteMsg(<h5 className='text-red-600 text-center'>{error?.message}</h5>);
      showPopUpNote();

    }

  };


  return (
    <AnimatePresence mode="wait">
        {
          props.ratingPopUp && (
            
              <motion.form
              initial={{opacity:0,y:'230%'}} animate={{opacity:1,y:'105%'}} exit={{opacity:0,y:'230%'}}
              transition={{ ease: "easeInOut", duration: 0.7 }}
              className="absolute w-[250px] p-5 px-[17px] bg-bgColor dark:bg-darkBgColor rounded-lg shadow-sm shadow-shadowColor flex flex-col space-y-5 items-center"
              onSubmit={sendRating}
              >
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="1"
                    required
                    placeholder="3"
                    value={value}
                    onChange={ (e) => setValue(e.target.value) }
                    className="px-2 rounded-md shadow-md shadow-shadowColor w-full outline-none ring-yellow-400 dark:ring-darkTextColor2 focus:ring-2"
                  />

                  <div className="flex space-x-3">
                      <button
                        type="button"
                        className="bg-yellow-400 hover:bg-yellow-600 p-0 w-[75px] h-[30px] flex justify-center items-center"
                        disabled={sendingStatus}
                        onClick={() => props.setRatingPopUp(false)}
                      >
                        {
                          !sendingStatus ? 'إغلاق' : (
                            <ThreeDots
                              width="30"
                              color="#ffffff"
                              visible={true}
                            />
                          )
                        }
                      </button>
                      <button
                        disabled={sendingStatus}
                        className="bg-yellow-400 hover:bg-yellow-600 p-0 w-[75px] h-[30px] flex justify-center items-center"
                      >
                        {
                          !sendingStatus ? 'تقييم' : (
                            <ThreeDots
                              width="30"
                              color="#ffffff"
                              visible={true}
                            />
                          )
                        }
                      </button>
                  </div>

              </motion.form>
            
        )}

    </AnimatePresence>
  );
};

export default RatingPopUp;
