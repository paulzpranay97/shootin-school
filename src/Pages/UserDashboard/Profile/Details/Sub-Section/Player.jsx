import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "./index.css";

const Player = () => {
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="player-container">
      <div className="player-header">
        <h2>Your Player Details</h2>
        <button className="add-player-btn">Add a New Player</button>
      </div>

      <div className="player-card">
        <div className="player-card-header">
          <h3>Player 1 Details</h3>
          <button className="edit-btn">
            Edit Details <FaRegEdit style={{ fontSize: "18px", marginLeft: "4px" }} />
          </button>
        </div>

        <div className="player-info">
          <div className="player-image"></div>

          <div className="player-details">
            <div className="player-row">
              <div className="player-field">
                <p className="label">First Name</p>
                <span className="value">John</span>
              </div>
              <div className="player-field">
                <p className="label">Last Name</p>
                <span className="value">Doe</span>
              </div>
              <div className="player-field">
                <p className="label">Chosen Grade</p>
                <span className="value">2nd</span>
              </div>
            </div>

            <div className="player-row">
              <div className="player-field">
                <p className="label">Chosen Jersey Size</p>
                <span className="value">Young Medium</span>
              </div>
              <div className="player-field">
                <p className="label">School Name</p>
                <span className="value">School Name</span>
              </div>
              <div className="player-field">
                <p className="label">Date of Birth</p>
                <span className="value">School Name</span>
              </div>
            </div>
          </div>
        </div>

        <div className="player-footer">
          <button
            className="view-stats-btn"
            onClick={() => setShowStats(!showStats)}
          >
            {showStats ? "Hide Player Stats" : "View Player Stats"}
          </button>
        </div>

        {showStats && (
          <div className="player-stats-section">
            <hr className="divider" />
            <h4 className="section-title">Badges Earned</h4>
            <div className="badges-container">
              {[1, 2, 3, 4].map((b) => (
                <div key={b} className="badge-box"></div>
              ))}
            </div>

            <hr className="divider" />
            <h4 className="section-title">Packages Details</h4>

            <div className="package-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Subscribed Package</span>
                <span>Credits Remaining</span>
                <span>Next Bill (YYYY-MM-DD)</span>
                <span>Package Status</span>
                <span>Subscription</span>
              </div>

              <div className="no-package">No Packages Available</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
