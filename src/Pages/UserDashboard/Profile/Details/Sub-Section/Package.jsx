import { useEffect, useState } from "react";
import "./index.css";
import { useParent } from "../../../../../APIContext/ParentContext";
import Swal from "sweetalert2";

const Package = () => {

  const { fetchParentPackages } = useParent();
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchParentPackages();
      if (result.success) {
        setPackageData(result.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch packages.",
        });
      }
    };

    fetchData();
  }, [fetchParentPackages]);


  

  

  return (
    <div className="profile-detail-container">

      <div className="player-header">
        <h2>Packages Details</h2>
        <button className="add-player-btn">Add New Card</button>
      </div>
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

  )
}

export default Package;