import PropTypes from "prop-types";
import React, { useState } from "react";

const GlassesSelection = ({ glasses, onPurchase }) => {
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [deliveryType, setDeliveryType] = useState("");

  const handleGlassesSelect = (selected) => {
    setSelectedGlasses(selected);
    setPopupOpen(true);
  };

  const handleOptionSelect = () => {
    if (selectedGlasses && customerName && deliveryType) {
      const order = {
        id: Date.now(),
        customerName,
        deliveryType,
      };
      onPurchase(order);
      setCustomerName("");
      setDeliveryType("");
      setPopupOpen(false);
    }
  };

  return (
    <div className="glasses-selection">
      <h2>Select Glasses</h2>
      <div className="glasses-container">
        {glasses.map((glasses) => (
          <div className="glasses-card" key={glasses.id}>
            <img
              className="glasses-image"
              src={glasses.image}
              alt={glasses.name}
            />
            <h3 className="glasses-name">{glasses.name}</h3>
            <button
              className="glasses-button"
              onClick={() => handleGlassesSelect(glasses)}
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setPopupOpen(false)}>
              &times;
            </span>
            <h3>
              Selected Glasses: {selectedGlasses ? selectedGlasses.name : ""}
            </h3>
            <div className="customer-name">
              <label htmlFor="nameInput">Customer Name:</label>
              <input
                type="text"
                id="nameInput"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="shipment-options">
              <label htmlFor="deliveryType">Delivery Type:</label>
              <select
                id="deliveryType"
                value={deliveryType}
                onChange={(e) => setDeliveryType(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="regular">Regular Delivery</option>
                <option value="express">Express Delivery</option>
              </select>
              <button onClick={handleOptionSelect}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

GlassesSelection.propTypes = {
  glasses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onPurchase: PropTypes.func.isRequired,
};

export default GlassesSelection;
