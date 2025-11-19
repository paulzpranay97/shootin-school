import EventOne from "../../../Assets/Images/home/event-1.webp";
import EventTWO from "../../../Assets/Images/home/event-2.webp";
import EventThree from "../../../Assets/Images/home/event-3.webp";
import "./upcomingevents.css";

const UpcomingEvents = () => {
  return (
    <div className="upcomingEvent">
      <div className="container">
        <h2>Upcoming Events</h2>
        <div className="ue-listing">
          <div className="ue-card-item">
            <img src={EventOne} alt="EventsImage" />
          </div>

          <div className="ue-card-item">
            <img src={EventTWO} alt="EventsImage" />
          </div>

          <div className="ue-card-item">
            <img src={EventThree} alt="EventsImage" />
          </div>
        </div>
      </div>
    </div>
    
  );
};
export default UpcomingEvents;
