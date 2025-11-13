
import "./index.css";
import { FaRegEdit } from "react-icons/fa";
const ProfileDetail = () => {
  return (
    <div className="profile-detail-container">
      <h2 className="profile-title">Your Profile Details</h2>
      <div className="profile-card">
        <div className="profile-card-header">
          <h3>Your Personal Information</h3>
          <button className="edit-btn">Edit Details <FaRegEdit style={{fontSize:"20px",paddingBottom:"4px"}}/></button>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <p className="label">First Name</p>
            <span className="value">John</span>
          </div>
          <div className="profile-field">
            <p className="label">Last Name</p>
            <span className="value">Doe</span>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <p className="label">Email Address</p>
            <span className="value">johndoe@gmail.com</span>
          </div>
          <div className="profile-field">
            <p className="label">Phone Number</p>
            <span className="value">+1 444 444 4444</span>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field full-width">
            <p className="label">Home Address</p>
            <span className="value">johndoe@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
