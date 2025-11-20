import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "./index.css";

const Player = () => {
  const [showStats, setShowStats] = useState(false);
    const packageData = [
      {
        orderId: "ORD-1001",
        packageName: "Gold Tier",
        credits: 20,
        nextBill: "2025-03-11",
        status: "Active",
        subscription: "Monthly"
      },
      {
        orderId: "ORD-1002",
        packageName: "Silver Tier",
        credits: 10,
        nextBill: "2025-04-02",
        status: "Expired",
        subscription: "Monthly"
      },
      {
        orderId: "ORD-1003",
        packageName: "Platinum Tier",
        credits: 50,
        nextBill: "2025-02-28",
        status: "Active",
        subscription: "Yearly"
      },
      {
        orderId: "ORD-1004",
        packageName: "Starter Pack",
        credits: 5,
        nextBill: "2025-03-15",
        status: "Cancelled",
        subscription: "Monthly"
      },
      {
        orderId: "ORD-1005",
        packageName: "Diamond Elite",
        credits: 75,
        nextBill: "2025-05-01",
        status: "Active",
        subscription: "Yearly"
      }
    ];


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

     {packageData.length > 0 ? (
  packageData.map((item, index) => (
    <div className="table-row" key={index}>
      <span data-label="Order ID">{item.orderId}</span>
      <span data-label="Subscribed Package">{item.packageName}</span>
      <span data-label="Credits Remaining">{item.credits}</span>
      <span data-label="Next Bill (YYYY-MM-DD)">{item.nextBill}</span>
      <span data-label="Package Status">{item.status}</span>
      <span data-label="Subscription">{item.subscription}</span>
    </div>
  ))
) : (
  <div className="no-package">No Packages Available</div>
)}

      </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
