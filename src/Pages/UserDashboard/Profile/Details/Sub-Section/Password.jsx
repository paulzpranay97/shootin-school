import { useState } from "react";
import "./index.css";
import { useParent } from "../../../../../APIContext/ParentContext";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react"; // Install: npm i lucide-react

const Password = () => {
  const { changePasswordParentProfile } = useParent();

  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Show/hide password states
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    if (!data.old_password || !data.new_password || !data.confirm_password) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "All fields are required.",
      });
      return;
    }

    if (data.new_password !== data.confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "New password and confirm password do not match.",
      });
      return;
    }

    try {
      await changePasswordParentProfile(data);
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to change password. Please try again.",
      });
    }
  };

  return (
    <div className="profile-detail-container">
      <div className="player-header">
        <h2>Change Your Password</h2>
      </div>

      <div className="password-form">

        {/* OLD PASSWORD */}
        <div className="form-group password-wrapper">
          <label>Current Password</label>
          <input
            type={show.old ? "text" : "password"}
            name="old_password"
            value={data.old_password}
            onChange={handleInput}
          />
          <span
            className="toggle-icon"
            onClick={() => setShow({ ...show, old: !show.old })}
          >
            {show.old ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* NEW PASSWORD */}
        <div className="form-group password-wrapper">
          <label>New Password</label>
          <input
            type={show.new ? "text" : "password"}
            name="new_password"
            value={data.new_password}
            onChange={handleInput}
          />
          <span
            className="toggle-icon"
            onClick={() => setShow({ ...show, new: !show.new })}
          >
            {show.new ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {/* CONFIRM NEW PASSWORD */}
        <div className="form-group password-wrapper">
          <label>Confirm New Password</label>
          <input
            type={show.confirm ? "text" : "password"}
            name="confirm_password"
            value={data.confirm_password}
            onChange={handleInput}
          />
          <span
            className="toggle-icon"
            onClick={() => setShow({ ...show, confirm: !show.confirm })}
          >
            {show.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button className="update-btn" onClick={handleChangePassword}>
          Update New Password
        </button>
      </div>
    </div>
  );
};

export default Password;
