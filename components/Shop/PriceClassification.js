import React from "react";
import { useState } from "react";
import { showPopUpNote } from "../PopUp/NotePopUp";

const PriceClassification = ({PShow , setPShow , setProducts , uniqueProducts ,shopRoute ,setNoteMsg , setSelectedOptionsForFemale , setSelectedOptionsForMale}) => {

  const [from,setFrom]=useState('');
  const [to,setTo]=useState('');

  const orderByPrice = (type) => {

      const sortedData=[...uniqueProducts];

      if(type=='LTH'){

        setSelectedOptionsForFemale([]);
        setSelectedOptionsForMale([]);
        document.querySelector('#searchId').value='';

        sortedData.sort( (a,b) => ( shopRoute ? a.price : a.updatedPrice )  -  ( shopRoute ? b.price : b.updatedPrice )  );

        setProducts(sortedData);

        setPShow(false);

      }else if(type=='HTL'){

        setSelectedOptionsForFemale([]);
        setSelectedOptionsForMale([]);
        document.querySelector('#searchId').value='';

        sortedData.sort( (a,b) => ( shopRoute ? b.price : b.updatedPrice )  -  ( shopRoute ? a.price : a.updatedPrice ) );

        setProducts(sortedData);

        setPShow(false);

      }else{

        if( from.length==0 || to.length==0 ){

          setNoteMsg(<h5 className='text-red-600 text-center'>الرجاء ملء الحقلين لترتيب المنتجات ضمن مجال محدد</h5>);
          showPopUpNote();

        }else if( Number(from) < 0 || Number(to) < 0 ){

          setNoteMsg(<h5 className='text-red-600 text-center'>يجب أن تكون قيمة الحقلين أكبر أو تساوي الصفر</h5>);
          showPopUpNote();

        }else if( Number(from) > Number(to) ){

          setNoteMsg(<h5 className='text-red-600 text-center'>يجب أن يكون الحقل الأول أصغر أو يساوي الحقل الثاني</h5>);
          showPopUpNote();

        }else{

          setSelectedOptionsForFemale([]);
          setSelectedOptionsForMale([]);
          document.querySelector('#searchId').value='';

          setProducts(sortedData.filter( s => (shopRoute ? s.price : s.updatedPrice) >= Number(from) && (shopRoute ? s.price : s.updatedPrice) <= Number(to) ).sort( (a,b) => (shopRoute ? a.price : a.updatedPrice)  -  (shopRoute ? b.price : b.updatedPrice) ));

          setFrom('');
          setTo('');

          setPShow(false);
        }

      }

  }

  return (
    <div className={`absolute top-[70px] left-[1px] md:top-[50px] md:-left-[47px] text-textColor dark:text-darkBgColor bg-white rounded-lg shadow-md shadow-shadowColor w-[190px] flex-col ${ PShow ? 'flex' : 'hidden' } text-sm font-bold`}>
      <div className="rounded-t-lg border-b-2 border-shadowColor/20 hover:bg-textColor hover:text-white dark:hover:bg-darkBgColor p-2 text-center cursor-pointer" onClick={() => orderByPrice('LTH')}>
        من المنخفض إلى المرتفع
      </div>
      <div className="border-b-2 border-shadowColor/20 hover:bg-textColor hover:text-white dark:hover:bg-darkBgColor p-2 text-center cursor-pointer" onClick={() => orderByPrice('HTL')}>
        من المرتفع إلى المنخفض
      </div>
      <div className="hover:bg-textColor hover:text-white dark:hover:bg-darkBgColor rounded-b-lg p-2 flex flex-col space-y-2">
        <div className="text-center">من</div>
        <input
          type="number"
          placeholder="20000"
          value={from}
          onChange={(e)=>setFrom(e.target.value)}
          className="rounded-full shadow-md shadow-shadowColor outline-none py-1 px-5"
        />
        <div className="text-center">إلى</div>
        <input
          type="number"
          placeholder="100000"
          value={to}
          onChange={(e)=>setTo(e.target.value)}
          className="rounded-full shadow-md shadow-shadowColor outline-none py-1 px-5"
        />
        <div className="select-none rounded-lg shadow-md shadow-shadowColor bg-white hover:scale-[1.05] text-textColor dark:text-darkBgColor  self-center px-5 py-1 cursor-pointer" onClick={() => orderByPrice('RANGE')}>
          رتب
        </div>
      </div>
    </div>
  );
};

export default PriceClassification;
