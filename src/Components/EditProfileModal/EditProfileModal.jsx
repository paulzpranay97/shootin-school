import { useState } from "react";
import "./modal.css";
import { useParent } from "../../APIContext/ParentContext";

const EditProfileModal = ({ data, onClose, onSave }) => {
  const { updateParentProfile } = useParent();
  const [formData, setFormData] = useState({
    user: {
      first_name: data?.user?.first_name || "",
      last_name: data?.user?.last_name || "",
      username: data?.user?.username || "",
      email: data?.user?.email || "",
    },
    phone: data?.phone || "",
    address: data?.address || "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["first_name", "last_name", "username", "email"].includes(name)) {
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };


  const handleSubmit = async () => {
    await updateParentProfile(formData);
    onClose();        // close modal
  };

  return (
    <div className="modal-overlay"  onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h3>Edit Profile Details</h3>
        </div>

        <div className="modal-content">
          <div className="modal-row">
            <label>First Name</label>
            <input name="first_name" value={formData.user.first_name} onChange={handleChange} />
          </div>

          <div className="modal-row">
            <label>Last Name</label>
            <input name="last_name" value={formData.user.last_name} onChange={handleChange} />
          </div>

          <div className="modal-row">
            <label>Email</label>
            <input name="email" value={formData.user.email} onChange={handleChange} readOnly className="readonly-input"/>
          </div>

          <div className="modal-row">
            <label>User Name</label>
            <input name="username" value={formData.user.username} onChange={handleChange} readOnly className="readonly-input"/>
          </div>

          <div className="modal-row">
            <label>Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="modal-row">
            <label>Home Address</label>
            <input name="address" value={formData.address} onChange={handleChange} />
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

export default EditProfileModal;
