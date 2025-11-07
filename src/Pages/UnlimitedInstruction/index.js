import React, { useState, useEffect } from "react";
import home_background1 from '../../Assets/Images/home_background1.jpg';
import home_background2 from '../../Assets/Images/home_background2.jpg';
import Unlimited_Instructions_image from '../../Assets/Images/StaticImages/unlimited_instruction.webp';
import Description_image from '../../Assets/Images/StaticImages/unlimited_description.webp';
import "./unlimitedinstruction.css";
import StaticPageHeaders from "../../Components/StaticPageHeaders";
import HeroSectionCom from "../../Components/InstructionsCom/HeroSectionCom";
import DescriptionSectionCom from "../../Components/InstructionsCom/DescriptionSectionCom";
import { useNavigate } from "react-router-dom";


const UnlimitedInstruction = () => {
  const navigate = useNavigate();
const descriptionPoints = [
  "Group Instruction",
  "Come in every day that we train for 1 hour (max) (4-5 times a week)",
  "Financially beneficial if you can get in the gym 2x a week",
  "Flexible Schedule: Come in any day that we train at any location available for 1 hour.",
  "Multiple gym locations (North & South Shore of Staten Island)",
  "Plan renews monthly on the date that you start. You may start at any time.",
  "6 hour cancellation policy (1 session is deducted from your account if you cancel within 6 hours of your scheduled session)",
  "All sessions are non-transferable"
];
 
  return (
    <>
      <StaticPageHeaders title="Unlimited Instructions"/>
      <HeroSectionCom
        title="Unlimited Instruction"
        image={Unlimited_Instructions_image}
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
export default UnlimitedInstruction;
