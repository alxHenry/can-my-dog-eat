import "../styles/globals.css";
import { AppProps } from "next/app";
import React, { FC } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
      <SiteFooter />
    </>
  );
};

export default MyApp;
