import Head from "next/head";
import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { ThemeProvider } from 'next-themes';

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>shoppingo</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Personal Assistant for Shopping"
        />
        <meta name="keywords" content="shoppingo-shopping-shop-personal-assistant-nextjs-reactjs-javascript-tailwind-mapboxgl" />
        <meta name="author" content="Marella Rahal - Ghaith Othman" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#121212"/>
        <link rel="icon" href="logo.svg" />

        {/* 𝘀𝗲𝘁𝘁𝗶𝗻𝗴 𝘂𝗽 𝗰𝗮𝗶𝗿𝗼 𝗳𝗼𝗻𝘁 */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Cairo&display=swap" rel="stylesheet"/>

      </Head>

      {/* //todo for dark mode  */}
      <ThemeProvider attribute="class" enableSystem={false}>

        {/* //todo animation for the whole page */}
        <AnimatePresence mode="wait">

          <motion.div
            key={router.route}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>

      </ThemeProvider>

    </>
  );
}

export default MyApp;
