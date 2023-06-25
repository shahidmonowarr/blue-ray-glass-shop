import PropTypes from "prop-types";
import React from "react";

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

export default Tabs;
