import React from "react";
import "./index.css"; 

const Password = () => {
  return (
    <div className="profile-detail-container">

      <div className="player-header">
        <h2>Change Your Password</h2>
      </div>

      <div className="password-form">

        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="" />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input type="password" placeholder="" />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" placeholder="" />
        </div>

        <button className="update-btn">
          Update New Password
        </button>

      </div>

    </div>
  );
};

export default Password;
