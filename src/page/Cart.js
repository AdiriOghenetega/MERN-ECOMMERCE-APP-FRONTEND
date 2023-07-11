import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assets/empty-cart.gif";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburger } from "react-icons/gi";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { deliveryLocationRedux } from "../redux/locationSlice";
import { addGuestRedux } from "../redux/guestSlice";
import { setOrderData, setCurrentOrderData } from "../redux/orderSlice";
import {
  locationData,
  distance,
  deliveryCharge,
} from "../utility/locationdata";
import ChooseAddress from "../component/chooseaddress";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const deliveryLocation = useSelector(
    (state) => state.location?.deliveryLocation
  );

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = localStorage.getItem("location");

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [guestData, setGuestData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
  });
  const [customerLocation, setCustomerLocation] = useState({
    latitude: locationData[location]?.latitude,
    longitude: locationData[location]?.longitude,
  });
  const [distanceDelivery, setDistanceDelivery] = useState("");
  const [addressDropdown, setAddressDropdown] = useState(false);

  const subTotal = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  //vat is 7.5%
  const vat = (7.5 / 100) * parseInt(subTotal);

  const pricePlusVat = parseInt(subTotal) + parseInt(vat);

  //delivery charge
  const logistics = deliveryCharge(parseInt(distanceDelivery));

  const totalPrice = parseInt(pricePlusVat) + parseInt(logistics);

  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  useEffect(() => {
    if (location && customerLocation) {
      const deliverDistance =
        location &&
        distance(
          locationData[location]?.latitude,
          locationData[location]?.longitude,
          customerLocation.latitude,
          customerLocation.longitude
        );
      setDistanceDelivery(deliverDistance);
    }
  }, [customerLocation, location]);

  const userLocation = async (address) => {
    try {
      console.log(address);
      setCustomerLocation({
        latitude: address.latitude,
        longitude: address.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      dispatch(
        deliveryLocationRedux({
          latitude: address.latitude,
          longitude: address.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setGuestData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePayment = async () => {
    if (user?.mobile || guestData?.mobile) {
      setPaymentLoading(true);
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/payment?amount=${totalPrice}&email=${
          user._id ? user?.email : guestData?.email
        }`
      );

      const data = await res.json();

      const orderRes = await fetch(
        `${process.env.REACT_APP_BASE_URL}/createorder`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            vat,
            subTotal,
            deliveryCharge: logistics,
            amount: totalPrice,
            userID: user?._id && user._id,
            email: user?.email && user.email,
            guest: guestData,
            userType: user?._id ? "registered" : "guest",
            method: "online",
            payment_status: "pending",
            order_status: "pending",
            reference: data?.data?.reference,
            cartData: productCartItem,
            location: location,
            deliveryLocation: customerLocation,
          }),
        }
      );

      const orderData = await orderRes.json();
      console.log(orderData);
      dispatch(setOrderData(orderData.orderList));
      dispatch(setCurrentOrderData(orderData.currentOrder));
      guestData && dispatch(addGuestRedux(guestData));
      setPaymentLoading(false);
      toast("Redirect to payment Gateway...!");
      window.location.href = data.data.authorization_url;
    } else {
      toast(
        "Kindly login or provide the required details to continue purchase"
      );
    }
  };

  const handleAddressDropdown = () => setAddressDropdown((prev) => !prev);

  return (
    <div className="bg-white h-[calc(100vh-4rem)] ">
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-[rgb(248,173,0)] bg-[rgb(255,255,255,.8)] p-2 rounded max-w-fit">
          Your Cart Items
        </h2>

        {productCartItem[0] ? (
          <div className="my-4 flex flex-col md:flex-row gap-3">
            <div className="w-full max-w-3xl flex flex-col gap-2">
              {productCartItem.map((el) => {
                return (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                );
              })}
            </div>

            <div className="w-full max-w-md  ml-auto bg-[rgb(255,255,255,.8)] p-2 max-h-fit">
              <div className="mb-4 ">
                <div
                  className="flex justify-between items-center border-2 cursor-pointer border-slate-200 hover:bg-slate-200 rounded"
                  onClick={handleAddressDropdown}
                >
                  <h2 className="p-2 text-lg">Choose delivery address</h2>
                  {addressDropdown ? (
                    <BsArrowUpShort
                      size="25px"
                      className="text-[rgb(233,142,30)]"
                    />
                  ) : (
                    <BsArrowDownShort
                      size="25px"
                      className="text-[rgb(233,142,30)]"
                    />
                  )}
                </div>
                {addressDropdown && (
                  <ChooseAddress
                    handleAddressDropdown={handleAddressDropdown}
                    userLocation={userLocation}
                  />
                )}
              </div>
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Vat</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-green-500">₦</span> {vat}
                </p>
              </div>{" "}
              <div className="flex w-full py-2 text-lg border-b">
                <p>Delivery Charge</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-green-500">₦</span> {logistics}
                </p>
              </div>{" "}
              <div className="flex w-full py-2 text-lg border-b">
                <p>subTotal</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-green-500">₦</span> {subTotal}
                </p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-green-500">₦</span> {totalPrice}
                </p>
              </div>
              {!user?.firstName && (
                <div className="p-6 mb-6">
                  <div className="my-6">
                    <h3>You're not logged in</h3>
                    <Link
                      to={"/login"}
                      className="text-[rgb(233,142,30)] underline"
                    >
                      Log in
                    </Link>
                    <h3>Or kindly provide the details below</h3>
                  </div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type={"text"}
                    id="firstName"
                    name="firstName"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.firstName}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type={"text"}
                    id="lastName"
                    name="lastName"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.lastName}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type={"email"}
                    id="email"
                    name="email"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.email}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type={"mobile"}
                    id="mobile"
                    name="mobile"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.mobile}
                    onChange={handleOnChange}
                  />

                  <label htmlFor="email">Address</label>
                  <input
                    type={"text"}
                    id="address"
                    name="address"
                    className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
                    value={guestData.address}
                    onChange={handleOnChange}
                  />
                </div>
              )}
              {paymentLoading ? (
                <div className="flex flex-col justify-center items-center mt-2">
                  <GiHamburger
                    size="25"
                    className="animate-spin text-[rgb(233,142,30)]"
                  />
                </div>
              ) : (
                <button
                  className="bg-[rgb(233,142,30)] hover:bg-orange-600 w-full text-lg font-bold py-2 text-white"
                  onClick={() =>
                    Object.values(deliveryLocation).length
                      ? handlePayment()
                      : toast("Choose delivery address")
                  }
                >
                  Proceed To Payment
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col p-4">
              <img
                src={emptyCartImage}
                className="w-full max-w-sm rounded-lg drop-shadow-2xl"
              />
              <p className="text-[rgb(248,173,0)] text-3xl font-bold mt-4">
                Empty Cart
              </p>
              <Link to={`/menu/${location}`}>
                <button className="w-full max-w-[150px] m-auto  bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer text-white text-center p-2 rounded mt-4">
                  Start Shopping
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
