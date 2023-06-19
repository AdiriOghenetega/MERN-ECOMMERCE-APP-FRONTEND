import React,{useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assets/empty-cart.gif"
import { toast } from "react-hot-toast";
import {setCartData} from "../redux/productSlice"
import { Link, useNavigate } from "react-router-dom";
import { GiHamburger } from "react-icons/gi";

const Cart = () => {
  const [paymentLoading,setPaymentLoading]=useState(false)
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = localStorage.getItem("location")

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  
  
  const handlePayment = async()=>{
      if(user.email){
        setPaymentLoading(true)
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/payment?amount=${totalPrice}&id=${user._id}`)

          const data = await res.json()

          const orderRes = await fetch(`${process.env.REACT_APP_BASE_URL}/createorder`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          amount:totalPrice,
          userID:user._id,
          method: "online",
          payment_status:"pending",
          order_status: "pending",
          reference: data?.data?.reference,
          cartData:productCartItem,
          location : location
        })
      })

      const orderData = await orderRes.json()
      console.log(orderData)
      setPaymentLoading(false)
      toast("Redirect to payment Gateway...!")
      dispatch(setCartData([]))
          window.location.href = data.data.authorization_url
      }
      else{
        toast("You have to Login to continue purchase")
        setTimeout(()=>{
          navigate("/login")
        },1000)
      } 
  }
  return (
    <div className="bg-white h-[calc(100vh-4rem)] ">
    
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-[rgb(248,173,0)] bg-[rgb(255,255,255,.8)] p-2 rounded max-w-fit">
          Your Cart Items
        </h2>

        {productCartItem[0] ?
        <div className="my-4 flex flex-col md:flex-row gap-3">
          {/* display cart items  */}
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

          {/* total cart item  */}
          <div className="w-full max-w-md  ml-auto bg-[rgb(255,255,255,.8)] p-2 max-h-fit">
            <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
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
            {paymentLoading ? (
          <div className="flex flex-col justify-center items-center mt-2">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) :<button className="bg-[rgb(233,142,30)] hover:bg-orange-600 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>}
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col p-4">
            <img src={emptyCartImage} className="w-full max-w-sm rounded-lg drop-shadow-2xl" />
            <p className="text-[rgb(248,173,0)] text-3xl font-bold mt-4">Empty Cart</p>
            <Link to={`/menu/${location}`}>
              <button className="w-full max-w-[150px] m-auto  bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer text-white text-center p-2 rounded mt-4">Start Shopping</button>
            </Link>
          </div>
        </>
      }
      </div>
    
    </div>
  );
};

export default Cart;
