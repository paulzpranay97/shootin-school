import "./packages.css";

import groupImg from "../../../Assets/Images/home/p-1.webp";
import indivImg from "../../../Assets/Images/home/p-2.webp";
import teamImg from "../../../Assets/Images/home/p-3.webp";
import unlimitedImg from "../../../Assets/Images/home/p-3.webp";
import { useInstructions } from "../../../APIContext/InstructionsContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const { packages, fetchGroupInstructions } = useInstructions()
  const navigate = useNavigate();

  // console.log(fetchGroupInstructions)
  useEffect(() => {
    fetchGroupInstructions()
  }, [])

  const descriptions = {
    "GROUP INSTRUCTION": "When you purchase a package of Group Instruction Sessions you will be grouped by age. The session will be lead by one of Shootin' School's Head Instructors. These sessions are built to give players a workout at the appropriate age and skill level while also adding some competitive drills to the session.",
    "INDIVIDUAL INSTRUCTION": "When you purchase a package of Individual Instruction Sessions you are guaranteed to receive 1 on 1 instruction. This means that 1 trainer will be assigned to only 1 player.",
    "TEAM INSTRUCTION": "Test when you purchase a package of Group Instruction Sessions you are subject to be in a group with 3 other players that are on your skill level or in your age group. The maximum amount of people in a group is 4 players and 1 instructor.",
    "UNLIMITED INSTRUCTION": "You can purchase Unlimited Group Instruction. You have access to our instruction every day that we train for 1 hour. The Unlimited Plan is a 4 month agreement. This means that you must participate in the plan for 4 consecutive months."

  }

  return (
    <section className="packages-section">
      <div className="container">
        <h2 className="packages-title">OUR MOST POPULAR PACKAGES</h2>

        <div className="packages-grid">

          {packages.map((item) =>
            <div key={item.id} className="package-card">
              <div style={{minHeight: "205px"}} >
                <h3 >{item.name}</h3>
                <p>
                  {descriptions[item.name]}
                </p>
              </div>
              <button onClick={()=> navigate(`/packages/${item.id}`)} >Select Package</button>
              <div className="package-img">
                <img src={item.image} alt="Group Instruction" />
              </div>
            </div>
          )
          }

          {/* <div className="package-card">
            <h3>INDIVIDUAL INSTRUCTION</h3>
            <p>
              When you purchase a package of Individual Instruction Sessions you are guaranteed to receive 1 on 1 instruction. This means that 1 trainer will be assigned to only 1 player.
            </p>
            <button>Select Package</button>
            <div className="package-img">
              <img src={indivImg} alt="Group Instruction" />
            </div>
          </div>

          <div className="package-card">
            <h3>TEAM INSTRUCTION</h3>
            <p>
              Test when you purchase a package of Group Instruction Sessions you are subject to be in a group with 3 other players that are on your skill level or in your age group. The maximum amount of people in a group is 4 players and 1 instructor.
            </p>
            <button>Select Package</button>
            <div className="package-img">
              <img src={teamImg} alt="Group Instruction" />
            </div>
          </div>

          <div className="package-card">
            <h3>UNLIMITED INSTRUCTION</h3>
            <p>
              You can purchase Unlimited Group Instruction. You have access to our instruction every day that we train for 1 hour. The Unlimited Plan is a 4 month agreement. This means that you must participate in the plan for 4 consecutive months.
            </p>
            <button>Select Package</button>
            <div className="package-img">
              <img src={unlimitedImg} alt="Group Instruction" />
            </div>
          </div> */}



        </div>
      </div>


    </section>
  );
};

export default Packages;
