import React, { useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

const SalesBracket = ({ sales, totalSales, title }) => {
  const [openBracket, setOpenBracket] = useState(false);

  return (
    <div className="m-auto w-full max-w-[95%] md:max-w-[80%] shadow flex flex-col p-3 bg-white/70 my-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpenBracket((prev) => !prev)}
      >
        <h2 className="font-bold text-lg">{title}</h2>
        {openBracket ? (
          <BsArrowUpShort size="25px" className="text-[rgb(233,142,30)]" />
        ) : (
          <BsArrowDownShort size="25px" className="text-[rgb(233,142,30)]" />
        )}
      </div>
      {openBracket && (
        <div>
          <div className="m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-200/70">
            {sales.length <= 0 ? (
              <div className="flex flex-col items-center justify-center">
                <h2>No sales recorded</h2>
              </div>
            ) : (
              sales.map((elem) => {
                return (
                  <div
                    key={elem._id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex">
                      <h3 className="font-bold">Customer Name:</h3>
                      <h3 className="ml-2">
                        {elem?.user?.firstName
                          ? elem?.user?.firstName + " " + elem?.user?.lastName
                          : elem?.guest?.firstName +
                            " " +
                            elem?.guest?.lastName}
                      </h3>
                    </div>
                    <div>
                      <h3 className="font-bold">Amount:</h3>
                      <div className="flex flex-row">
                        <h3 className="text-green-500 font-black ">₦</h3>
                        <h3 className=" ">{elem.amount}</h3>
                      </div>
                    </div>
                    <div className="my-2 flex flex-col justify-between items-center">
                      <h3 className="font-bold text-black ">Order Date:</h3>
                      <h3 className="ml-2">
                        {new Date(elem.createdAt.split("T")[0]).toDateString()}
                      </h3>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="m-auto w-full mt-4 shadow flex justify-between items-center p-3 bg-slate-200/70">
            <div>
              <h3 className="font-bold">Total:</h3>
            </div>
            <div className="flex flex-row">
              <h3 className="text-green-500 font-black ">₦</h3>
              <h3 className=" ">{totalSales}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesBracket;
