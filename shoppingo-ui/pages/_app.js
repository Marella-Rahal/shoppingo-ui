import Head from "next/head";
import "../styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

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
      delay: 500,
      duration: 1000,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Shoppingo</title>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Personal Assistant for Shopping and Budget Management"
        />
        <meta name="keywords" content="Shoppingo" />
        <meta name="author" content="Marella Rahal" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/> */}
      </Head>

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
    </>
  );
}

export default MyApp;
