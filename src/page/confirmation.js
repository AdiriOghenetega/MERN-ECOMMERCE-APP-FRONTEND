import React, { useState } from "react";
import { GiHamburger } from "react-icons/gi";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCartData } from "../redux/productSlice";


const Confirmation = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  let search = window.location.search;
  let params = new URLSearchParams(search);
  let txReference = params.get("trxref");

  console.log(txReference);

  const handleVerifyTransaction = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/verifypayment?reference=${txReference}`
      );
      const data = await res.json();

      if (data) {
        const updateOrders = await fetch(
          `${process.env.REACT_APP_BASE_URL}/updatepaymentstatus?transactionReference=${data.data.reference}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ paymentStatus: data.data.status }),
          }
        );
        const res = await updateOrders.json();

        if (res) {
          setLoading(false);
          res.message && toast(res.message);
          dispatch(setCartData([]));
          navigate("/success");
        }
      } else {
        toast("Network Error,Try again");
      }
    } catch (error) {
      console.log(error);
      toast("Network Error , Reload Page And Try Again")
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-14em)]">
      <div className="m-auto flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center my-4">
      <h3 className="font-bold">Transaction reference : </h3>
      <h3 className="font-medium text-slate-700">{txReference}</h3>
        </div>
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) : (
          <button
            className={`bg-[rgb(233,142,30)] hover:bg-orange-600 text-white text-lg font-medium py-2 px-6 rounded my-2 drop-shadow`}
            onClick={handleVerifyTransaction}
          >
            paid
          </button>
        )}
        <h3 className="font-medium">Click "paid" button to confirm payment</h3>
      </div>
    </div>
  );
};

export default Confirmation;
