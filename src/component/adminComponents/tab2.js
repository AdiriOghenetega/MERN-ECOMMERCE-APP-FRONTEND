import React, { useState } from "react";
import Orders from "./order";
import UpdateProducts from "./updateproduct";
import Sales from "./sales";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Tabs2 = ({ title, location }) => {
  const [activeTab, setActiveTab] = useState("first");
  const navigate = useNavigate();
  const handleTabChange = (eventKey) => {
    setActiveTab(eventKey);
  };

  const tabs = [
    {
      label: "Orders",
      eventKey: "first",
    },
    {
      label: "update Products",
      eventKey: "second",
    },
    {
      label: "Sales",
      eventKey: "third",
    },
  ];

  return (
    <div className="md:flex w-full">
      <div className="md:w-[25%] p-2 flex flex-col justify-start items-start border-2 mb-2">
        <div className="flex bg-[rgb(233,142,30)] w-full p-4">
          <BsArrowLeftSquareFill
            size="25px"
            className="text-white cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl text-white text-bold flex flex-col justify-center items-center ml-4 ">
            {title}
          </h1>
        </div>
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
        {activeTab === "first" && <Orders location={location} />}
        {activeTab === "second" && <UpdateProducts />}
        {activeTab === "third" && <Sales location={location} />}
      </div>
    </div>
  );
};

export default Tabs2;
