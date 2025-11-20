import { useEffect,useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import "./index.css";
import { usePlayerAccount } from "../../../../../APIContext/PlayerAccountContext";
import AddPlayerProfileModal from "../../../../../Components/AddPlayerProfileModal/AddPlayerProfileModal";
import EditPlayerProfileModal from "../../../../../Components/EditPlayerProfileModal/EditPlayerProfileModal";
import Swal from "sweetalert2";


const Player = () => {
  const { players, fetchPlayers, fetchPlayersPackages, deletePlayer } = usePlayerAccount();
  const [showStats, setShowStats] = useState(false);
  const [data, setData] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({});
  const [packageData, setPackageData] = useState([]);

   useEffect(() => {
    fetchPlayers();
  }, [showModalAdd, showModalEdit]);

  useEffect(() => {
    if (players) {
      setData(players);
    }
  }, [players]);

  const handlePlayerStats = async (playerId) => {
    try{
      const data = await fetchPlayersPackages(playerId);
      if (data) {
        setPackageData(data);
      }

    }catch(err){
      setPackageData([]);
      alert("Error fetching player packages:", err);
    }

  }

  const handlePlayerDelete = async (playerId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f7931a",
        cancelButtonColor: "#494949 ",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
           await deletePlayer(playerId);

            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Player has been removed successfully.",
            //   icon: "success",
            // });

            // Optionally refresh your list
            // fetchPlayers();

          } catch (err) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
          }
        }
      });
  }

  function getLocalDate(utcDateTime) {
    const localDate = new Date(utcDateTime);
    return localDate.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  

   


  return (
    <div className="player-container">
      <div className="player-header">
        <h2>Your Player Details</h2>
        <button className="add-player-btn"  onClick={() => setShowModalAdd(true)}>Add a New Player</button>
      </div>

      {data && data.length === 0 && (
          <p className="not-found">No data found</p>
        )}

        {data && data.length > 0 && (
          data.map((player,index) => (
            <div className="player-card">
                <div className="player-card-header">
                  <h3>Player {index + 1} Details</h3>

                  <div className="player-card-actions">
                    <button className="edit-btn" key={player.id} 
                      onClick={() => {
                        setSelectedPlayer(player);   // store player data
                        setShowModalEdit(true);      // open modal
                      }}
                    >
                      Edit Details <FaRegEdit style={{ fontSize: "18px", marginLeft: "4px" }} />
                    </button>
                    <button className="edit-btn" key={player.id} 
                      onClick={() => {
                          
                        handlePlayerDelete(player.id);
                      }}
                    >
                      Delete Player <FaTrash style={{ fontSize: "18px", marginLeft: "4px" }} />
                    </button>
                  </div>
                  
                </div>

                <div className="player-info">
                  <div className="player-image">
                    <img src={player.profile_picture} alt="" />
                  </div>

                  <div className="player-details">
                    <div className="player-row">
                      <div className="player-field">
                        <p className="label">First Name</p>
                        <span className="value">{player.name}</span>
                      </div>
                      <div className="player-field">
                        <p className="label">Last Name</p>
                        <span className="value">{player.name}</span>
                      </div>
                      <div className="player-field">
                        <p className="label">Chosen Grade</p>
                        <span className="value">{player.grade}</span>
                      </div>
                    </div>

                    <div className="player-row">
                      <div className="player-field">
                        <p className="label">Chosen Jersey Size</p>
                        <span className="value">{player.jersey_size}</span>
                      </div>
                      <div className="player-field">
                        <p className="label">School Name</p>
                        <span className="value">{player.school_name}</span>
                      </div>
                      <div className="player-field">
                        <p className="label">Date of Birth</p>
                        <span className="value">{player.date_of_birth}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="player-footer">
                  <button
                    key={player.id}
                    className="view-stats-btn"
                    onClick={() => {
                      const newState = !showStats;   // compute the new state first
                      setShowStats(newState);

                      if (newState === true) {
                        handlePlayerStats(player.id); // call when showing stats
                      }
                    }}

                  >
                    {showStats ? "Hide Player Stats" : "View Player Stats"}
                  </button>
                </div>

                {showStats && (
                  <div className="player-stats-section">
                    <hr className="divider" />
                    {/* <h4 className="section-title">Badges Earned</h4>
                    <div className="badges-container">
                      {[1, 2, 3, 4].map((b) => (
                        <div key={b} className="badge-box"></div>
                      ))}
                    </div>

                    <hr className="divider" /> */}
                    <h4 className="section-title">Packages Details</h4>

                    <div className="package-table">
                      <div className="table-header">
                        <span>Package Name</span>
                        <span>Price</span>
                        <span>Remaining Sessions</span>
                        <span>Package Type</span>
                        <span>Date</span>
                        <span>Status</span>
                      </div>

                        {packageData.length > 0 ? (
                            packageData.map((item, index) => (
                              <div className="table-row" key={index}>
                                <span data-label="Order ID">{item.package?.name || ""}</span>
                                <span data-label="Subscribed Package">{item.package?.price || ""}</span>
                                <span data-label="Credits Remaining">{item?.remaining_sessions || ""}</span>
                                <span data-label="Next Bill (YYYY-MM-DD)">{item?.is_unlimited ? "Unlimited" : "Limited"}</span>
                                <span data-label="Package Status">{getLocalDate(item?.start_date) || ""}</span>
                                <span data-label="Subscription">{item?.status || ""}</span>
                              </div>
                            ))
                          ) : (
                            <div className="no-package">No Packages Available</div>
                          )}

                                </div>
                                    </div>
                                  )}
                                </div>
                        ))
                      )}

      

     
        {showModalAdd && (
          <AddPlayerProfileModal 
            onClose={() => setShowModalAdd(false)}
          />
        )}
        {showModalEdit && (
          <EditPlayerProfileModal 
            onClose={() => setShowModalEdit(false)}
            player={selectedPlayer}
          />
        )}
    </div>
  );
};

export default Player;
