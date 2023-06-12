import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  const location = localStorage.getItem("location")
  return (
    <div>
      <div className="bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold text-lg mt-6">
        <p>Payment is Successfully</p>
      </div>
      <div className="flex flex-col justify-center items-center">
      <Link to={`/menu/${location}`}>
        <button className="w-full max-w-[150px] m-auto  bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer text-white text-center p-2 rounded mt-4">
          Continue Shopping
        </button>
      </Link>
      </div>
    </div>
  );
};

export default Success;
