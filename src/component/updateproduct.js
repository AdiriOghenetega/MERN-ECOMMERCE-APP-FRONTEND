import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [location, setLocation] = useState("");
    const handleUpdate = (e) => {
        const { value } = e.target;
        setLocation(value);
      };
  return (
    <div>
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <label htmlFor="updateProducts">Update Products</label>
        <select
          id="updateProducts"
          className="bg-slate-200 p-1 my-1"
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
          onClick={() => navigate(`/admin/${location}`)}
        >
          GO
        </button>
      </div>
    </div>
  )
}

export default UpdateProduct
