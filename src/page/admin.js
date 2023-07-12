import React, { useEffect } from "react";
import Tabs from "../component/adminComponents/tab";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Admin = () => {
  const storedUser = window.localStorage.getItem("user")
  const user = useSelector((state)=>state.user)
  
  const navigate = useNavigate()

  useEffect(()=>{

    if(storedUser !== null){
      if(user?._id){
        if(user?._id?.length <=0 || (user?.role?.toLowerCase() !== "admin" && user?.role?.toLowerCase() !== "super_admin")){
          toast("You're not authorized to view this page")
          navigate(-1)
        }
      }
     }else{
      toast("You're not authorized to view this page")
        navigate(-1)
     }
  },[user])
  
  return (
    <div className="p-4 bg-white" >
      <Tabs />
    </div>
  );
};

export default Admin;
