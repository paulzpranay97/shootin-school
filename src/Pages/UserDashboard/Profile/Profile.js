import React, { useContext, useEffect, useRef, useState } from "react";
import { ParentContext } from "../../../APIContext/ParentContext";
import PenIcon from "../../../Assets/Icons/PenIcon";
import Avtar from "../../../Assets/Images/avtar.jpg";
import PageTitle from "../../../Components/Layout/UserDashLyout/PageTitle";
import { MEDIA_BASE_URL } from "../../../Config/Config";
import "./profile.css";

const Profile = () => {
  const { parentProfile, loading, updateParentProfile, fetchCurrentParent } = useContext(ParentContext);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
    },
    phone: "",
    address: "",
    is_self_pay: true,
    profile_picture: null,
  });

  const fileInputRef = useRef(null);

 useEffect(() => {
    fetchCurrentParent();
  }, []); 

  useEffect(() => {
    if (parentProfile) {
      setProfile(parentProfile);
      setFormData({
        user: {
          first_name: parentProfile.user?.first_name || "",
          last_name: parentProfile.user?.last_name || "",
          username: parentProfile.user?.username || "",
          email: parentProfile.user?.email || "",
        },
        phone: parentProfile.phone || "",
        address: parentProfile.address || "",
        is_self_pay: parentProfile.is_self_pay ?? true,
        profile_picture: null,
      });
    }
  }, [parentProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["first_name", "last_name"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_picture: file }));
      setProfile((prev) => ({
        ...prev,
        profile_picture: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    setIsDisabled(true)
    e.preventDefault();
    const data = new FormData();

    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("is_self_pay", formData.is_self_pay);

    data.append("user.first_name", formData.user.first_name);
    data.append("user.last_name", formData.user.last_name);

    if (formData.profile_picture) {
      data.append("profile_picture", formData.profile_picture);
    }

    const result = await updateParentProfile(data);
    if (result.success) {
      setIsDisabled(false)
      setEditMode(false);
      await fetchCurrentParent(); // refresh updated profile
    }
  };

  const handleToggleEdit = () => {
    if (editMode) {
      setFormData({
        user: {
          first_name: profile.user?.first_name || "",
          last_name: profile.user?.last_name || "",
          username: profile.user?.username || "",
          email: profile.user?.email || "",
        },
        phone: profile.phone || "",
        address: profile.address || "",
        is_self_pay: profile.is_self_pay ?? true,
        profile_picture: null,
      });
    }
    setEditMode(!editMode);
  };

  const handlePenClick = () => {
    if (editMode) {
      fileInputRef.current.click();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found.</div>;

  return (
    <>
      <PageTitle
        showDescription={false}
        showButton={true}
        buttonText={editMode ? "Cancel Editing" : "Edit Profile"}
        onButtonClick={handleToggleEdit}
        title="Profile"
      />

      <div className="profile-container">
        <div className="profile-ele">
          <div className="profile-image">
            <div className="img-container" onClick={handlePenClick}>
              <img
                src={
                  profile?.profile_picture
                    ? profile.profile_picture.startsWith("blob:")
                      ? profile.profile_picture
                      : `${MEDIA_BASE_URL}${profile.profile_picture}`
                    : Avtar
                }
                alt="Profile"
              />
              {editMode && (
                <span className="pen-icon-overlay">
                  <PenIcon />
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div className="profile-details">
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="first_name"
                  value={formData.user.first_name}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="last_name"
                  value={formData.user.last_name}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              <div className="form-group w-full input-w-text">
                <div className="form-input">
                  <label htmlFor="displayName">Display Name</label>
                  <input
                    type="text"
                    id="displayName"
                    name="username"
                    value={formData.user.username}
                    readOnly
                  />
                </div>
                <p>
                  This will be how your name will be displayed in the account
                  section and in reviews
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.user.email}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              <div className="form-group w-full">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  readOnly={!editMode}
                />
              </div>

              {editMode && (
                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-primary save-changes-btn" disabled={isDisabled}
                    style={
                      isDisabled
                        ? { cursor: "not-allowed", background: "rgb(0 0 0 / 78%)"}
                        : {}
                    }
                  >
                    {isDisabled ? "Saveing ..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
