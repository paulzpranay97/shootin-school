import { useNavigate, NavLink, Outlet } from "react-router-dom";
import StaticPageHeaders from "../../../../Components/StaticPageHeaders";
import "./index.css";

import {useLogout} from "../../../../APIContext/UseLogout";
import Swal from "sweetalert2";



const Detail = () => {
  const navigate = useNavigate();

  const handleLogout = useLogout();

    const handleLogoutConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f68e1b"
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

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
            onClick={handleLogoutConfirm}
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
