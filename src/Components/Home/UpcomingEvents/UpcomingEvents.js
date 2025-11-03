import EventOne from "../../../Assets/Images/events-one.png";
import EventTWO from "../../../Assets/Images/events-two.png";
import EventThree from "../../../Assets/Images/events-three.png";
import "./upcomingevents.css";

const UpcomingEvents = () => {
  return (
    <div className="ue-container">
      <h2>Upcoming Events</h2>
      <div className="ue-listing">
        <div className="ue-card-item">
          <img src={EventOne} alt="EventsImage" />
          <button>Register</button>
        </div>

        <div className="ue-card-item">
          <img src={EventTWO} alt="EventsImage" />
          <button>Register</button>
        </div>

        <div className="ue-card-item">
          <img src={EventThree} alt="EventsImage" />
          <button>Register</button>
        </div>

        <div className="ue-card-item">
          <img src={EventOne} alt="EventsImage" />
          <button>Register</button>
        </div>
      </div>
    </div>
  );
};
export default UpcomingEvents;
