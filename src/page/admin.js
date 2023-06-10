import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { GiHamburger } from "react-icons/gi";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData } from "../redux/productSlice";
import { GrPrevious, GrNext } from "react-icons/gr";

const Admin = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
    stores: [],
  });

  const [loading, setLoading] = useState(false);

  const [orderLoading, setOrderLoading] = useState(false);

  const [roleLoading, setRoleLoading] = useState(false);

  const [location, setLocation] = useState("");

  const [count, setCount] = useState(0);

  const [roleData, setRoleData] = useState({
    user_email: "",
    role: "",
  });

  
  const orderList = useSelector((state) => state.product.orderList);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const options = [
    { value: "Abuloma", label: "Abuloma" },
    { value: "Rumuodara", label: "Rumuodara" },
    { value: "Phrc", label: "Phrc" },
  ];

  useEffect(() => {
    (async () => {
      setOrderLoading(true);
      const fetchOrders = await fetch(`http://localhost:3001/getorders/${user?._id}`);
      const res = await fetchOrders.json();

      if (res) {
        res.data && dispatch(setOrderData(res.data));
        setOrderLoading(false);
        res.message && toast(res.message)
      }
    })();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelect = (selected) => {
    setData((prev) => {
      return {
        ...prev,
        stores: selected,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price, stores } = data;

    if (name && image && category && price && stores) {
      setLoading(true);
      const fetchData = await fetch(`http://localhost:3001/uploadProduct/${user?._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const fetchRes = await fetchData.json();

      console.log(fetchRes);
      toast(fetchRes.message);
      setLoading(false);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
          stores: [],
        };
      });
    } else {
      toast("Enter required Fields");
    }
  };

  const handleUpdate = (e) => {
    const { value } = e.target;
    setLocation(value);
  };

  const prevOrder = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const nextOrder = () => {
    if (count < orderList?.length - 1) {
      setCount((prev) => prev + 1);
    }
  };

  const updateOrderStatus = async () => {
    setOrderLoading(true);
    const updateOrders = await fetch(
      `http://localhost:3001/updateorder?order_id=${orderList[count]._id}&user_id=${user._id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ orderStatus: "Delivered" }),
      }
    );
    const res = await updateOrders.json();

    if (res) {
      res.data && dispatch(setOrderData(res.data));
      setOrderLoading(false);
      res.message && toast(res.message)
    }
  };

  const deleteOrderList = async () => {
    setOrderLoading(true);
    const deleteOrder = await fetch(`http://localhost:3001/deleteall/${user?._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderList),
    });
    const res = await deleteOrder.json();

    if (res) {
      res.data && dispatch(setOrderData(res.data));
      setOrderLoading(false);
      window.location.reload(true);
      res.message && toast(res.message)
    }
  };

  const DeleteOrder = async () => {
    setOrderLoading(true);
    const deleteOrder = await fetch(
      `http://localhost:3001/deleteone?order_id=${orderList[count]._id}&user_id=${user._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderList),
      }
    );
    const res = await deleteOrder.json();

    if (res) {
      res.data && dispatch(setOrderData(res.data));
      setOrderLoading(false);
      res.message && toast(res.message)
      window.location.reload(true);
    }
  };

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
    setRoleLoading(true);
    const updateOrders = await fetch(
      `http://localhost:3001/changeuserrole/${user._id}`,
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
      })
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <label htmlFor="user_email">User Email</label>
        <input
          type={"text"}
          id="user_email"
          name="user_email"
          className="bg-slate-200 p-1 my-1"
          onChange={handleRoleChange}
          value={roleData.user_email}
        />
        <label htmlFor="role">Change user role</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="role"
          name="role"
          onChange={handleRoleChange}
          value={roleData.role}
        >
          <option>select category</option>
          <option value={"admin"}>admin</option>
          <option value={"user"}>user</option>
        </select>
        {roleLoading ? (
          <div className="flex flex-col justify-center items-center mt-2">
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
      <hr className="m-4" />
      <form
        className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option>select category</option>
          <option value={"soup"}>soup</option>
          <option value={"rice"}>rice</option>
          <option value={"salad"}>salad</option>
          <option value={"proteins"}>proteins</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"pastry"}>pastry</option>
          <option value={"beverages"}>beverages</option>
          <option value={"others"}>others</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="stores">Available Stores</label>
        <Select
          defaultValue={data.stores}
          onChange={handleSelect}
          options={options}
          isMulti
          id="stores"
          closeMenuOnSelect={false}
          allowSelectAll={true}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) : (
          <button className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white font-medium p-2 w-fit rounded my-2 drop-shadow m-auto">
            Save
          </button>
        )}
      </form>
      <hr className="m-4" />
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
      <hr className="m-4" />
      <div className="m-auto w-full max-w-[95%] md:max-w-[80%] shadow flex flex-col p-3 bg-white/70">
        <h2>Order List</h2>
        <div className="flex justify-between items-center">
          <button
            className="w-fit bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer text-white text-left p-2 rounded mt-4"
            onClick={() => window.location.reload(true)}
          >
            Refresh Order-List
          </button>
          <button
            className="w-fit bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer text-white text-left p-2 rounded ml-4 mt-4"
            onClick={deleteOrderList}
          >
            Delete Order-List
          </button>
          <div className="ml-auto flex gap-4">
            <h2 className="ml-2 md:ml-0">
              {orderList?.length > 0 ? count + 1 : count} of {orderList?.length}
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
                count >= orderList?.length - 1 &&
                "pointer-events-none opacity-20"
              }`}
            >
              <GrNext />
            </button>
          </div>
        </div>
        {orderList?.length ? (
          <div
            key={orderList[count]?._id}
            className="m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-200/70"
          >
            <h2 className="text-bold text-[rgb(233,142,30)]">
              Customer Details :{" "}
            </h2>
            <div className="m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              <p className="text-sm">
                Customer Name :{" "}
                {orderList[count]?.user?.firstName +
                  " " +
                  orderList[count]?.user?.lastName}
              </p>
              <p className="text-sm">
                Customer Address : {orderList[count]?.user?.address}
              </p>
            </div>
            <h2 className="text-bold mt-2 text-[rgb(233,142,30)]">
              Cart Items :{" "}
            </h2>
            {orderList[count]?.cart?.map((elem) => {
              return (
                <div
                  key={elem._id}
                  className="m-auto w-full mt-2 shadow flex flex-col p-3 bg-slate-300/70"
                >
                  <p className="text-sm">Product Name : {elem?.name}</p>
                  <p className="text-sm">Product Price : {elem.price}</p>
                  <p className="text-sm">Product Quantity : {elem.qty}</p>
                </div>
              );
            })}
            <h2 className="text-bold mt-2 text-[rgb(233,142,30)]">
              Other Details :{" "}
            </h2>
            <h2 className="text-bold m-auto w-full mt-2 shadow flex flex-col p-3 bg-slate-300/70">
              Total Amount : {orderList[count]?.amount}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Payment Method : {orderList[count]?.paymentMethod}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Payment Status : {orderList[count]?.paymentStatus}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Time : {orderList[count]?.createdAt}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Reference : {orderList[count]?.transactionReference}
            </h2>
            <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
              Order Location : {orderList[count]?.location}
            </h2>
            <div>
              <h2 className="text-bold m-auto w-full mt-4 shadow flex flex-col p-3 bg-slate-300/70">
                Order Status : {orderList[count]?.orderStatus}
              </h2>
              {orderLoading ? (
                <div className="flex flex-col justify-center items-center mt-2">
                  <GiHamburger
                    size="25"
                    className="animate-spin text-[rgb(233,142,30)]"
                  />
                </div>
              ) : (
                orderList[count]?.orderStatus !== "Delivered" && (
                  <button
                    className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white font-medium p-2 w-fit rounded my-2 drop-shadow m-auto"
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

export default Admin;
