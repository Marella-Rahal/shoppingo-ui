import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Card from '../../../components/AddProduct/Card';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsCamera } from 'react-icons/bs';
import NotePopUp, { showPopUpNote } from '../../../components/PopUp/NotePopUp';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/router';

const AddProduct = () => {
  const [Man, setMan] = useState([
    'جاكيت',
    'طقم',
    'بنطال',
    'قميص',
    'كنزة',
    'حزام',
    'ملابس سباحة',
    'شورت',
    'بجامة',
    'هوديز',
    'قبعة',
    'وشاح',
    'ربطة عنق',
  ]);
  const [Woman, setWoman] = useState([
    'فستان',
    'تنورة',
    'جاكيت',
    'طقم',
    'بنطال',
    'قميص',
    'كنزة',
    'حزام',
    'ملابس سباحة',
    'شورت',
    'بجامة',
    'هوديز',
    'قبعة',
    'وشاح',
    'ربطة عنق',
  ]);
  const [TypeOfClothes, setTypeOfClothes] = useState(Man);

  const [TypeOfClothes2, setTypeOfClothes2] = useState([
    'رياضي',
    'سهرة',
    'سبورشيك',
  ]);
  const [ShowDivForOption, setShowDivForOption] = useState(false);
  const [SelectIcon, setSelectIcon] = useState(true);
  const [sendingStatus, setSendingStatus] = useState(false);

  const [ArrayForSizes, setArrayForSizes] = useState([]);
  const [CheckXXL, setCheckXXL] = useState(true);
  const [Check3XL, setCheck3XL] = useState(true);
  const [Check4XL, setCheck4XL] = useState(true);
  const [Check5XL, setCheck5XL] = useState(true);
  const [Check6XL, setCheck6XL] = useState(true);
  const [CheckXS, setCheckXS] = useState(true);
  const [CheckM, setCheckM] = useState(true);
  const [CheckS, setCheckS] = useState(true);
  const [CheckL, setCheckL] = useState(true);
  const [CheckXL, setCheckXL] = useState(true);
  const [selectDiscount, setSelectDiscount] = useState();

  //Consts for api
  const [gender, setGender] = useState('male');
  const [type, setType] = useState('بنطال');
  const [style, setStyle] = useState('رياضي');
  const [brand, setBrand] = useState();
  const [modelNumber, setModelNumber] = useState();
  const [price, setPrice] = useState();
  const [fixedDiscount, setFixedDiscount] = useState(0);
  const [PercentageDiscount, setPercentageDiscount] = useState();
  const [description, setDescription] = useState();
  const [frontImgURL, setFrontImgURL] = useState();
  const [backImgURL, setBackImgURL] = useState();
  const [variations, setVariations] = useState([]);
  const router = useRouter();

  const cookies = parseCookies();
  const token = cookies.token;
  const [noteMsg, setNoteMsg] = useState('');

  const sendData = async (e) => {
    const fd = new FormData();
    
    if (frontImgURL) {
      fd.append('frontImgURL', frontImgURL, frontImgURL.name);
    } else {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء رفع صورة أمامية للمنتج
        </h5>
      );
      showPopUpNote();
      return;
    }

    if (backImgURL) {
      fd.append('backImgURL', backImgURL, backImgURL.name);
    } else {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء رفع صورة خلفية للمنتج
        </h5>
      );
      showPopUpNote();
      return;
    }

    if (variations.length != 0) {
      fd.append('variations', JSON.stringify(variations));
    } else {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء ادخل المقاسات الموجودة لديك للمنتج
        </h5>
      );
      showPopUpNote();
      return;
    }

    if (description == undefined) {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء ادخل وصف للمنتج
        </h5>
      );
      showPopUpNote();
      return;
    } else if (description.length < 10) {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء ادخل تفاصيل أكثر في وصف المنتج
        </h5>
      );
      showPopUpNote();
      return;
    } else {
      fd.append('description', description);
    }

    if (price == undefined) {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء ادخل السعر
        </h5>
      );
      showPopUpNote();
      return;
    } else {
      fd.append('price', price);
    }

    if (modelNumber == undefined) {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء ادخل رقم الموديل
        </h5>
      );
      showPopUpNote();
      return;
    } else {
      fd.append('modelNumber', modelNumber);
    }

    if (brand == undefined) {

      setNoteMsg(
        <h5 className="text-red-600 text-center flex flex-col justify-center items-center">
          الرجاء ادخل اسم الماركة
        </h5>
      );
      showPopUpNote();
      return;
    } else {
      fd.append('brand', brand);
    }

    if (fixedDiscount == undefined) {

      fd.append('fixedDiscount', undefined);
    } else {
      fd.append('fixedDiscount', fixedDiscount);
    }

    if (PercentageDiscount == undefined) {
      fd.append('PercentageDiscount', undefined);
    } else {
      fd.append('PercentageDiscount', PercentageDiscount);
    }

    fd.append('gender', gender);
    fd.append('type', type);
    fd.append('style', style);

    // for (let [key, value] of fd.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {

      setSendingStatus(true);

      const res = await axios.post(
        `${process.env.server_url}/api/v2.0/shop/addProduct`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data.success) {

        setSendingStatus(false);
        setNoteMsg(
          <h5 className="text-red-600 text-center">{res.data.message}</h5>
        );

        showPopUpNote();

      } else {
        
        router.push('/shop');
        
      }
    } catch (error) {

      setSendingStatus(false);

      setNoteMsg(
        <h5 className="text-red-600 text-center">{error?.message}</h5>
      );

      showPopUpNote();
    }
  };

  function checkIfSizeExsise(Check, value) {
    if (Check) {
      setArrayForSizes((ArrayForSizes) => [...ArrayForSizes, value]);
      var object = { size: value, quantity: 1, colors: [''] };
      setVariations([...variations, object]);
      
    } else {
      
      ArrayForSizes.forEach(function (item, i) {
        if (item == value) ArrayForSizes[i] = value + 2;
      });
      const updatedVariations = variations.filter((obj) => obj.size !== value);
      setVariations(updatedVariations);
      //   setArrayForSizes (ArrayForSizes.filter(function(item) {
      //     return item !== value;
      // }))

    }
    
  }

  const [img, setImg] = useState('../../defaultProduct.jfif');
  const [img2, setImg2] = useState('../../defaultProduct.jfif');

  const updateImage = (e) => {
    //! for preview
    if (e.target.files[0]) {
      document.getElementById('imgProfile').src = URL.createObjectURL(
        e.target.files[0]
      );
      setFrontImgURL(e.target.files[0]);
    }
  };

  const updateImage2 = (e) => {
    //! for preview
    if (e.target.files[0]) {
      document.getElementById('imgProfile2').src = URL.createObjectURL(
        e.target.files[0]
      );
      setBackImgURL(e.target.files[0]);
    }
  };

  return (
    <>
      {
          sendingStatus && (
            <div className='fixed z-[100] w-full h-full bg-black/30 flex justify-center items-center'>
                <ThreeDots
                width="75"
                color="white"
                visible={true}
                /> 
            </div>
          )
      }
      <NotePopUp noteMsg={noteMsg} />
      <Navbar />
      <div className="pt-28 pb-14 px-4 md:px-8 relative ">
        {/* div for inputs */}
        <form>
          <div className="w-full flex flex-col-reverse md:flex-row">
            {/* first column */}
            <div className="w-full md:w-1/2 md:p-7 md:pl-0 md:border-r-2 border-shadowColor/60 flex justify-end">
              <div className="flex flex-col w-full items-end">
                {/* first input */}
                <label className="flex  justify-end mb-5 mr-2 text-md md:text-xl">
                  : اسم الماركة
                </label>
                <input
                  type="text"
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  className="focus:outline-0 text-end rounded-xl px-3 shadow-xl w-full h-10 mb-7"
                />
                {/* second input */}
                <label className="flex  justify-end mb-5 mr-2 text-md md:text-xl">
                  : رقم الموديل
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    setModelNumber(e.target.value);
                  }}
                  className="focus:outline-0 text-start rounded-xl px-3 shadow-xl w-full h-10 mb-7"
                />
                {/* third input */}
                <label className="flex  justify-end mb-5 mr-2 text-md md:text-xl">
                  : السعر
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className="focus:outline-0 text-start rounded-xl px-3 shadow-xl w-full h-10 mb-7"
                />
                {/* fourth input */}
                <div className="flex space-x-3 items-center mb-5 mr-2">
                  <div className="text-textColor2 dark:text-darkTextColor2 text-xs">
                    ( غير ضروري )
                  </div>
                  <label className="flex justify-end text-md md:text-xl">
                    : حسم على المنتج
                  </label>
                </div>
                <div className=" flex w-full justify-end mb-2 pr-2">
                  <div className="flex space-x-3">
                    <label htmlFor='percentageDiscount' className=" text-sm md:text-md">نسبة مئوية</label>
                    <input
                      type="radio"
                      value="percentageDiscount"
                      name="Discount"
                      id="percentageDiscount"
                      onClick={() => {
                        setSelectDiscount(true);
                      }}
                      className="mt-1"
                    />
                  </div>

                  <div className="flex space-x-3 pl-20 ">
                    <label htmlFor="fixedDiscount" className="text-sm md:text-md">
                      قيمة ثابتة
                    </label>
                    <input
                      type="radio"
                      defaultChecked={true}
                      value="fixedDiscount"
                      name="Discount"
                      id="fixedDiscount"
                      onClick={() => {
                        setSelectDiscount(false);
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div
                  className={
                    selectDiscount
                      ? 'flex justify-end w-[99.9%]'
                      : 'flex justify-end w-full'
                  }
                >
                  {selectDiscount && (
                    <div className="font-bold text-xl mt-2 mr-2">%</div>
                  )}
                  <input
                    type="number"
                    onChange={(e) => {
                      if (selectDiscount) {
                        setPercentageDiscount(e.target.value);
                        setFixedDiscount(0);
                      } else {
                        setFixedDiscount(e.target.value.length !== 0 ? e.target.value : 0);
                        setPercentageDiscount();
                      }
                    }}
                    className="focus:outline-0 text-start  rounded-xl px-3  shadow-xl w-full h-10"
                  />
                </div>
              </div>
            </div>

            {/* second column */}
            <div className="w-full md:w-1/2 md:p-7 md:pr-0 flex-col text-end">
              <label className=" text-md md:text-xl mr-2">: نمط الألبسة</label>
              <div className=" flex w-full justify-end mt-5 pr-2">
                <div className="flex space-x-3">
                  <label htmlFor="female" className=" text-sm md:text-md">
                    نسائي
                  </label>
                  <input
                    type="radio"
                    value="Female"
                    name="gender"
                    id="female"
                    onClick={() => {
                      setTypeOfClothes(Woman);
                      setGender('female');
                      setType('تنورة');
                      setStyle('رياضي');
                    }}
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-3 pl-20 ">
                  <label htmlFor="male" className="text-sm md:text-md">
                    رجالي
                  </label>
                  <input
                    type="radio"
                    defaultChecked={true}
                    value="Male"
                    name="gender"
                    id="male"
                    onClick={() => {
                      setTypeOfClothes(Man);
                      setGender('male');
                    }}
                    className="mt-1"
                  />
                </div>
              </div>
              <select
                onChange={(e) => {
                  setType(e.target.value);
                }}
                className="w-full text-end mt-5 focus:outline-none rounded-xl h-10 shadow-xl bg-white dark:text-black pr-2 pb-1"
              >
                {TypeOfClothes.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <div className="text-md md:text-xl mt-7 mr-2">: نوع الألبسة</div>

              <div>
                <select
                  onChange={(e) => {
                    setStyle(e.target.value);
                  }}
                  className="w-full text-end mt-5 focus:outline-none rounded-xl h-10 shadow-xl bg-white dark:text-black pr-2 pb-1"
                >
                  {TypeOfClothes2.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mt-7 items-end">
                <label className="text-md md:text-xl mr-2">: الوصف</label>
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="mt-5 focus:outline-0 text-end rounded-xl p-2 shadow-xl w-full h-[144px] dark:bg-white dark:text-black sliderScroll mb-7 md:mb-0"
                />
              </div>
            </div>
          </div>
        </form>

        {/* div for title and button */}
        <div className="flex space-x-3 justify-end items-center mt-14">
          {/* div for button */}
          <div className="w-fit relative z-10">
            <button
              className="px-2 py-1"
              onClick={() => {
                setShowDivForOption(!ShowDivForOption);
                setSelectIcon(!SelectIcon);
              }}
            >
              <div className="flex items-center">
                {SelectIcon == true ? (
                  <IoIosArrowDown className="mr-2" />
                ) : (
                  <IoIosArrowUp className="mr-2" />
                )}
                القياس
              </div>
            </button>

            {/* //! *********************************** */}
            {ShowDivForOption && (
              <div className="absolute top-[100%] w-40 h-36 rounded-xl bg-white shadow-2xl flex p-3 ">
                {/* first col */}
                <div className="flex flex-col">
                  {/* div for one check */}
                  <div>
                    <label className="dark:text-black pr-1" htmlFor="XXL">
                      XXL
                    </label>
                    <input
                      type={'checkbox'}
                      checked={CheckXXL ? '' : 'checked'}
                      id="XXL"
                      onClick={() => {
                        checkIfSizeExsise(CheckXXL, 'XXL');
                        setCheckXXL(!CheckXXL);
                      }}
                    ></input>
                  </div>
                  {/* end of div */}
                  <div>
                    <label className="dark:text-black pr-1" htmlFor="3XL">
                      3XL
                    </label>
                    <input
                      type={'checkbox'}
                      checked={Check3XL ? '' : 'checked'}
                      id="3XL"
                      onClick={() => {
                        checkIfSizeExsise(Check3XL, '3XL');
                        setCheck3XL(!Check3XL);
                      }}
                    ></input>
                  </div>
                  <div>
                    <label className="dark:text-black pr-1" htmlFor="4XL">
                      4XL
                    </label>
                    <input
                      type={'checkbox'}
                      checked={Check4XL ? '' : 'checked'}
                      id="4XL"
                      onClick={() => {
                        checkIfSizeExsise(Check4XL, '4XL');
                        setCheck4XL(!Check4XL);
                      }}
                    ></input>
                  </div>
                  <div>
                    <label className="dark:text-black pr-1" htmlFor="5XL">
                      5XL
                    </label>
                    <input
                      type={'checkbox'}
                      checked={Check5XL ? '' : 'checked'}
                      id="5XL"
                      onClick={() => {
                        checkIfSizeExsise(Check5XL, '5XL');
                        setCheck5XL(!Check5XL);
                      }}
                    ></input>
                  </div>
                  <div>
                    <label className="dark:text-black pr-1" htmlFor="6XL">
                      6XL
                    </label>
                    <input
                      type={'checkbox'}
                      checked={Check6XL ? '' : 'checked'}
                      id="6XL"
                      onClick={() => {
                        checkIfSizeExsise(Check6XL, '6XL');
                        setCheck6XL(!Check6XL);
                      }}
                    ></input>
                  </div>
                </div>
                {/* line between col */}
                <div className="border-l-2 h-full ml-5 " />
                {/* second col */}
                <div className="flex flex-col pl-5">
                  {/* div for one check */}
                  <div>
                    <label className="dark:text-black pr-1" htmlFor="XS">
                      XS
                    </label>
                    <input
                      type={'checkbox'}
                      checked={CheckXS ? '' : 'checked'}
                      id="XS"
                      onClick={() => {
                        checkIfSizeExsise(CheckXS, 'XS');
                        setCheckXS(!CheckXS);
                      }}
                    ></input>
                  </div>
                  {/* end of div */}
                  <div>
                    <label className="dark:text-black pr-[14px]" htmlFor="S">
                      S
                    </label>
                    <input
                      type={'checkbox'}
                      checked={CheckS ? '' : 'checked'}
                      id="S"
                      onClick={() => {
                        checkIfSizeExsise(CheckS, 'S');
                        setCheckS(!CheckS);
                      }}
                    ></input>
                  </div>
                  <div>
                    <label className="dark:text-black pr-2" htmlFor="M">
                      M
                    </label>
                    <input
                      type={'checkbox'}
                      checked={CheckM ? '' : 'checked'}
                      id="M"
                      onClick={() => {
                        checkIfSizeExsise(CheckM, 'M');
                        setCheckM(!CheckM);
                      }}
                    ></input>
                  </div>
                  <div>
                    <label className="dark:text-black pr-[14px]" htmlFor="L">
                      L
                    </label>
                    <input
                      type={'checkbox'}
                      checked={CheckL ? '' : 'checked'}
                      id="L"
                      onClick={() => {
                        checkIfSizeExsise(CheckL, 'L');
                        setCheckL(!CheckL);
                      }}
                    ></input>
                  </div>
                  <div>
                    <label className="dark:text-black pr-1" htmlFor="XL">
                      XL
                    </label>
                    <input
                      type={'checkbox'}
                      checked={CheckXL ? '' : 'checked'}
                      id="XL"
                      onClick={() => {
                        checkIfSizeExsise(CheckXL, 'XL');
                        setCheckXL(!CheckXL);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-md md:text-xl text-center">
            القياسات + الألوان +الكمية
          </div>
        </div>
        {/* Card section */}
        <div className="flex justify-evenly flex-wrap">
          {ArrayForSizes.map(function (value, index) {
            return (
              <Card
                key={index}
                value={value}
                variations={variations}
                setVariations={setVariations}
              />
            );
          })}
        </div>
        {/* pictue for product section */}
        <div className="w-full flex justify-end text-md md:text-xl my-14">
          صور المنتج
        </div>

        <div className="w-full justify-evenly flex flex-col place-items-center md:flex-row">
          <div className="flex flex-col space-y-3 items-center mb-10 md:mb-0">
            <div className="relative">
              <img
                src={img}
                id="imgProfile"
                className="w-[250px] h-[300px] rounded-md shadow-shadowColor shadow-md"
              />

              <label
                htmlFor="profilePhoto"
                className="absolute top-[-13px] right-[-13px] w-10 h-10 flex justify-center items-center rounded-full shadow-md shadow-shadowColor hover:scale-[1.1] cursor-pointer bg-white"
              >
                <BsCamera className="w-7 h-7 text-textColor dark:text-darkBgColor" />
              </label>

              <input
                type="file"
                accept="image/*"
                id="profilePhoto"
                className="hidden"
                onChange={updateImage}
              />
            </div>

            <div className="text-sm font-bold">صورة أمامية للمنتج</div>
          </div>

          {/* second photo */}
          <div className="flex flex-col space-y-3 items-center">
            <div className="relative">
              <img
                src={img2}
                id="imgProfile2"
                className="w-[250px] h-[300px] rounded-md shadow-shadowColor shadow-md"
              />

              <label
                htmlFor="profilePhoto2"
                className="absolute top-[-13px] right-[-13px] w-10 h-10 flex justify-center items-center rounded-full shadow-md shadow-shadowColor hover:scale-[1.1] cursor-pointer bg-white"
              >
                <BsCamera className="w-7 h-7 text-textColor dark:text-darkBgColor" />
              </label>

              <input
                type="file"
                accept="image/*"
                id="profilePhoto2"
                className="hidden"
                onChange={updateImage2}
              />
            </div>

            <div className="text-sm font-bold">صورة خلفية للمنتج</div>
          </div>
        </div>

        {/*end of pictue for product section */}

        {/* submit section  */}

        <button
          disabled={sendingStatus}
          onClick={() => {
            sendData();
          }}
          className="mt-14 w-24 h-10 flex justify-center items-center bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl"
        >
          إضافة المنتج 
        </button>
      </div>
    </>
  );
};

export default AddProduct;
