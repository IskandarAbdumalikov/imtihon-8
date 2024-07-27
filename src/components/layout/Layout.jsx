import React, { Fragment, memo } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  );
};

export default memo(Layout);
