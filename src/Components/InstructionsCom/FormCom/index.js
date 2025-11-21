import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import './form.css';
import AddPlayerProfileModal from '../../AddPlayerProfileModal/AddPlayerProfileModal';
import FlexComponent from '../../FlexComponent';
import { useParams } from 'react-router-dom'
import { usePlayerAccount } from '../../../APIContext/PlayerAccountContext';
import { useInstructions } from '../../../APIContext/InstructionsContext';

const FormCom = () => {

  const { packageCategories, fetchInstructionCategories, addToCart, fetchGroupInstructions, packages, loading } = useInstructions()
  const { fetchPlayers, players } = usePlayerAccount()
  const { packageId } = useParams();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [formData, setFormData] = useState({
    sessionType: '',
    playerName: '',
  });

  useEffect(() => {
    if (packageId) {
      fetchGroupInstructions()
      fetchInstructionCategories(packageId)
      fetchPlayers()
    }
  }, [packageId])

  useEffect(() => {
    fetchPlayers()
  }, [showModalAdd])

  console.log("formData", formData);

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const packageName = packages?.find((item) => item.id == packageId)?.name
  const selectedSession = packageCategories?.find(session => session.id === Number(formData.sessionType));
  const totalPrice = selectedSession ? selectedSession.price : '0.00';


  return (
    <>
      {<div className="form-wrapper">
        <div className="form-card">
          <div className="form-title">{capitalize(packageName)} Sessions</div>

          <div className="form-group">
            <FlexComponent  >
              <label className="label-bold">
                {capitalize(packageName)} Sessions *
              </label>
              <button className="add-player-btn" onClick={() => setShowModalAdd(true)}>Add a New Child</button>
            </FlexComponent>
            <select
              className="form-select"
              name="sessionType"
              value={formData.sessionType}  // use value instead of defaultValue for controlled component
              onChange={handleChange}
              style={{ marginTop: "1rem" }}
            >
              <option value="" disabled>Select a session package</option>
              {packageCategories?.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.name} - ${session.price}
                </option>
              ))}
            </select>
          </div>

          <div className="child-details-container">
            <div style={{ marginTop: "1rem" }}>
              <label className="label-bold">
                Player Name
              </label>
              <select
                className="form-select"
                name="playerName"
                value={formData.playerName}  // use value instead of defaultValue for controlled component
                onChange={handleChange}
              >
                <option value="" disabled>Select a player</option>
                {players?.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            {/*         
          <div className="radio-group-container">
            <label className="label-bold">Select Option</label>
            <div className="radio-options">
              <label className="radio-label">
                <input type="radio" name="childOption" value="create"
                  checked={formData.childOption === 'create'} onChange={handleChange} />
                <span className="radio-text">Create a Child</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="childOption" value="choose"
                  checked={formData.childOption === 'choose'} onChange={handleChange} />
                <span className="radio-text">Choose a Child</span>
              </label>
            </div>
          </div> */}

          </div>


          <div className="form-footer">
            <div className="total-row">
              <span className="total-label">TOTAL</span>
              <span className="total-amount">${totalPrice}</span>
            </div>
            <button onClick={() => {
              if (!formData.sessionType || !formData.playerName) return;
              const cartItem = {
                package_id: Number(formData.sessionType),   // convert to number
                player_id: Number(formData.playerName),   // convert to number
              };

              addToCart(cartItem);  // now sends exactly what you need
            }}
              className="add-cart-btn"
              disabled={!formData.sessionType || !formData.playerName}
            >
              Add to Cart
            </button>
          </div>

        </div>
        {showModalAdd && (
          <AddPlayerProfileModal
            onClose={() => setShowModalAdd(false)}
          />
        )}
      </div>}
    </>
  );
};

export default FormCom;