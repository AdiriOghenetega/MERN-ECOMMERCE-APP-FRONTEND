import React, { useState, useEffect } from "react";
import { GiHamburger } from "react-icons/gi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utility/helper";

const Orders = ({ location }) => {
  const [orderLoading, setOrderLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [displayOrder, setDisplayOrder] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  //fetch orders
  useEffect(() => {
    fetchOrders();
    setRefreshPage(false);
  }, [refreshPage]);

  const fetchOrders = async () => {
    try {
      setOrderLoading(true);
      const fetchOrders = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getorders`
      );
      const res = await fetchOrders.json();

      if (res) {
        let targetOrders = [];
        if (location) {
          targetOrders = res.data?.filter((elem) => elem.location === location);
          targetOrders && setDisplayOrder(targetOrders?.reverse());
        } else {
          res.data && setDisplayOrder(res.data?.reverse());
        }
        res.message && toast(res.message);
        setOrderLoading(false);
      }
    } catch (error) {
      console.log(error);
      setOrderLoading(false);
      toast("Network Error , Reload Page And Try Again")
    }
  };

  const prevOrder = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const nextOrder = () => {
    if (count < displayOrder?.length - 1) {
      setCount((prev) => prev + 1);
    }
  };

  const updateOrderStatus = async () => {
    try {
      if (displayOrder[count]._id && user._id) {
        setOrderLoading(true);
        const updateOrders = await fetch(
          `${process.env.REACT_APP_BASE_URL}/updateorder?order_id=${displayOrder[count]._id}&user_id=${user._id}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ orderStatus: "delivered" }),
          }
        );
        const res = await updateOrders.json();

        if (res) {
          setRefreshPage(true);
          setOrderLoading(false);
          res.message && toast(res.message);
        }
      } else {
        toast("only admins can perform this action");
      }
    } catch (error) {
      console.log(error);
      setOrderLoading(false);
      toast("Network Error , Reload Page And Try Again")
    }
  };

  const deleteOrderList = async () => {
    try {
      if (user?._id) {
        setOrderLoading(true);
        const deleteOrder = await fetch(
          `${process.env.REACT_APP_BASE_URL}/deleteall/${user?._id}`,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(displayOrder),
          }
        );
        const res = await deleteOrder.json();

        if (res) {
          setRefreshPage(true);
          setOrderLoading(false);
          res.message && toast(res.message);
        }
      } else {
        toast("only admins can perform this action");
      }
    } catch (error) {
      console.log(error);
      setOrderLoading(false)
      toast("Network Error , Reload Page And Try Again")
    }
  };

  const DeleteOrder = async () => {
    try {
      if (displayOrder[count]._id && user._id) {
        setOrderLoading(true);
        const deleteOrder = await fetch(
          `${process.env.REACT_APP_BASE_URL}/deleteone?order_id=${displayOrder[count]._id}&user_id=${user._id}`,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(displayOrder),
          }
        );
        const res = await deleteOrder.json();

        if (res) {
          count >= displayOrder?.length - 1
            ? setCount((prev) => prev - 1)
            : setCount((prev) => prev + 1);
          setRefreshPage(true);
          setOrderLoading(false);
          res.message && toast(res.message);
        }
      } else {
        toast("only admins can perform this action");
      }
    } catch (error) {
      console.log(error);
      setOrderLoading(false);
      toast("Network Error , Reload Page And Try Again")
    }
  };

  return (
    <div>
      <div className="m-auto w-full max-w-[95%] md:max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <h2>Order List</h2>
        <div className="flex justify-between items-center">
          {orderLoading ? (
            <div className="flex flex-col justify-center items-center mt-2">
              <GiHamburger
                size="25"
                className="animate-spin text-[rgb(233,142,30)]"
              />
            </div>
          ) : (
            <button
              className="w-fit bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer text-white text-left p-2 rounded mt-4"
              onClick={fetchOrders}
            >
              Refresh Order-List
            </button>
          )}
          <button
            className="w-fit bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer text-white text-left p-2 rounded ml-4 mt-4"
            onClick={deleteOrderList}
          >
            Delete Order-List
          </button>
          <div className="ml-auto flex gap-4">
            <h2 className="ml-2 md:ml-0">
              {displayOrder?.length > 0 ? count + 1 : count} of{" "}
              {displayOrder?.length}
            </h2>
            <button
              onClick={prevOrder}
              className={`bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ${
                count <= 0 && "pointer-events-none opacity-20"
              }`}
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextOrder}
              className={`bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ${
                count >= displayOrder?.length - 1 &&
                "pointer-events-none opacity-20"
              }`}
            >
              <GrNext />
            </button>
          </div>
        </div>
        {displayOrder?.length ? (
          <div
            key={displayOrder[count]?._id}
            className="m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-200/70"
          >
            <h2 className="text-bold text-[rgb(233,142,30)]">
              Customer Details :{" "}
            </h2>
            <div className="m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              <p className="text-sm">
                Customer Name :{" "}
                {displayOrder[count]?.user?.firstName
                  ? displayOrder[count]?.user?.firstName +
                    " " +
                    displayOrder[count]?.user?.lastName
                  : displayOrder[count]?.guest?.firstName +
                    " " +
                    displayOrder[count]?.guest?.lastName}
              </p>
              <p className="text-sm">
                Customer Mobile :{" "}
                {displayOrder[count]?.user?.mobile
                  ? displayOrder[count]?.user?.mobile
                  : displayOrder[count]?.guest?.mobile}
              </p>
              <p className="text-sm">
                Customer Address :{" "}
                {displayOrder[count]?.user?.address
                  ? displayOrder[count]?.user?.address
                  : displayOrder[count]?.guest?.address}
              </p>
            </div>
            <h2 className="text-bold mt-2 text-[rgb(233,142,30)]">
              Cart Items :{" "}
            </h2>
            {displayOrder[count]?.cart?.map((elem) => {
              return (
                <div
                  key={elem._id}
                  className="m-auto w-full mt-2 shadow flex flex-col p-3 bg-slate-300/70"
                >
                  <p className="text-sm"> Name : {elem?.name}</p>
                  <div className="flex">
                      <h3 >Price:</h3>
                      <div className="flex flex-row ml-1">
                        <h3 className="text-green-500 font-black ">₦</h3>
                        <h3 className=" ">{numberWithCommas(elem.price)}</h3>
                      </div>
                    </div>
                  <p className="text-sm">Product Quantity : {elem.qty}</p>
                </div>
              );
            })}
            <h2 className="text-bold mt-2 text-[rgb(233,142,30)]">
              Other Details :{" "}
            </h2>
            <div className="text-bold m-auto w-full mt-4 shadow flex p-3 bg-slate-300/70">
                      <h3 >Total Amount:</h3>
                      <div className="flex flex-row ml-1">
                        <h3 className="text-green-500 font-black ">₦</h3>
                        <h3 className=" ">{numberWithCommas(displayOrder[count]?.amount)}</h3>
                      </div>
                    </div>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Payment Method : {displayOrder[count]?.paymentMethod}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Payment Status : {displayOrder[count]?.paymentStatus}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Time : {displayOrder[count]?.createdAt}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Restaurant Location : {displayOrder[count]?.location}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Reference : {displayOrder[count]?.transactionReference}
            </h2>
            <div>
              <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
                Order Status : {displayOrder[count]?.orderStatus}
              </h2>
              {orderLoading ? (
                <div className="flex flex-col justify-center items-center mt-2">
                  <GiHamburger
                    size="25"
                    className="animate-spin text-[rgb(233,142,30)]"
                  />
                </div>
              ) : (
                displayOrder[count]?.orderStatus === "delivering" && (
                  <button
                    className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white font-medium p-2 w-fit rounded my-4 drop-shadow m-auto"
                    onClick={updateOrderStatus}
                  >
                    Mark Order Delivered
                  </button>
                )
              )}
              <button
                className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white font-medium p-2 w-fit rounded ml-2 my-2 drop-shadow m-auto"
                onClick={DeleteOrder}
              >
                Delete Order
              </button>
              {displayOrder[count]?.orderStatus === "pending" && (
                <button
                  className="bg-[rgb(233,142,30)] ml-2 hover:bg-orange-600 text-white font-medium p-2 w-fit rounded my-2 drop-shadow m-auto"
                  onClick={() => navigate(`/order/${displayOrder[count]?._id}`)}
                >
                  Initiate Order Delivery
                </button>
              )}
            </div>
          </div>
        ) : orderLoading ? (
          <div className="flex flex-col justify-center items-center">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) : (
          <h2 className="text-bold mt-2 text-[rgb(233,142,30)]">
            You have no orders at the moment
          </h2>
        )}
      </div>
    </div>
  );
};

export default Orders;
