import PropTypes from "prop-types";
import React, { useState } from "react";
import "./App.css";

const glassesData = [
  { id: 1, name: "Cool Glasses 1", price: 29.99 },
  { id: 2, name: "Cool Glasses 2", price: 39.99 },
  // Add more sample glasses as needed
];

const OrderTable = ({ orders }) => {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer Name</th>
          <th>Delivery Type</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customerName}</td>
            <td>{order.deliveryType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

OrderTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      customerName: PropTypes.string.isRequired,
      deliveryType: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const Tabs = ({ selectedTab, onTabClick }) => {
  return (
    <div className="tabs">
      <button
        className={selectedTab === "all" ? "active" : ""}
        onClick={() => onTabClick("all")}
      >
        All Orders
      </button>
      <button
        className={selectedTab === "regular" ? "active" : ""}
        onClick={() => onTabClick("regular")}
      >
        Regular Delivery
      </button>
      <button
        className={selectedTab === "express" ? "active" : ""}
        onClick={() => onTabClick("express")}
      >
        Express Delivery
      </button>
    </div>
  );
};

Tabs.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const GlassesSelection = ({ glasses }) => {
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleGlassesSelect = (glasses) => {
    setSelectedGlasses(glasses);
    setPopupOpen(true);
  };

  const handleOptionSelect = () => {
    if (selectedGlasses && customerName.trim() !== "" && deliveryType !== "") {
      const order = {
        id: Date.now(),
        customerName: customerName.trim(),
        deliveryType: deliveryType,
      };
      setOrders([...orders, order]);
      setCustomerName("");
      setDeliveryType("");
      setPopupOpen(false);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  let filteredOrders = orders;
  if (selectedTab !== "all") {
    filteredOrders = orders.filter(
      (order) => order.deliveryType.toLowerCase() === selectedTab
    );
  }

  return (
    <div className="glasses-selection">
      <h2>Select Glasses</h2>
      <ul className="glasses-list">
        {glasses.map((glasses) => (
          <li key={glasses.id}>
            <button
              className="glasses-button"
              onClick={() => handleGlassesSelect(glasses)}
            >
              {glasses.name}
            </button>
          </li>
        ))}
      </ul>
      <Modal isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
        <h3>Selected Glasses: {selectedGlasses ? selectedGlasses.name : ""}</h3>
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
      </Modal>
      <Tabs selectedTab={selectedTab} onTabClick={handleTabClick} />
      <OrderTable orders={filteredOrders} />
    </div>
  );
};

GlassesSelection.propTypes = {
  glasses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const App = () => {
  return (
    <div className="App">
      <GlassesSelection glasses={glassesData} />
    </div>
  );
};

export default App;
