import React from "react";
import "./ourservices.css";
import ImgB from "../../../Assets/Images/grou-img.png";
import IC from "../../../Assets/Images/IC.png";
import FD from "../../../Assets/Images/FD.png";
import SC from "../../../Assets/Images/SC.png";
import SP from "../../../Assets/Images/SP.png";
import ASP from "../../../Assets/Images/ASP.png";
import FP from "../../../Assets/Images/FP.png";
import ICSM from "../../../Assets/Images/IC-sm.png";
import FDSM from "../../../Assets/Images/FD-sm.png";
import SCSM from "../../../Assets/Images/SC-sm.png";
import SPSM from "../../../Assets/Images/SP-sm.png";
import ASPSM from "../../../Assets/Images/ASP-sm.png";
import FPSM from "../../../Assets/Images/FP-sm.png";
import CheckIcon from "../../../Assets/Icons/CheckIcon";
import { Link } from "react-router-dom";
import ArrowIcon from "../../../Assets/Icons/ArrowIcon";

const OurServices = () => {
  return (
    <div className="our-services-ui">
      <h2>Our Services</h2>
      <div className="services-list">
        <div className="service-cards">
          <Link className="sc sc1">
            <div className="sc-icon IC">
              <img src={IC} alt="icon" />
            </div>
          </Link>
          <Link className="sc sc2">
            <div className="sc-icon FD">
              <img src={FD} alt="icon" />
            </div>
          </Link>
          <Link className="sc sc3">
            <div className="sc-icon SC">
              <img src={SC} alt="icon" />
            </div>
          </Link>
          <Link className="sc sc4">
            <div className="sc-icon SP">
              <img src={SP} alt="icon" />
            </div>
          </Link>
          <Link className="sc sc5">
            <div className="sc-icon ASP">
              <img src={ASP} alt="icon" />
            </div>
          </Link>
          <Link className="sc sc6">
            <div className="sc-icon FP">
              <img src={FP} alt="icon" />
            </div>
          </Link>
          {/* <div className="b-img">
            <img src={ImgB} alt="background" />
          </div> */}
        </div>
        <div className="img-b-sm">
          <img src={ImgB} alt="background" />
        </div>
        <div className="offer-sec">
          <h2>WHAT WE OFFER</h2>
          <div className="offer-list">
            <ul>
              <li className="offer-items">
                <div className="offer-icon">
                  <CheckIcon />
                </div>
                <p>Quality Sports Services</p>
              </li>
              <li className="offer-items">
                <div className="offer-icon">
                  <CheckIcon />
                </div>
                <p>Multi Sports and Instruction</p>
              </li>
              <li className="offer-items">
                <div className="offer-icon">
                  <CheckIcon />
                </div>
                <p>Judgement Free</p>
              </li>
              <li className="offer-items">
                <div className="offer-icon">
                  <CheckIcon />
                </div>
                <p>DOE Vendor</p>
              </li>
              <li className="offer-items">
                <div className="offer-icon">
                  <CheckIcon />
                </div>
                <p>State of the Art Facilities</p>
              </li>
            </ul>
            <div className="offer-btn">
              <Link to="/events">See Upcoming Events</Link>
            </div>
          </div>
        </div>
        <div className="service-card-sm">
          <h2>OUR SPECIALITIES</h2>
          <div className="service-card-sm-list">
            <div className="service-card-sm-item">
              <div className="service-card-sm-IMG">
                <img src={ICSM} alt="IC" />
              </div>
              <p>Instructional Classes</p>
              <ArrowIcon />
            </div>
            <div className="service-card-sm-item">
              <div className="service-card-sm-IMG">
                <img src={FDSM} alt="IC" />
              </div>
              <p>Field days & Carnivals</p>
              <ArrowIcon />
            </div>
            <div className="service-card-sm-item">
              <div className="service-card-sm-IMG">
                <img src={SCSM} alt="IC" />
              </div>
              <p>Summer Camp</p>
              <ArrowIcon />
            </div>
            <div className="service-card-sm-item">
              <div className="service-card-sm-IMG">
                <img src={SPSM} alt="IC" />
              </div>
              <p>School Programs</p>
              <ArrowIcon />
            </div>
            <div className="service-card-sm-item">
              <div className="service-card-sm-IMG">
                <img src={ASPSM} alt="IC" />
              </div>
              <p>After School Programs</p>
              <ArrowIcon />
            </div>
            <div className="service-card-sm-item">
              <div className="service-card-sm-IMG">
                <img src={FPSM} alt="IC" />
              </div>
              <p>Fundraising Program</p>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurServices;
