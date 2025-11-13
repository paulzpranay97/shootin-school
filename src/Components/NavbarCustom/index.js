import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import CompanyLogo from "../../Assets/Images/company_logo.png";
import CartIcon from "../../Assets/Icons/CartIcon";
import UserIcon from "../../Assets/Icons/UserIcon";
import HamburgerIcon from "../../Assets/Icons/HamburgerIcon";
import { useLogin } from "../../APIContext/LoginContext";
import { Menubar } from "primereact/menubar";
import { Sidebar } from "primereact/sidebar";

const NavbarCustom = () => {
  const { user } = useLogin();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  

  // Menu items when NOT logged in
  const menuItemsGuestDesktop = [
    { label: "Home", template: () => <Link to="/" onClick={() => setSidebarVisible(false)}>Home</Link> },
    { label: "Your Packages", template: () => <Link to="/your-packages" onClick={() => setSidebarVisible(false)}>Your Packages</Link> },
    {
      label: "About",
      items: [
        { label: "Success Stories", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Success Stories</Link> },
        { label: "Sponsors", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Sponsors</Link> },
      ],
    },
    {
      label: "Services",
      items: [
        { label: "Group Instruction", template: () => <Link to="/group-instruction" onClick={() => setSidebarVisible(false)}>Group Instruction</Link> },
        { label: "Summer Camp", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Summer Camp</Link> },
        { label: "Team Workouts", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Team Workouts</Link> },
        { label: "Birthday Parties", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Birthday Parties</Link> },
      ],
    },
    { label: "Weekly Schedule", template: () => <Link to="/weekly-schedule" onClick={() => setSidebarVisible(false)}>Weekly Schedule</Link> },
    { label: "Online Shooting Course", template: () => <Link to="/online-shooting-course" onClick={() => setSidebarVisible(false)}>Online Shooting Course</Link> },
    { label: "Contact", template: () => <Link to="/contact" onClick={() => setSidebarVisible(false)}>Contact</Link> },
    { label: "How to Schedule", template: () => <Link to="/how-to-schedule" onClick={() => setSidebarVisible(false)}>How to Schedule</Link> },
  ];

  // Menu items when NOT logged in
  const menuItemsGuestMobile = [
    { label: "Home", template: () => <Link to="/" onClick={() => setSidebarVisible(false)}>Home</Link> },
    { label: "Your Packages", template: () => <Link to="/your-packages" onClick={() => setSidebarVisible(false)}>Your Packages</Link> },
    {
      label: "About",
      items: [
        { label: "Success Stories", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Success Stories</Link> },
        { label: "Sponsors", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Sponsors</Link> },
      ],
    },
    {
      label: "Services",
      items: [
        { label: "Group Instruction", template: () => <Link to="/group-instruction" onClick={() => setSidebarVisible(false)}>Group Instruction</Link> },
        { label: "Summer Camp", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Summer Camp</Link> },
        { label: "Team Workouts", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Team Workouts</Link> },
        { label: "Birthday Parties", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Birthday Parties</Link> },
      ],
    },
    { label: "Weekly Schedule", template: () => <Link to="/weekly-schedule" onClick={() => setSidebarVisible(false)}>Weekly Schedule</Link> },
    { label: "Online Shooting Course", template: () => <Link to="/online-shooting-course" onClick={() => setSidebarVisible(false)}>Online Shooting Course</Link> },
    { label: "Contact", template: () => <Link to="/contact" onClick={() => setSidebarVisible(false)}>Contact</Link> },
    { label: "How to Schedule", template: () => <Link to="/how-to-schedule" onClick={() => setSidebarVisible(false)}>How to Schedule</Link> },
    { 
        label: "Log Out", 
        // Use a functional template for the Logout button
        template: () => (
            <button 
                
                className="p-link" 
                style={{ color: '#F68E1B', fontWeight: 'bold' }}
            >
                Sign Up / Login
            </button>
        )
    },
  ];


   // Menu items when logged in
  const menuItemsUserDesktop = [
    { label: "Home", template: () => <Link to="/" onClick={() => setSidebarVisible(false)}>Home</Link> },
    { label: "Your Packages", template: () => <Link to="/your-packages" onClick={() => setSidebarVisible(false)}>Your Packages</Link> },
    {
      label: "About",
      items: [
        { label: "Success Stories", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Success Stories</Link> },
        { label: "Sponsors", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Sponsors</Link> },
      ],
    },
    {
      label: "Services",
      items: [
        { label: "Group Instruction", template: () => <Link to="/group-instruction" onClick={() => setSidebarVisible(false)}>Group Instruction</Link> },
        { label: "Summer Camp", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Summer Camp</Link> },
        { label: "Team Workouts", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Team Workouts</Link> },
        { label: "Birthday Parties", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Birthday Parties</Link> },
      ],
    },
    { label: "Weekly Schedule", template: () => <Link to="/weekly-schedule" onClick={() => setSidebarVisible(false)}>Weekly Schedule</Link> },
    { label: "Online Shooting Course", template: () => <Link to="/online-shooting-course" onClick={() => setSidebarVisible(false)}>Online Shooting Course</Link> },
    { label: "Contact", template: () => <Link to="/contact" onClick={() => setSidebarVisible(false)}>Contact</Link> },
    { label: "How to Schedule", template: () => <Link to="/how-to-schedule" onClick={() => setSidebarVisible(false)}>How to Schedule</Link> },
  ];

  // Menu items when logged in
  const menuItemsUserMobile = [
    { label: "Home", template: () => <Link to="/" onClick={() => setSidebarVisible(false)}>Home</Link> },
    { label: "Your Packages", template: () => <Link to="/your-packages" onClick={() => setSidebarVisible(false)}>Your Packages</Link> },
    {
      label: "About",
      items: [
        { label: "Success Stories", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Success Stories</Link> },
        { label: "Sponsors", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Sponsors</Link> },
      ],
    },
    {
      label: "Services",
      items: [
        { label: "Group Instruction", template: () => <Link to="/group-instruction" onClick={() => setSidebarVisible(false)}>Group Instruction</Link> },
        { label: "Summer Camp", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Summer Camp</Link> },
        { label: "Team Workouts", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Team Workouts</Link> },
        { label: "Birthday Parties", template: () => <Link to="#" onClick={() => setSidebarVisible(false)}>Birthday Parties</Link> },
      ],
    },
    { label: "Weekly Schedule", template: () => <Link to="/weekly-schedule" onClick={() => setSidebarVisible(false)}>Weekly Schedule</Link> },
    { label: "Online Shooting Course", template: () => <Link to="/online-shooting-course" onClick={() => setSidebarVisible(false)}>Online Shooting Course</Link> },
    { label: "Contact", template: () => <Link to="/contact" onClick={() => setSidebarVisible(false)}>Contact</Link> },
    { label: "How to Schedule", template: () => <Link to="/how-to-schedule" onClick={() => setSidebarVisible(false)}>How to Schedule</Link> },
    { 
      label: "Profile", 
      template: () => <Link to="/profile" onClick={() => setSidebarVisible(false)}>Profile</Link> 
    },
    { 
      label: "Your Players", 
      template: () => <Link to="/your-players" onClick={() => setSidebarVisible(false)}>Your Players</Link> 
    },
    {
      label: "Payments & Billings",
      items: [
        { 
          label: "Saved Payment Method", 
          template: () => <Link to="/saved-payment-method" onClick={() => setSidebarVisible(false)}>Saved Payment Method</Link> 
        },
        { 
          label: "Payment History", 
          template: () => <Link to="/payment-history" onClick={() => setSidebarVisible(false)}>Payment History</Link> 
        },
      ],
    },
    { 
      label: "View All Sessions", 
      template: () => <Link to="/view-all-sessions" onClick={() => setSidebarVisible(false)}>View All Sessions</Link> 
    },
    { 
      label: "My Packages & Plans", 
      template: () => <Link to="/my-package-plans" onClick={() => setSidebarVisible(false)}>My Packages & Plans</Link> 
    },
    { 
      label: "Change Password", 
      template: () => <Link to="/change-password" onClick={() => setSidebarVisible(false)}>Change Password</Link> 
    },
    { 
        label: "Log Out", 
        // Use a functional template for the Logout button
        template: () => (
            <button 
                
                className="p-link" 
                style={{ color: '#F68E1B', fontWeight: 'bold' }}
            >
                Log Out
            </button>
        )
    },
  ];

  // Logo
  const start = (
    <Link to="/" onClick={() => setSidebarVisible(false)}>
      <img src={CompanyLogo} alt="Logo" className="navbar-logo" />
    </Link>
  );

  // Right side (login button or icons + hamburger)
  const mobileEnd = !user ? (
       <div className="navbar-icons">
          <button
            className="nav-icon hamburger-icon"
            onClick={() => setSidebarVisible(true)}
          >
            <HamburgerIcon />
          </button>
       </div>
  ) : (
    <div className="navbar-icons">
      <CartIcon className="nav-icon" />
      <Link to="/profile" className="nav-icon" onClick={() => setSidebarVisible(false)}>
        <UserIcon className="nav-icon" />
      </Link>
      <button
        className="nav-icon hamburger-icon"
        onClick={() => setSidebarVisible(true)}
      >
        <HamburgerIcon />
      </button>
    </div>
  );

  // Right side (login button or icons + hamburger)
  const deskEnd = !user ? (
       <div className="navbar-icons">
        <Link to="/login" className="register-login-btn" onClick={() => setSidebarVisible(false)}>
          Sign Up / Login
        </Link>
       </div>
  ) : (
    <div className="navbar-icons">
      <CartIcon className="nav-icon" />
      <Link to="/profile" className="nav-icon" onClick={() => setSidebarVisible(false)}>
        <UserIcon className="nav-icon" />
      </Link>
    </div>
  );

  return (
    <nav className="section-full-w-row navbar-container">

      <div className="section-boxed-w-row">
        {/* Desktop Navbar */}
          <div className="desktop-navbar">
              <Menubar
                model={user ? menuItemsUserDesktop : menuItemsGuestDesktop}
                start={start}
                end={deskEnd}
                className={user ? "login-menubar" : "not-login-menubar"}
              />
          </div>

         <div className="mobile-header-bar">
          {start}
          {mobileEnd} 
        </div>

         
         <Sidebar
           visible={sidebarVisible}
           position="right"
           onHide={() => setSidebarVisible(false)}
           className="mobile-sidebar"
         >
           <div className="mobile-sidebar-header">
              {start}
              <button className="close-btn" onClick={() => setSidebarVisible(false)}>✕</button>
           </div>

           <Menubar
              model={user ? menuItemsUserMobile : menuItemsGuestMobile}
              className={user ? "login-menubar" : "not-login-menubar"}
           />
         </Sidebar>

      </div>
      
    </nav>
  );
};

export default NavbarCustom;




