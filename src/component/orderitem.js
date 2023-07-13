import React, { useState } from "react";
import OrderItemDetails from "./orderItemdetail";
import { numberWithCommas } from "../utility/helper";

export default function OrderItem({ elem }) {
  const [detailsModal, setDetailsModal] = useState(false);

  return (
    <div
      onClick={() => setDetailsModal((prev) => !prev)}
      className="relative w-full cursor-pointer"
    >
      {detailsModal && (
        <div className="absolute top-20 w-full min-w-full bg-transparent backdrop-blur-[2px] z-40 flex flex-col justify-start items-center ">
          <div className=" h-auto md:w-[70%] p-2 md:p-10">
            <OrderItemDetails elem={elem} />
          </div>
        </div>
      )}

      {elem && (
        <div className="w-full md:w-[70%] h-auto md:h-[250px] md:flex flex-row p-10 rounded my-[9px] justify-between items-center relative drop-shadow-lg  bg-[rgb(254,235,228)] rounded-xl ">
          <div className="relative w-full md:w-[50%] h-24 md:h-[200px] items-center md:justify-start justify-center flex">
            {elem.cart?.map((el, index) => {
              return (
                <div
                  key={el._id}
                  className={`absolute ml-[calc(${index}*20px)] `}
                >
                  <img
                    src={el.image}
                    className="h-[60px] w-[60px] md:h-[180px] md:w-[180px] rounded-full"
                    alt={el.name}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-center justify-between h-full ">
            <h3 className="font-bold text-black ">
              {new Date(elem.createdAt.split("T")[0]).toDateString()}
            </h3>
            <h3
              className={`font-bold ${
                elem.orderStatus === "delivered"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {elem.orderStatus}
            </h3>
            <div className="flex flex-row justify-center items-center bg-white rounded m-2 px-6 py-4">
              <div className="flex flex-row">
                <h3 className="text-green-500 font-black">₦</h3>
                <h3 className="font-bold text-black">
                  {numberWithCommas(elem.amount)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
