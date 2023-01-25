import Head from "next/head";
import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
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

  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 400,
      duration: 900,
    });

  }, []);

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
        <link rel="icon" href="logo.svg" />
      </Head>

      {/* //todo for dark mode  */}
      <ThemeProvider attribute="class">

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
            <Analytics />
          </motion.div>
        </AnimatePresence>

      </ThemeProvider>

    </>
  );
}

export default MyApp;
