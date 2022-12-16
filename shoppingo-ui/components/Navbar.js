import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiFillHome,
  AiFillShop,
  AiFillHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { MdLocalOffer, MdOutlineAddShoppingCart } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const [shadow, setShadow] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [navBackground, setNavBackground] = useState("#fff8f0");
  const [logoUrl, setLogoUrl] = useState("logo.svg");

  //handle navbar's color and logo path
  useEffect(() => {
    //navbar color
    if (
      router.asPath == "/signup" ||
      router.asPath == "/login" ||
      router.asPath == "/login/forgetPassword" ||
      router.asPath == "/profile/upgrade"
    ) {
      setNavBackground("transparent");
    } else {
      setNavBackground("#fff8f0");
    }

    //logo path
    if (
      router.asPath == "/login" ||
      router.asPath == "/login/forgetPassword" ||
      router.asPath == "/profile/upgrade" ||
      router.asPath == "/profile/confirmSellers"
    ) {
      setLogoUrl("../logo.svg");
    } else {
      setLogoUrl("logo.svg");
    }
  }, [router.asPath]);

  //******************* */

  //handle navbar's shadow
  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
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
            ? "fixed z-50 w-full h-24 py-4 px-4 md:px-8 flex justify-between shadow-md shadow-shadowColor"
            : "fixed z-50 w-full h-24 py-4 px-4 md:px-8 flex justify-between"
        }
      >
        <div className="self-center md:hidden" onClick={handleSideNav}>
          <GiHamburgerMenu className="text-effectColor text-[40px] hover:cursor-pointer hover:scale-[1.1]" />
        </div>

        <ul className="hidden md:flex items-center space-x-4">
          <li>
            <button
              className="bg-gradient-to-l from-gradientFrom to-gradientTo p-2 hover:scale-[1.1]"
              onClick={() => router.push("/signup")}
            >
              إنشاء حساب
            </button>
          </li>

          <li>
            <button
              className="bg-gradient-to-l from-gradientFrom to-gradientTo p-2 hover:scale-[1.1]"
              onClick={() => router.push("/login")}
            >
              تسجيل دخول
            </button>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/shoppingCard">
              <MdOutlineAddShoppingCart className="text-effectColor group-hover:text-textColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/favourite">
              <AiFillHeart className="text-effectColor group-hover:text-textColor text-[30px]" />
            </Link>
          </li>

          {/* <li className='p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]'>
                    <Link href='/'>
                        <BsFillBriefcaseFill className="text-effectColor group-hover:text-textColor text-[30px]"/>
                    </Link>
                </li>  */}

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/shop">
              <MdLocalOffer className="text-effectColor group-hover:text-textColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/shop">
              <AiFillShop className="text-effectColor group-hover:text-textColor text-[30px]" />
            </Link>
          </li>

          <li className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/">
              <AiFillHome className="text-effectColor group-hover:text-textColor text-[30px]" />
            </Link>
          </li>
        </ul>

        <img src={logoUrl} alt="Logo" className="w-36 md:w-55" />
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
              ? "fixed z-50 top-0 right-0 h-full w-full xs:w-[75%] bg-bgColor flex flex-col p-7 space-y-7 overflow-y-auto ease-linear duration-300"
              : "fixed z-50 top-0 right-[-100%] h-full w-full xs:w-[75%] bg-bgColor flex flex-col p-7 space-y-7 overflow-y-auto ease-linear duration-100"
          }
        >
          {/* //todo */}

          <div className="flex justify-between">
            <div
              className="self-center rounded-full p-2 shadow-md shadow-shadowColor hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <AiOutlineClose className="text-effectColor text-[30px] hover:cursor-pointer " />
            </div>

            <img src={logoUrl} alt="Logo" className="w-36 md:w-55" />
          </div>

          {/* //todo */}

          <ul className="flex flex-col items-center space-y-7">
            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/">
                <AiFillHome className="text-effectColor group-hover:text-textColor text-[30px]" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/shop">
                <AiFillShop className="text-effectColor group-hover:text-textColor text-[30px]" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/shop">
                <MdLocalOffer className="text-effectColor group-hover:text-textColor text-[30px]" />
              </Link>
            </li>

            {/* <li className='p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]' onClick={handleSideNav}>
                            <Link href='/'>
                                <BsFillBriefcaseFill className="text-effectColor group-hover:text-textColor text-[30px]"/>
                            </Link>
                        </li>  */}

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/favourite">
                <AiFillHeart className="text-effectColor group-hover:text-textColor text-[30px]" />
              </Link>
            </li>

            <li
              className="p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <Link href="/shoppingCard">
                <MdOutlineAddShoppingCart className="text-effectColor group-hover:text-textColor text-[30px]" />
              </Link>
            </li>

            <li>
              <button
                className="bg-gradient-to-l from-gradientFrom to-gradientTo p-2 hover:scale-[1.1]"
                onClick={() => router.push("/login")}
              >
                تسجيل دخول
              </button>
            </li>

            <li>
              <button
                className="bg-gradient-to-l from-gradientFrom to-gradientTo p-2 hover:scale-[1.1]"
                onClick={() => router.push("/signup")}
              >
                إنشاء حساب
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
