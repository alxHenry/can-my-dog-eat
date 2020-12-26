import "../styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { logPageView } from "../util/gtag";
import { ChakraProvider } from "@chakra-ui/react";

import styles from "./_app.module.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      logPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <ChakraProvider>
      <div className={styles.appContainer}>
        <div className={styles.appContent}>
          <SiteHeader />
          <Component {...pageProps} />
        </div>
        <footer className={styles.appStickyFooter}>
          <SiteFooter />
        </footer>
      </div>
    </ChakraProvider>
  );
};

export default MyApp;
