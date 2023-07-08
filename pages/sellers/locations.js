import React, { useEffect, useState } from "react";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";
import Loading from "../../components/Loading";
// to stop server side rendering because ( the rtl plugin does not work with it )
import dynamic from "next/dynamic";
import usePosition from "../../hooks/usePosition";
import FailToGet from "../../components/FailToGet";
import axios from "axios";
const Map = dynamic(() => import("../../components/Map/Map"), {
  loading: () => <Loading />,
  ssr: false,
});

const Locations = (props) => {

  const [noteMsg, setNoteMsg] = useState("");
  const [coords, error] = usePosition();
  const [once,setOnce]=useState(false);

  useEffect(() => {

    if (error && props.success && !once) {

      setOnce(true);
      setNoteMsg(
        <>
          <h5 className="text-effectColor text-center">
            فشلنا في الحصول على موقعك أعد تحميل الصفحة للمحاولة مرة أخرى
          </h5>
        </>
      );
      showPopUpNote();
    }
    
  }, [error])


  return (

    <>
      {
        props.success ? (
          <div className="w-full h-screen">
            <NotePopUp noteMsg={noteMsg} />
            {coords.length > 0 && <Map coords={coords} sellerRoute={true} stores={props.sellers}/>}
          </div>
        ) : (
          <FailToGet/>
        )
      }
    </>
  );
};

export default Locations;

export const getServerSideProps = async (context) => {

  try {

      const res= await axios.get(`${process.env.server_url}/api/v2.0/store/getAllSeller`);

      return {
        props : {
          success : true,
          sellers : res.data.success ? res.data.sellers : []
        }
      }
    
  } catch (error) {

      return {
        props : {
          success : false
        }
      }
    
  }

}
