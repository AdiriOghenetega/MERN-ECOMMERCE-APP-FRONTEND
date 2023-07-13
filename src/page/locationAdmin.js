import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Tabs2 from "../component/adminComponents/tab2";

const LocationAdmin = () => {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const storedUser = window.localStorage.getItem("user")

  const { location } = params;


  useEffect(() => {
    if(storedUser !== null){
      if (user?._id) {
        if(user?._id?.length <=0 || (user?.location?.toLowerCase() !== location?.toLowerCase() &&
        user?.role?.toLowerCase() !== "super_admin") ||
        (user?.role?.toLowerCase() !== "admin" &&
          user?.role?.toLowerCase() !== "super_admin")){
            toast("You're not authorized to view this page");
            navigate(-1);
          }
      }
    }else{
      toast("You're not authorized to view this page")
        navigate(-1)
     }
  }, [user,location]);

  return (
    <div className="p-4 bg-slate-100 min-h-[calc(100vh - 4em)]">
      <Tabs2 title={`${location} Dashboard`} location={location} />
    </div>
  );
};

export default LocationAdmin;
