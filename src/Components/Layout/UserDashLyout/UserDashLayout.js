import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCustom from "../../NavbarCustom";
import DashSidebar from "../DashSidebar/DashSidebar";
import "./userdashlayout.css";
const Layout = () => {
  return (
    <div className="ui-layout">
      <NavbarCustom />
      <div className="render-output">
        <div className="app-container">
          <div className="app-sidebar">
            <DashSidebar />
          </div>
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
