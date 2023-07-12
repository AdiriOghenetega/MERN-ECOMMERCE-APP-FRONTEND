import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { GiHamburger } from "react-icons/gi";
import { useSelector } from "react-redux";

const UserRole = () => {
  const [roleData, setRoleData] = useState({
    user_email: "",
    role: "",
    location:""
  });
  const [roleLoading, setRoleLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const handleRoleChange = (e) => {
    const { name, value } = e.target;

    setRoleData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRoleSubmit = async () => {
    try {
      setRoleLoading(true);
      const updateOrders = await fetch(
        `${process.env.REACT_APP_BASE_URL}/changeuserrole/${user._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(roleData),
        }
      );
      const res = await updateOrders.json();

      if (res) {
        toast(res.message);
        setRoleLoading(false);
        setRoleData({
          user_email: "",
          role: "",
          location:""
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <label htmlFor="user_email">User Email</label>
        <input
          type={"text"}
          id="user_email"
          name="user_email"
          className="bg-slate-200 p-2 my-1"
          onChange={handleRoleChange}
          value={roleData.user_email}
        />
        <label htmlFor="role">Choose User Role</label>
        <select
          className="bg-slate-200 p-2 my-1"
          id="role"
          name="role"
          onChange={handleRoleChange}
          value={roleData.role}
        >
          <option>Select Role</option>
          <option value={"user"}>user</option>
          <option value={"admin"}>admin</option>
          <option value={"super_admin"}>super admin</option>
        </select>
        <label htmlFor="location">Choose Role location</label>
        <select
          className="bg-slate-200 p-2 my-1"
          id="location"
          name="location"
          onChange={handleRoleChange}
          value={roleData.location}
        >
          <option>Select Location</option>
          <option value="Abuloma">Abuloma</option>
          <option value="Rumuodara">Rumuodara</option>
          <option value="Phrc">Phrc</option>
        </select>
        {roleLoading ? (
          <div className="flex flex-col justify-center items-center mt-4">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) : (
          <button
            className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white w-fit font-medium p-2 rounded my-2 drop-shadow m-auto"
            onClick={handleRoleSubmit}
          >
            Change User Role
          </button>
        )}
      </div>
    </div>
  );
};

export default UserRole;
