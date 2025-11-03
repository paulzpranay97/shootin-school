import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogin } from "../../../APIContext/LoginContext"; 
import "./dashsidebar.css";

const DashSidebar = () => {
  const location = useLocation();
  const { user, logout } = useLogin(); 
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);
  const isSubActive = (path) => location.pathname === path;
  const toggleUserMgmt = () => setUserMgmtOpen(!userMgmtOpen);

  if (!user) return null;

  return (
    <div className="sidebar">
      <div className={`sidebar-item ${isActive("/profile") ? "active" : ""}`}>
        <Link to="/profile">Profile</Link>
      </div>

      <div className={`sidebar-item ${isActive("/your-players") ? "active" : ""}`}>
        <Link to="/your-players">Your Players</Link>
      </div>

      <div className={`sidebar-item ${userMgmtOpen ? "has-active" : ""}`} onClick={toggleUserMgmt}>
        <span>Payments & Billings</span>
      </div>
      {userMgmtOpen && (
        <div className="dropdown">
          <div className={`sidebar-subitem ${isSubActive("/saved-payment-method") ? "active" : ""}`}>
            <Link to="/saved-payment-method">Saved Payment Method</Link>
          </div>
          <div className={`sidebar-subitem ${isSubActive("/payment-history") ? "active" : ""}`}>
            <Link to="/payment-history">Payment History</Link>
          </div>
        </div>
      )}

      <div className={`sidebar-item ${isActive("/view-all-sessions") ? "active" : ""}`}>
        <Link to="/view-all-sessions">View all Sessions</Link>
      </div>

      <div className={`sidebar-item ${isActive("/my-package-plans") ? "active" : ""}`}>
        <Link to="/my-package-plans">My Packages & Plans</Link>
      </div>

     

      <div className={`sidebar-item ${isActive("/change-password") ? "active" : ""}`}>
        <Link to="/change-password">Change Password</Link>
      </div>

      <div className="sidebar-item" onClick={logout}>
        <span>Log Out</span>
      </div>
    </div>
  );
};

export default DashSidebar;
