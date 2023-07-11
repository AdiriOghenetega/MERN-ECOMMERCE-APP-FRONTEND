import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Tabs2 from "../component/adminComponents/tab2";


const LocationAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [availProd, setAvailProd] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const user = useSelector((state) => state.user);

  const { location } = params;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
        credentials: "include",
      });
      const resData = await res.json();

      setProductData(resData);
      const availProducts = resData.filter((el) =>
        el.stores.includes(location)
      );
      setAvailProd(availProducts);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="p-4 bg-slate-100 min-h-[calc(100vh - 4em)]">
      <Tabs2 title={`${location} Dashboard`} location={location} />
    </div>
  );
};

export default LocationAdmin;
