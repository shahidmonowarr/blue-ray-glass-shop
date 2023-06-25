import React, { useState } from "react";
import "./App.css";
import GlassesSelection from "./components/GlassesSelection";
import OrderTable from "./components/OrderTable";
import Tabs from "./components/Tabs";

const App = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [orders, setOrders] = useState([]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handlePurchase = (order) => {
    setOrders([...orders, order]);
  };

  const filteredOrders =
    selectedTab === "all"
      ? orders
      : orders.filter((order) => order.deliveryType === selectedTab);

  return (
    <div className="App">
      <div className="container">
        {selectedTab === "all" && (
          <GlassesSelection
            glasses={fakeGlassesData}
            onPurchase={handlePurchase}
          />
        )}
        <Tabs selectedTab={selectedTab} onTabClick={handleTabClick} />
        <OrderTable orders={filteredOrders} />
      </div>
    </div>
  );
};

const fakeGlassesData = [
  {
    id: 1,
    name: "Glasses A",
    image:
      "https://assets.lenscrafters.com/is/image/LensCrafters/8053672767872__001.png",
  },
  {
    id: 2,
    name: "Glasses B",
    image:
      "https://assets.glasses.com/is/image/Glasses/8056597827027__STD__shad__fr.png?impolicy=GL_parameters_transp&width=700",
  },
  {
    id: 3,
    name: "Glasses C",
    image:
      "https://assets.glasses.com/is/image/Glasses/8053672767940_000A.png?impolicy=SEO_16x9",
  },
  {
    id: 4,
    name: "Glasses D",
    image:
      "https://cdn.shopify.com/s/files/1/0262/7331/6945/products/GV0145_807_P02.jpg?v=1656999563",
  },
];

export default App;
