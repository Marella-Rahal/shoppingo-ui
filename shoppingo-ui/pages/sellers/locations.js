import React, { useEffect, useState } from "react";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";
import Loading from "../../components/Loading";
// to stop server side rendering because ( the rtl plugin does not work with it )
import dynamic from "next/dynamic";
import usePosition from "../../hooks/usePosition";
const Map = dynamic(() => import("../../components/Map/Map"), {
  loading: () => <Loading />,
  ssr: false,
});

const Locations = () => {

  //todo *********** the massage for the popUp
  const [noteMsg, setNoteMsg] = useState("");
  //todo ********** the location of the user
  const [coords, error] = usePosition();
  useEffect(() => {
    if (error) {
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
    <div className="w-full h-screen">
      <NotePopUp noteMsg={noteMsg} />
      {coords.length > 0 && <Map coords={coords} sellerRoute={true} />}
    </div>
  );
};

export default Locations;
