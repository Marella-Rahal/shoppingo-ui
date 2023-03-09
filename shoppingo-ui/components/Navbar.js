import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiFillHome,
  AiFillShop,
  AiFillHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { MdLocalOffer, MdOutlineAddShoppingCart } from "react-icons/md";
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoIosPeople } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs'
import { useRouter } from "next/router";
import { useTheme } from 'next-themes'

const Navbar = () => {
  const router = useRouter();

  const [shadow, setShadow] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [navBackground, setNavBackground] = useState("#fff8f0");
  const [logoUrl, setLogoUrl] = useState('logo.svg');
  const [defaultImg, setDefaultImg] = useState('default.jpg');

  //! to avoide hydration mismatch when initialize the theme
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, [])
  //! *********************************************

  //handle navbar's color
  useEffect(() => {

    if (
      router.asPath == "/signup" ||
      router.asPath == "/login" ||
      router.asPath == "/login/forgetPassword" ||
      router.asPath == "/profile/upgrade"
    ) {
      setNavBackground("transparent");
    } else if ((router.asPath != "/signup" &&
      router.asPath != "/login" &&
      router.asPath != "/login/forgetPassword" &&
      router.asPath != "/profile/upgrade") && theme == "dark") {
      setNavBackground("#1E1E1E");
    } else if ((router.asPath != "/signup" &&
      router.asPath != "/login" &&
      router.asPath != "/login/forgetPassword" &&
      router.asPath != "/profile/upgrade") && theme == "light") {
      setNavBackground("#fff8f0");
    }

  }, [router.asPath, theme]);

  //******************* */

  //logo path and default image path
  useEffect(() => {

    if (
      router.asPath == "/login/forgetPassword" ||
      router.asPath == "/profile/upgrade" ||
      router.asPath == "/profile/confirmSellers" ||
      router.asPath == `/shop/${router.query.shopId}` ||
      router.asPath == `/productDetail/${router.query.productId}` ||
      router.asPath == `/shoppingCard/checkout`
    ) {
      setLogoUrl("../logo.svg");
      setDefaultImg('../default.jpg');
    }
    else if(
      router.asPath == "/profile/sellerDashboard"  ||
      router.asPath == "/profile/sellerDashboard/addProduct"
    ){
      setLogoUrl("../../logo.svg");
      setDefaultImg('../../default.jpg');
    } else {
      setLogoUrl("logo.svg");
      setDefaultImg('default.jpg')
    }

  }, [router.asPath])

  //******************* */

  //handle navbar's shadow
  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 25) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", handleShadow);
  }, []);

  //******************* */

  //handle side navbar
  const handleSideNav = () => {
    setSideNav((prev) => !prev);
  };

  //******************* */

  return (
    <>
      <div
        style={{ background: `${navBackground}` }}
        className={
          shadow
            ? "fixed z-50 w-full h-[75px] py-4 px-4 md:px-8 flex justify-between shadow-md shadow-shadowColor"
            : "fixed z-50 w-full h-[75px] py-4 px-4 md:px-8 flex justify-between"
        }
      >
        <div className="self-center md:hidden" onClick={handleSideNav}>
          <GiHamburgerMenu className="text-effectColor text-[30px] xs:text-[40px] hover:cursor-pointer hover:scale-[1.1]" />
        </div>

        <ul className="hidden md:flex items-center space-x-[10px] lg:space-x-4">

          {/* //*user image and log out and dark mode*/}

          {/* <li
            className="w-fit h-fit rounded-full shadow-md shadow-shadowColor cursor-pointer mr-4"
            onClick={() => router.push("/profile")}
          >
            <img src={defaultImg} className="w-[55px] h-[55px] rounded-full" />
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/">
              <RiLogoutCircleRLine className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
          </li>

          {
            ( mounted && theme == 'light') && (
              <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]" onClick={() => setTheme("dark")}>
                <div>
                  <BsFillMoonStarsFill className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
                </div>
              </li>
            )
          }

          {
            ( mounted && theme == 'dark') && (
              <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]" onClick={() => setTheme("light")}>
                <div>
                  <BsFillSunFill className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
                </div>
              </li>
            )
          } */}


          {/* //******log in and sign up****** */}
          <li>
            <button
              className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b w-[100px] py-2"
              onClick={() => router.push("/signup")}
            >
              إنشاء حساب
            </button>
          </li>

          <li>
            <button
              className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b w-[100px] py-2"
              onClick={() => router.push("/login")}
            >
              تسجيل دخول
            </button>
          </li>

          {/* //**************** */}

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/shoppingCard">
              <MdOutlineAddShoppingCart className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/favourite">
              <AiFillHeart className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/sellers">
              <IoIosPeople className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/offers">
              <MdLocalOffer className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/shop">
              <AiFillShop className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/">
              <AiFillHome className="text-effectColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
          </li>
        </ul>

        <img src={logoUrl} alt="Logo" className="w-28 xs:w-36" />
      </div>

      {/* //todo side navbar */}

      <div
        className={
          sideNav ? "fixed z-50 w-full h-full bg-black/50 md:hidden" : ""
        }
      >
        <div
          className={
            sideNav
              ? "fixed z-50 top-0 right-0 h-full w-[80%] xs:w-[75%] bg-bgColor dark:bg-darkBgColor flex flex-col p-7 space-y-7 overflow-y-auto ease-linear duration-300"
              : "fixed z-50 top-0 right-[-100%] h-full w-[80%] xs:w-[75%] bg-bgColor dark:bg-darkBgColor flex flex-col p-7 space-y-7 overflow-y-auto ease-linear duration-100"
          }
        >
          {/* //todo */}

          <div className="flex justify-between min-h-[50px] max-h-[50px] xs:max-h-[55px] xs:min-h-[55px]">
            <div
              className="self-center rounded-full p-2 shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <AiOutlineClose className="text-effectColor text-[25px] xs:text-[30px] group-hover:cursor-pointer " />
            </div>

            <img src={logoUrl} alt="Logo" className="w-24 xs:w-28" />
          </div>

          {/* //todo */}

          <ul className="flex flex-col items-center space-y-6 min-h-fit">
            {/* //*user image */}

            <li
              className="w-fit h-fit rounded-full shadow-md shadow-shadowColor cursor-pointer"
              onClick={() => { router.push("/profile"); handleSideNav(); }}
            >
              <img
                src={defaultImg}
                className="w-[70px] h-[70px] xs:w-[90px] xs:h-[90px] rounded-full"
              />
            </li>


            {/* //****************** */}

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/">
                <AiFillHome className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/shop">
                <AiFillShop className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/offers">
                <MdLocalOffer className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/sellers">
                <IoIosPeople className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/favourite">
                <AiFillHeart className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/shoppingCard">
                <MdOutlineAddShoppingCart className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
              </Link>
            </li>

            {/* //*log out and dark mode*/}

            {
              (mounted && theme == 'light') && (
                <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]" onClick={() => { setTheme("dark"); handleSideNav(); }}>
                  <div>
                    <BsFillMoonStarsFill className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
                  </div>
                </li>
              )
            }

            {
              (mounted && theme == 'dark') && (
                <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]" onClick={() => { setTheme("light"); handleSideNav(); }}>
                  <div>
                    <BsFillSunFill className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
                  </div>
                </li>
              )
            }

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/">
                <RiLogoutCircleRLine className="text-effectColor group-hover:text-textColor text-[25px] xs:text-[30px] dark:group-hover:text-darkTextColor" />
              </Link>
            </li>

            {/* //************* */}

            {/* //*sign in and log in */}
            {/* <li>
              <button
                className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b w-[100px] py-2"
                onClick={() => {router.push("/login");handleSideNav();}}
              >
                تسجيل دخول
              </button>
            </li>

            <li>
              <button
                className="w-[100px] py-2"
                onClick={() => {router.push("/signup");handleSideNav();}}
              >
                إنشاء حساب
              </button>
            </li> */}
            {/* //************ */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
