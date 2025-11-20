import { useState } from "react";
import "./modal.css";
import { usePlayerAccount } from "../../APIContext/PlayerAccountContext";
import { Calendar } from "primereact/calendar";

const jerseySizes = [
  { label: "Small", value: "S" },
  { label: "Medium", value: "M" },
  { label: "Large", value: "L" },
  { label: "Extra Large", value: "XL" },
  { label: "Youth Small", value: "YS" },
  { label: "Youth Medium", value: "YM" },
  { label: "Youth Large", value: "YL" },
];

const EditPlayerProfileModal = ({ onClose, player }) => {

  const { editPlayer } = usePlayerAccount();

  const [formData, setFormData] = useState({
    id: player?.id || null,
    name: player?.name || "",
    last_name: player?.last_name || "",
    date_of_birth: player?.date_of_birth || "",
    grade: player?.grade || 0,
    age: player?.age || "",  
    jersey_size: player?.jersey_size || "",
    school_name: player?.school_name || "",
    profile_picture: player?.profile_picture || "",
  });

 const handleDateChange = (e) => {
  const dob = e.value;
  if (!dob) return;

  const today = new Date();
  const age =
    today.getFullYear() -
    dob.getFullYear() -
    (today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ? 1
      : 0);

  const formattedDOB = dob.toISOString().split("T")[0]; // YYYY-MM-DD

  setFormData((prev) => ({
    ...prev,
    date_of_birth: formattedDOB,
    age: age.toString(),
  }));
};


  // Handle text input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profile_picture: e.target.files[0],
    });
  };

 const handleSubmit = async () => {
    const fd = new FormData();
    
    fd.append("name", formData.name);
    fd.append("date_of_birth", formData.date_of_birth);
    fd.append("age", formData.age);
    fd.append("grade", formData.grade);
    fd.append("jersey_size", formData.jersey_size);
    fd.append("school_name", formData.school_name);
    if (formData.profile_picture instanceof File) {
      fd.append("profile_picture", formData.profile_picture);
    }
    await editPlayer(formData.id, fd);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <h3>Edit Player Profile Details</h3>
        </div>

        <div className="modal-content">

          <div className="modal-row profile-pic-row">
              <label>Profile Picture</label>

              <div className="profile-pic-wrapper" onClick={() => document.getElementById("profilePicInput").click()}>
                {formData.profile_picture ? (
                  <img 
                    src={
                      formData.profile_picture instanceof File
                        ? URL.createObjectURL(formData.profile_picture)
                        : formData.profile_picture   // already URL from backend
                    }
                    className="profile-pic-preview"
                    alt="preview"
                  />
                ) : (
                  <div className="camera-icon">📷</div>
                )}
              </div>

              <input 
                type="file"
                id="profilePicInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
          </div>

          <div className="modal-row">
            <label>Name</label>
            <input 
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="modal-row">
            <label>Date of Birth (MM-DD-YYYY)</label>
                  <Calendar
                    placeholder="Date of Birth"
                    value={formData.date_of_birth ? new Date(formData.date_of_birth) : null}
                    onChange={handleDateChange}
                    showIcon
                    dateFormat="mm-dd-yy"
                    className="calesndr-cstm"
                  />
          </div>

          <div className="modal-row">
            <label>Age</label>
            <input 
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="modal-row">
            <label>Grade</label>
            <input 
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            />
          </div>

          <div className="modal-row">
            <label>Jersey Size</label>
            <select
              name="jersey_size"
              value={formData.jersey_size}
              onChange={handleChange}
              className="select-input"
            >
              <option value="">Select Jersey Size</option>
              {jerseySizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-row">
            <label>School Name</label>
            <input 
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
            />
          </div>

          

        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleSubmit} className="save-btn">Save</button>
        </div>

      </div>
    </div>
  );
};

export default EditPlayerProfileModal;
