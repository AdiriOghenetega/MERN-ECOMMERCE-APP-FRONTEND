import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const LocationAdminAccess = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const user = useSelector((state)=>state.user)
    
    const handleUpdate = (e) => {
        const { value } = e.target;
        setLocation(value);
      };

const handleGo = ()=>{
  if(user?.role?.toLowerCase() === "admin" || user?.role?.toLowerCase() === "super_admin" ){
    if(user.location?.toLowerCase() === location?.toLowerCase() || user.role.toLowerCase() === "super_admin"){
       navigate(`/admin/${location}`)
    }else{
      toast("Sorry you are not an admin of this branch")
    }
  }else{
    toast("sorry only admins are authorized to perform this action")
  }
}

  return (
    <div>
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <label htmlFor="updateProducts">Choose Location</label>
        <select
          id="updateProducts"
          className="bg-slate-200 p-2 my-1"
          onChange={handleUpdate}
          name="updateProducts"
        >
          <option>Select Location</option>
          <option>Abuloma</option>
          <option>Rumuodara</option>
          <option>Phrc</option>
        </select>
        <button
          className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white w-fit font-medium p-2 rounded my-2 drop-shadow m-auto"
          onClick={handleGo}
        >
          GO
        </button>
      </div>
    </div>
  )
}

export default LocationAdminAccess
