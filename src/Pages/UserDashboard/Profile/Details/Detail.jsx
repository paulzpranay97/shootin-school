import { useNavigate, NavLink, Outlet } from "react-router-dom";
import StaticPageHeaders from "../../../../Components/StaticPageHeaders";
import "./index.css";

const Detail = () => {
  const navigate = useNavigate();

  return (
    <>
      <StaticPageHeaders title="Your Profile" />

      <div className="profile-section-container">
        
        {/* Sidebar */}
        <div className="profile-sidebar">

          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `profile-sidebar-btn ${isActive ? "active" : ""}`
            }
          >
            Personal Details
          </NavLink>

          <NavLink
            to="/profile/players"
            className={({ isActive }) =>
              `profile-sidebar-btn ${isActive ? "active" : ""}`
            }
          >
            My Players
          </NavLink>

          <NavLink
            to="/profile/billing"
            className={({ isActive }) =>
              `profile-sidebar-btn ${isActive ? "active" : ""}`
            }
          >
            Payments & Billings
          </NavLink>

          <NavLink
            to="/profile/packages"
            className={({ isActive }) =>
              `profile-sidebar-btn ${isActive ? "active" : ""}`
            }
          >
            My Packages
          </NavLink>

          <NavLink
            to="/profile/password"
            className={({ isActive }) =>
              `profile-sidebar-btn ${isActive ? "active" : ""}`
            }
          >
            Change Password
          </NavLink>

          <button
            className="profile-sidebar-btn"
            onClick={() => navigate("/logout")}
          >
            Log Out
          </button>
        </div>

        {/* Content Area */}
        <div className="profile-content-area">
          <Outlet />
        </div>

      </div>
    </>
  );
};

export default Detail;
