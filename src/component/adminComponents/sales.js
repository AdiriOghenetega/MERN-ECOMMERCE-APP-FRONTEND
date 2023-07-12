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

  let weeklyChartData = []
  for(let i=0;i<7;i++){
    let numOfSales = weeklySales?.filter(el=>new Date(el.createdAt).getDay() === i)
    let totalNumOfSales = numOfSales?.length
    weeklyChartData.push({
      day: parseInt(i)+1,
      "Number of sales":parseInt(totalNumOfSales)
    })
  }

  
  const monthlySales = displayOrder?.filter(
    (elem) =>
      parseInt(dayInYear) - parseInt(dayOfYear(new Date(elem.createdAt))) <= 31
  );
  const monthlyTotalSales = monthlySales.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );

  let monthlyChartData = []
  for(let i=0;i<31;i++){
    let numOfSales = monthlySales?.filter(el=>new Date(el.createdAt).getDate() === i)
    let totalNumOfSales = numOfSales?.length
    monthlyChartData.push({
      day: parseInt(i)+1,
      "Number of sales":parseInt(totalNumOfSales)
    })
  }



  const yearlySales = displayOrder?.filter(
    (elem) =>
      parseInt(dayInYear) - parseInt(dayOfYear(new Date(elem.createdAt))) <= 366
  );
  const yearlyTotalSales = yearlySales.reduce(
    (acc, curr) => acc + parseInt(curr.amount),
    0
  );

  let yearlyChartData = []
  for(let i=0;i<366;i++){
    let numOfSales = yearlySales?.filter(el=>dayOfYear(new Date(el.createdAt)) === i)
    let totalNumOfSales = numOfSales?.length
    yearlyChartData.push({
      day: parseInt(i)+1,
      "Number of sales":parseInt(totalNumOfSales)
    })
  }

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
        title2="Sales Growth Rate For Past Week"
        sales={weeklySales}
        totalSales={weeklyTotalSales}
        chartData={weeklyChartData}
      />
      <SalesBracket
        title="Sales for the past month"
        title2="Sales Growth Rate For Past Month"
        sales={monthlySales}
        totalSales={monthlyTotalSales}
        chartData={monthlyChartData}
      />
      <SalesBracket
        title="Sales for the past year"
        title2="Sales Growth Rate For Past Year"
        sales={yearlySales}
        totalSales={yearlyTotalSales}
        chartData={yearlyChartData}
      />
    </div>
  );
};

export default Sales;
