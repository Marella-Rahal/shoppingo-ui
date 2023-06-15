import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AiFillHome,
  AiFillShop,
  AiFillHeart,
  AiOutlineClose,
} from 'react-icons/ai';
import { MdLocalOffer, MdOutlineAddShoppingCart } from 'react-icons/md';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoIosPeople } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { destroyCookie, parseCookies } from 'nookies';

const Navbar = () => {

  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.token;
  const imgURL = cookies.imgURL;

  //! logout
  const logout=()=>{
    destroyCookie(null,'token');
    destroyCookie(null,'imgURL');
    destroyCookie(null,'role');
    router.reload();
  }

  const [shadow, setShadow] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [navBackground, setNavBackground] = useState('#fff8f0');
  const [logoUrl, setLogoUrl] = useState('');

  //! to avoide hydration mismatch when initialize the theme
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  //! *********************************************

  //handle navbar's color
  useEffect(() => {
    if (
      router.asPath == '/signup' ||
      router.asPath == '/login' ||
      router.asPath == '/login/forgetPassword' ||
      router.asPath == '/profile/upgrade'
    ) {
      setNavBackground('transparent');
    } else if (
      router.asPath != '/signup' &&
      router.asPath != '/login' &&
      router.asPath != '/login/forgetPassword' &&
      router.asPath != '/profile/upgrade' &&
      theme == 'dark'
    ) {
      setNavBackground('#121212');
    } else if (
      router.asPath != '/signup' &&
      router.asPath != '/login' &&
      router.asPath != '/login/forgetPassword' &&
      router.asPath != '/profile/upgrade' &&
      theme == 'light'
    ) {
      setNavBackground('#fff8f0');
    }
  }, [router.asPath, theme]);

  //******************* */

  //logo path
  useEffect(() => {
    if (
      router.asPath == '/login/forgetPassword' ||
      router.asPath == '/profile/upgrade' ||
      router.asPath == '/profile/confirmSellers' ||
      router.asPath == '/profile/sellerDashboard' ||
      router.asPath == '/profile/myPurchases' ||
      router.asPath == `/shop/${router.query.shopId}` ||
      router.asPath == `/productDetail/${router.query.productId}` ||
      router.asPath == `/shoppingCard/checkout`
    ) {
      setLogoUrl(theme == 'light' ? '../logo.svg' : '../darkLogo.svg');
    } else if (
      router.asPath == '/profile/sellerDashboard/addProduct' ||
      router.asPath == '/profile/sellerDashboard/order'
    ) {
      setLogoUrl(theme == 'light' ? '../../logo.svg' : '../../darkLogo.svg');
    } else {
      setLogoUrl(theme == 'light' ? 'logo.svg' : 'darkLogo.svg');
    }
  }, [router.asPath,theme]);

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

    window.addEventListener('scroll', handleShadow);
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
            ? 'fixed z-50 w-full h-[75px] py-4 px-4 md:px-8 flex justify-between shadow-sm shadow-shadowColor'
            : 'fixed z-50 w-full h-[75px] py-4 px-4 md:px-8 flex justify-between'
        }
      >
        <div className="self-center md:hidden" onClick={handleSideNav}>
          <GiHamburgerMenu className="text-effectColor dark:text-darkTextColor text-[30px] xs:text-[40px] hover:cursor-pointer hover:scale-[1.1]" />
        </div>

        <ul className="hidden md:flex items-center space-x-[10px] lg:space-x-4">

          {
            token ? (
              <>
                  <li
                    className="w-fit h-fit rounded-full shadow-md shadow-shadowColor dark:shadow-none dark:border-[1px] border-shadowColor/30 cursor-pointer mr-4"
                    onClick={() => router.push("/profile")}
                  >
                    <img src={imgURL} className="w-[55px] h-[55px] rounded-full" />
                  </li>

                  <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
                    <RiLogoutCircleRLine className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" onClick={logout}/>   
                    <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>تسجيل الخروج</div>
                  </li>

                  {
                    ( mounted && theme == 'light') && (
                      <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]" onClick={() => setTheme("dark")}>
                        <div>
                          <BsFillMoonStarsFill className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
                        </div>
                        <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>الوضع الليلي</div>
                      </li>
                    )
                  }

                  {
                    ( mounted && theme == 'dark') && (
                      <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]" onClick={() => setTheme("light")}>
                        <div>
                          <BsFillSunFill className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
                        </div>
                        <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>الوضع النهاري</div>
                      </li>
                    )
                  }
              </>
            ) : (
              <>
                  <li>
                    <button
                      className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl w-[100px] py-2"
                      onClick={() => router.push('/signup')}
                    >
                      إنشاء حساب
                    </button>
                  </li>

                  <li>
                    <button
                      className="bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl w-[100px] py-2"
                      onClick={() => router.push('/login')}
                    >
                      تسجيل دخول
                    </button>
                  </li>
              </>
            )
          }

          {
            token && (
              <>
                  <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
                    <Link href="/shoppingCard">
                      <MdOutlineAddShoppingCart className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
                    </Link>
                    <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>سلة المشتريات</div>
                  </li>

                  <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
                    <Link href="/favourite">
                      <AiFillHeart className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
                    </Link>
                    <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>المفضلة</div>
                  </li>
              </>
            )
          }

          <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/sellers">
              <IoIosPeople className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
            <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>التجار</div>
          </li>

          <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/offers">
              <MdLocalOffer className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
            <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>العروض</div>
          </li>

          <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/shop">
              <AiFillShop className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
            <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>المنتجات</div>
          </li>

          <li className="relative p-2 rounded-full shadow-md shadow-shadowColor group hover:scale-[1.1]">
            <Link href="/">
              <AiFillHome className="text-effectColor dark:text-darkTextColor group-hover:text-textColor dark:group-hover:text-darkTextColor text-[30px]" />
            </Link>
            <div className='hidden group-hover:flex justify-center items-center w-[110px] text-sm py-[2px] absolute top-[110%] -left-[65%] bg-bgColor dark:bg-darkTextColor text-textColor dark:text-darkBgColor rounded-md shadow-md shadow-shadowColor'>الصفحة الرئيسية</div>
          </li>
        </ul>

        <img src={logoUrl} alt="Logo" className="w-28 xs:w-36" />
      </div>

      {/* //todo side navbar */}

      <div
        className={
          sideNav ? 'fixed z-50 w-full h-full bg-black/50 md:hidden' : ''
        }
      >
        <div
          className={
            sideNav
              ? 'fixed z-50 top-0 right-0 h-full w-[80%] xs:w-[75%] bg-bgColor dark:bg-darkBgColor flex flex-col p-7 space-y-7 overflow-y-auto ease-linear duration-300'
              : 'fixed z-50 top-0 right-[-100%] h-full w-[80%] xs:w-[75%] bg-bgColor dark:bg-darkBgColor flex flex-col p-7 space-y-7 overflow-y-auto ease-linear duration-100'
          }
        >
          {/* //todo */}

          <div className="flex justify-between min-h-[50px] max-h-[50px] xs:max-h-[55px] xs:min-h-[55px]">
            <div
              className="self-center rounded-full p-2 shadow-md shadow-shadowColor group hover:scale-[1.1]"
              onClick={handleSideNav}
            >
              <AiOutlineClose className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px] group-hover:cursor-pointer " />
            </div>

            <img src={logoUrl} alt="Logo" className="w-24 xs:w-28" />
          </div>

          {/* //todo */}

          <ul className="self-center flex flex-col items-end space-y-6 text-end min-h-fit">
            {/* //*user image */}

            {
              token && (
                <li
                  className="self-center w-fit h-fit rounded-full shadow-md shadow-shadowColor dark:shadow-none dark:border-[1px] border-shadowColor/30 cursor-pointer"
                  onClick={() => {
                    router.push('/profile');
                    handleSideNav();
                  }}
                >
                  <img
                    src={imgURL}
                    className="w-[70px] h-[70px] xs:w-[90px] xs:h-[90px] rounded-full"
                  />
                </li>
              )
            }

            {/* //****************** */}

            <li 
            className='flex space-x-3 items-center group cursor-pointer' 
            onClick={()=>{router.push('/');handleSideNav(); }}>

                <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>الصفحة الرئيسية</div>
                <div
                  className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                >
                  <AiFillHome className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                </div>

            </li>

            <li 
            className='flex space-x-3 items-center group cursor-pointer' 
            onClick={()=>{router.push('/shop');handleSideNav(); }}>

                <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>المنتجات</div>
                <div
                  className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                >
                  <AiFillShop className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                </div>

            </li>

            <li 
            className='flex space-x-3 items-center group cursor-pointer' 
            onClick={()=>{router.push('/offers');handleSideNav(); }}>

                <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>العروض</div>
                <div
                  className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                >
                  <MdLocalOffer className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                </div>

            </li>

            <li 
            className='flex space-x-3 items-center group cursor-pointer' 
            onClick={()=>{router.push('/sellers');handleSideNav(); }}>

                <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>التجار</div>
                <div
                  className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                >
                  <IoIosPeople className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                </div>

            </li>

            {
              token ? (
                <>
                    <li 
                    className='flex space-x-3 items-center group cursor-pointer' 
                    onClick={()=>{router.push('/favourite');handleSideNav(); }}>

                        <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>المفضلة</div>
                        <div
                          className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                        >
                          <AiFillHeart className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                        </div>

                    </li>

                    <li 
                    className='flex space-x-3 items-center group cursor-pointer' 
                    onClick={()=>{router.push('/shoppingCard');handleSideNav(); }}>

                        <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>سلة المشتريات</div>
                        <div
                          className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                        >
                          <MdOutlineAddShoppingCart className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                        </div>

                    </li>

                    {/* //*log out and dark mode*/}

                    {mounted && theme == 'light' && (
                      <li 
                      className='flex space-x-3 items-center group cursor-pointer' 
                      onClick={() => setTheme('dark')}>
          
                          <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>الوضع الليلي</div>
                          <div
                            className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                          >
                            <BsFillMoonStarsFill className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                          </div>
          
                      </li>
                    )}

                    {mounted && theme == 'dark' && (
                      <li 
                      className='flex space-x-3 items-center group cursor-pointer' 
                      onClick={() => setTheme('light')}>
          
                          <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>الوضع النهاري</div>
                          <div
                            className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                          >
                            <BsFillSunFill className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                          </div>
          
                      </li>
                    )}

                    <li 
                    className='flex space-x-3 items-center group cursor-pointer' 
                    onClick={logout}>

                        <div className='text-sm group-hover:underline text-effectColor dark:text-darkTextColor'>تسجيل الخروج</div>
                        <div
                          className="p-2 rounded-full shadow-md shadow-shadowColor group-hover:scale-[1.05]"
                        >
                          <RiLogoutCircleRLine className="text-effectColor dark:text-darkTextColor text-[25px] xs:text-[30px]" />
                        </div>

                    </li>
                </>
              ) : (
                <>
                    <li className='w-full'>
                      <button
                        className="w-full bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl py-2"
                        onClick={() => {router.push("/login");handleSideNav();}}
                      >
                        تسجيل دخول
                      </button>
                    </li>

                    <li className='w-full'>
                      <button
                        className="w-full bg-gradient-to-l from-gradientFrom to-gradientTo hover:bg-gradient-to-b dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 dark:hover:bg-gradient-to-tl py-2"
                        onClick={() => {router.push("/signup");handleSideNav();}}
                      >
                        إنشاء حساب
                      </button>
                    </li>
                </>
              )
            }
            
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
