import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../component/orderitem";
import { SlRefresh } from "react-icons/sl";
import { GiHamburger } from "react-icons/gi";
import { setOrderData } from "../redux/orderSlice";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";


export default function OrderList() {
  const orderList = useSelector((state) => state.order.orderList);
  const user = useSelector((state) => state.user);
  const guest = useSelector((state) => state.guest);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleOrderListRefresh = async () => {
    if (user?.email || guest?.email) {
      try {
        setLoading(true);
        const fetchOrderList = await fetch(
          `${process.env.REACT_APP_BASE_URL}/getclientorders?email=${
            user.email ? user.email : guest.email
          }`
        );
        const res = await fetchOrderList.json();
        if (res) {
          dispatch(setOrderData(res.data));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="px-4 md:px-10 py-4 bg-white">
      <Tooltip id="my-tooltip" />
      <div className="flex flex-row items-center justify-between ">
        <h3 className="text-[18px] font-bold text-[rgb(237,139,27)]">
          Your Orders
        </h3>
        {loading ? (
          <div className="flex flex-col justify-center items-center mt-2">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) : (
          <SlRefresh
            size="25px"
            className="text-[rgb(237,139,27)] cursor-pointer"
            onClick={handleOrderListRefresh}
            data-tooltip-id="my-tooltip"
                data-tooltip-content="Refresh"
                data-tooltip-hidden={isMobile && true}
          />
        )}
      </div>
      {orderList?.map((item) => (
        <OrderItem key={item._id} elem={item} />
      ))}
    </div>
  );
}
