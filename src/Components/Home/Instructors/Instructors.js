import "./instructors.css";

import Instructor1 from "../../../Assets/Images/home/trainer-1.webp";
import Instructor2 from "../../../Assets/Images/home/trainer-2.webp";
import Instructor3 from "../../../Assets/Images/home/trainer-3.webp";

const Instructors = () => {
  return (
    <section className="instructors-section">
        <div className="container">
            <h2 className="instructors-title">OUR INSTRUCTORS</h2>

      <div className="instructors-grid">

        <div className="instructor-card">
          <img src={Instructor1} alt="Instructor" />
          <div className="instructor-name">
                <h3 className="inst-name">BASIM ERZOUKI</h3>
          <p className="inst-role">Head Instructor</p>
          </div>
          
        </div>

        <div className="instructor-card">
          <img src={Instructor2} alt="Instructor" />
          <div className="instructor-name">
            <h3 className="inst-name">FRANK BARBATO</h3>
          <p className="inst-role">Head Instructor</p>
          </div>
          
        </div>

        <div className="instructor-card">
          <img src={Instructor3} alt="Instructor" />
          <div className="instructor-name">
            <h3 className="inst-name">DAVE SHKOLNIK</h3>
          <p className="inst-role">Player Development Director / Head Trainer</p>
          </div>
          
        </div>

      </div>

      <button className="inst-view-btn">View All Instructors</button>
        </div>

      
    </section>
  );
};

export default Instructors;
