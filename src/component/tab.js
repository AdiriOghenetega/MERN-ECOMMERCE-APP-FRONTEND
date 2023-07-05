import React, { useState } from "react";
import Orders from "../component/order";
import UploadProduct from "../component/uploadproduct";
import UserRole from "../component/userrole";
import DeleteProduct from "../component/deleteproduct";
import Banner from "../component/banner";
import UpdateProduct from "./updateproduct";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("first");

  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const tabs = [
    {
      label: "Change User Role",
      eventKey: "first",
    },
    {
      label: "Upload Products",
      eventKey: "second",
    },
    {
      label: "Update Products",
      eventKey: "sixth",
    },
    {
      label: "Delete Products",
      eventKey: "third",
    },
    {
      label: "Orders",
      eventKey: "fourth",
    },
    {
      label: "Upload Banner",
      eventKey: "fifth",
    },
  ];

  return (
    <div className="md:flex w-full">
      <div className="md:w-[25%] p-2 flex flex-col justify-start items-start border-2 mb-2">
        <h1 className="bg-[rgb(233,142,30)] text-xl text-white text-bold w-full p-4 flex flex-col justify-center items-center ">
          DASHBOARD
        </h1>
        {tabs.map((tab, index) => (
          <button
            onClick={() => handleTabChange(tab.eventKey)}
            key={index}
            className={`border-2 w-full flex flex-col justify-center items-center p-2 ${
              activeTab === tab.eventKey && "bg-[rgb(233,142,30)] text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="md:w-[75%] min-h-[calc(100vh-4em)] border-2 md:border-0 pt-2 md:pt-0">
        {activeTab === "first" && <UserRole />}
        {activeTab === "second" && <UploadProduct />}
        {activeTab === "third" && <DeleteProduct />}
        {activeTab === "fourth" && <Orders />}
        {activeTab === "fifth" && <Banner />}
        {activeTab === "sixth" && <UpdateProduct />}
      </div>
    </div>
  );
};

export default Tabs;
