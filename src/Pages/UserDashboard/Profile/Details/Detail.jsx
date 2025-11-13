import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaticPageHeaders from "../../../../Components/StaticPageHeaders";
import "./index.css";
import ProfileDetail from "./Sub-Section/ProfileDetail";
import Player from "./Sub-Section/Player";

const Detail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <>
      <StaticPageHeaders title="Your Profile" />

      <div className="profile-section-container">
        {/* Sidebar */}
        <div className="profile-sidebar" id="profile-sidebar">
          <button
            className={`profile-sidebar-btn ${
              activeTab === "personal" ? "active" : ""
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Details
          </button>
          <button
            className={`profile-sidebar-btn ${
              activeTab === "players" ? "active" : ""
            }`}
            onClick={() => setActiveTab("players")}
          >
            My Players
          </button>
          <button
            className={`profile-sidebar-btn ${
              activeTab === "billing" ? "active" : ""
            }`}
            onClick={() => setActiveTab("billing")}
          >
            Payments & Billings
          </button>
          <button
            className={`profile-sidebar-btn ${
              activeTab === "packages" ? "active" : ""
            }`}
            onClick={() => setActiveTab("packages")}
          >
            My Packages
          </button>
          <button
            className={`profile-sidebar-btn ${
              activeTab === "password" ? "active" : ""
            }`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
          <button
            className={`profile-sidebar-btn ${
              activeTab === "logout" ? "active" : ""
            }`}
            onClick={() => navigate("/logout")}
          >
            Log Out
          </button>
        </div>

        {/* Content Area */}
        <div className="profile-content-area" id="profile-content-area">
          {activeTab === "personal" && (
            <div id="profile-tab-personal">
              <ProfileDetail />
            </div>
          )}
          {activeTab === "players" && (
            <div id="profile-tab-players">
              <Player />
            </div>
          )}
          {activeTab === "billing" && (
            <div id="profile-tab-billing">
              <h3>Payments & Billings</h3>
              <p>View your billing and transaction history.</p>
            </div>
          )}
          {activeTab === "packages" && (
            <div id="profile-tab-packages">
              <h3>My Packages</h3>
              <p>Explore or upgrade your current packages.</p>
            </div>
          )}
          {activeTab === "password" && (
            <div id="profile-tab-password">
              <h3>Change Password</h3>
              <p>Update your account password securely.</p>
            </div>
          )}
        </div>
         
      </div>
    </>
  );
};

export default Detail;
