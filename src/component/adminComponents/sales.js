import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { dayOfYear } from "../../utility/date";
import SalesBracket from "./salesbracket";

const Sales = ({ location }) => {
  const [orderLoading, setOrderLoading] = useState(false);

  const [displayOrder, setDisplayOrder] = useState([]);

  const orderList = useSelector((state) => state.product.orderList);
  const user = useSelector((state) => state.user);
  const currentDate = new Date();
  const dayInYear = dayOfYear(currentDate);

  const weeklySales = displayOrder?.filter(
    (elem) =>
      parseInt(dayInYear) - parseInt(dayOfYear(new Date(elem.createdAt))) <= 7
  );
  const weeklyTotalSales = weeklySales.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );
  const monthlySales = displayOrder?.filter(
    (elem) =>
      parseInt(dayInYear) - parseInt(dayOfYear(new Date(elem.createdAt))) <= 31
  );
  const monthlyTotalSales = monthlySales.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );
  const yearlySales = displayOrder?.filter(
    (elem) =>
      parseInt(dayInYear) - parseInt(dayOfYear(new Date(elem.createdAt))) <= 366
  );
  const yearlyTotalSales = yearlySales.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );

  //fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

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
    }
  };

  const totalSales = displayOrder.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );

  return (
    <div>
      <SalesBracket
        title="Sales for the past week"
        sales={weeklySales}
        totalSales={weeklyTotalSales}
      />
      <SalesBracket
        title="Sales for the past month"
        sales={monthlySales}
        totalSales={monthlyTotalSales}
      />
      <SalesBracket
        title="Sales for the past year"
        sales={yearlySales}
        totalSales={yearlyTotalSales}
      />
    </div>
  );
};

export default Sales;
