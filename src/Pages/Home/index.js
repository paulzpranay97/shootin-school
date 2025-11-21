import React, { useState, useEffect } from "react";
import home_background1 from '../../Assets/Images/home/banner.png';
import "./home.css";
import OurServices from "../../Components/Home/OurServices/OurServices";
import MissionStatement from "../../Components/Home/MissionStatement/MissionStatement";
import UpcomingEvents from "../../Components/Home/UpcomingEvents/UpcomingEvents";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import Packages from "../../Components/Home/Packages/Packages";
import Instructors from "../../Components/Home/Instructors/Instructors";
import Gallery from "../../Components/Home/Gallery/Gallery";
import Sponsors from "../../Components/Home/Sponsers/Sponsers";
import { InstructionsContextProvider } from "../../APIContext/InstructionsContext";

const Home = () => {
  const navigate = useNavigate();
  const images = [
    home_background1
    
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);
  return (
    <>

    <div className="banner-section"  style={{ backgroundImage: `url(${images[index]})` }}>
      <div className="section-full-w-row">
         <div className="section-boxed-w-row">
          <div className="home-container">
            <div className="banner-content">
              <h2>STATEN ISLAND’S PREMIER</h2>
              <h1>BASKETBALL</h1>
              <span className="banner-intro">Instruction</span>
              <div className="custom-btn">
                <Link to="/">Book Your Session Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          <MissionStatement />
          <InstructionsContextProvider>
            <Packages />
          </InstructionsContextProvider>
          <UpcomingEvents />
          <Instructors />
          <Gallery />
          <Sponsors />
     
    </>
  );
};
export default Home;
