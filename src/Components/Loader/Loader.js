import React, { useEffect, useState } from "react";
import Logo from "../../Assets/Images/company_logo.png"
import "./loader.css";

const Loader = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";
    
    setTimeout(() => setVisible(true), 10);

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
    };
  }, []);

  return (
    <div className={`global-loader app-global-loader-cstm ${visible ? "visible" : ""}`}>
      <div className="spinner"></div>
     <img src={Logo} alt="Company Logo" className="loader-logo" />
    </div>
  );
};

export default Loader;
