import React from "react";
import { Outlet } from "react-router-dom";
import Footer from '../Footer';
import NavbarCustom from "../NavbarCustom";
const Layout = () => {
  return (
    <div>
      <NavbarCustom/>
      <Outlet />
      <Footer/>
    </div>
  );
};


export default Layout;
