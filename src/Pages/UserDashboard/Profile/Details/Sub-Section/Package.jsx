const Package = () => {
  
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