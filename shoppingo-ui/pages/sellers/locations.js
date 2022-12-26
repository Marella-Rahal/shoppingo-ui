import React, { useEffect, useState } from "react";
import Map from "../../components/Map";
import NotePopUp, { showPopUpNote } from "../../components/PopUp/NotePopUp";

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
