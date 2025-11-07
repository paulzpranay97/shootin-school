import React, { useState, useEffect } from "react";
import home_background1 from '../../Assets/Images/home_background1.jpg';
import home_background2 from '../../Assets/Images/home_background2.jpg';
import Individual_Instructions_image from '../../Assets/Images/StaticImages/individual_instruction.webp';
import Description_image from '../../Assets/Images/StaticImages/description.webp';
import "./individualinstruction.css";
import StaticPageHeaders from "../../Components/StaticPageHeaders";
import HeroSectionCom from "../../Components/InstructionsCom/HeroSectionCom";
import DescriptionSectionCom from "../../Components/InstructionsCom/DescriptionSectionCom";
import { useNavigate } from "react-router-dom";


const IndividualInstruction = () => {
  const navigate = useNavigate();
  const descriptionPoints = [
    "1 (one) player per 1 (one) Instructor",
    "Customized instruction based on specific player",
    "Maximize repetitions",
    "Flexible Schedule: Use sessions as you see fit (1 per week, multiple per week, skip a week)",
    "Multiple gym locations (North & South Shore of Staten Island)",
    "Sessions expire in 2 years",
    "6 hour cancellation policy (1 session is deducted from your account if you cancel within 6 hours of your scheduled session)",
    "All sessions are non-transferable"
  ];
 
  return (
    <>
      <StaticPageHeaders title="Individual Instructions"/>
      <HeroSectionCom
        title="Individual Instruction"
        image={Individual_Instructions_image}
        description={descriptionPoints}
        buttonLink="/contact-us"
      />
      <DescriptionSectionCom
        title="Description"
        image={Description_image}
        description={descriptionPoints}
      />

      
    </>
  );
};
export default IndividualInstruction;
