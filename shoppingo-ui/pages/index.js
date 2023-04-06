import Contactus from "../components/Home/Contactus";
import Main from "../components/Home/Main";
import Services from "../components/Home/Services";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
      <Main/>
      <Services/>
      <Contactus/>

      <div className="mt-16 py-5 px-4 md:px-8 bg-gradient-to-l from-gradientFrom to-gradientTo dark:bg-gradient-to-tr dark:from-darkBgColor dark:to-darkTextColor2 text-center text-white text-lg">

        تواصل معنا عن طريق الإيميل<br/>
        ShoppingoTeam@gmail.com

      </div>

    </>
  )
}
