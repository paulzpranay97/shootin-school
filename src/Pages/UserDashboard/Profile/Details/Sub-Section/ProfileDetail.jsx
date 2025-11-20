import { useEffect, useState } from "react";
import "./index.css";
import { FaRegEdit } from "react-icons/fa";
import { useParent } from "../../../../../APIContext/ParentContext";
import EditProfileModal from "../../../../../Components/EditProfileModal/EditProfileModal";
const ProfileDetail = () => {
  const { parentProfile, fetchCurrentParent } = useParent();

  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCurrentParent();
  }, [showModal]);

  useEffect(() => {
    if (parentProfile) {
      setData(parentProfile);
    }
  }, [parentProfile]);

  

  if (!data) return <p>Loading...</p>;
  return (
    <div className="profile-detail-container">
      <h2 className="profile-title">Your Profile Details</h2>
      <div className="profile-card">
        <div className="profile-card-header">
          <h3>Your Personal Information</h3>
          <button className="edit-btn" onClick={() => setShowModal(true)}>
            Edit Details <FaRegEdit style={{ fontSize: "20px", paddingBottom: "4px" }} />
          </button>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <p className="label">First Name</p>
            <span className="value">{data.user?.first_name || "N/A"}</span>
          </div>
          <div className="profile-field">
            <p className="label">Last Name</p>
            <span className="value">{data.user?.last_name || "N/A"}</span>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <p className="label">User Name</p>
            <span className="value">{data.user?.username || "N/A"}</span>
          </div>
          <div className="profile-field">
            <p className="label">Email Address</p>
            <span className="value">{data.user?.email || "N/A"}</span>
          </div>
        </div>

        <div className="profile-row">
          <div className="profile-field">
            <p className="label">Phone Number</p>
            <span className="value">{data?.phone || "N/A"}</span>
          </div>
          <div className="profile-field">
            <p className="label">Home Address</p>
            <span className="value">{data?.address || "N/A"}</span>
          </div>
        </div>

      </div>

      {showModal && (
        <EditProfileModal 
          data={data}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileDetail;
