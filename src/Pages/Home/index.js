import React, { useState, useEffect } from "react";
import home_background1 from '../../Assets/Images/home_background1.jpg';
import home_background2 from '../../Assets/Images/home_background2.jpg';
import home_background3 from '../../Assets/Images/home_background3.jpg';
import "./home.css";
import OurServices from "../../Components/Home/OurServices/OurServices";
import MissionStatement from "../../Components/Home/MissionStatement/MissionStatement";
import UpcomingEvents from "../../Components/Home/UpcomingEvents/UpcomingEvents";
import Loader from "../../Components/Loader/Loader";

import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const images = [
    home_background1,home_background2,home_background3
    
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

    <div className="section-full-w-row">
      <div className="section-boxed-w-row ">
         <div className="home-container">
          <div className="home-banner" style={{ backgroundImage: `url(${images[index]})` }}>
            <div className="home-left-banner">
              <h1>
                Unlock Your True Potential with <span>Judgment-Free</span> Sports
              </h1>
              <p>
                From beginners to advanced players, we foster growth in a
                supportive, judgment-free environment.
              </p>
              <button onClick={() => navigate('/buy-packages')} >View All Packages</button>
            </div>
          </div>
          <OurServices />
          <MissionStatement />
          <UpcomingEvents />
        </div>
      </div>
    </div>

     
    </>
  );
};
export default Home;
