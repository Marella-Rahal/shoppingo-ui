import React, { useEffect, useState } from "react";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";
import Loading from "../../components/Loading";
// to stop server side rendering because ( the rtl plugin does not work with it )
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../../components/Map"), {
  loading: () => <Loading />,
  ssr: false,
});

const Locations = () => {
  //todo *********** the massage for the popUp
  const [noteMsg, setNoteMsg] = useState("");
  //todo ********** the location of the user
  const [coords, setCoords] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([pos.coords.longitude, pos.coords.latitude]);
      },
      (err) => {
        setNoteMsg(
          <>
            <h5 className="text-effectColor text-center">
              فشلنا في الحصول على موقعك أعد تحميل الصفحة للمحاولة مرة أخرى
            </h5>
          </>
        );
        showPopUpNote();
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 15000,
      }
    );
  }, []);

  return (
    <div className="w-full h-screen">
      <NotePopUp noteMsg={noteMsg} />
      {coords.length > 0 && <Map coords={coords} sellerRoute={true} />}
    </div>
  );
};

export default Locations;
