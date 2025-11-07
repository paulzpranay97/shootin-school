import React, { useState, useEffect } from "react";
import home_background1 from '../../Assets/Images/home_background1.jpg';
import home_background2 from '../../Assets/Images/home_background2.jpg';
import Group_Instructions_image from '../../Assets/Images/StaticImages/GroupInstructionHero.webp';
import Description_image from '../../Assets/Images/StaticImages/description.webp';
import "./groupinstruction.css";
import StaticPageHeaders from "../../Components/StaticPageHeaders";
import HeroSectionCom from "../../Components/InstructionsCom/HeroSectionCom";
import DescriptionSectionCom from "../../Components/InstructionsCom/DescriptionSectionCom";
import UnlimitedBannerCom from "../../Components/InstructionsCom/UnlimitedBannerCom";
import { useNavigate } from "react-router-dom";


const GroupInstruction = () => {
  const navigate = useNavigate();
  const descriptionPoints = [
  "8:1 Player to Instructor ratio",
  "Players grouped manually based on skill level and age group",
  "Flexible Schedule: Use sessions as you see fit (1 per week, multiple per week, skip a week)",
  "Multiple gym locations (North & South Shore of Staten Island)",
  "Sessions expire in 2 years",
  "6-hour cancellation policy (1 session is deducted from your account if you cancel within 6 hours of your scheduled session)",
  "All sessions are non-transferable",
];
 
  return (
    <>
      <StaticPageHeaders title="Group Instructions"/>
      <HeroSectionCom
        title="Group Instructions"
        image={Group_Instructions_image}
        description={descriptionPoints}
        buttonLink="/contact-us"
      />
      <UnlimitedBannerCom/>
      <DescriptionSectionCom
        title="Description"
        image={Description_image}
        description={descriptionPoints}
      />

      {/* <div className="section-full-w-row">
        <div className="section-boxed-w-row ">
        </div>
      </div> */}
    </>
  );
};
export default GroupInstruction;
