import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/cartProduct";
import emptyCartImage from "../assets/empty-cart.gif"
import { toast } from "react-hot-toast";
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

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
          const res = await fetch(`http://localhost:3001/payment?amount=25000&id=6478d2e84a16f2c85226c5ef`)

          const data = await res.json()
          console.log(data)

          toast("Redirect to payment Gateway...!")
          window.location.href = data.data.authorization_url
      }
      else{
        toast("You have not Login!")
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
        <div className="my-4 flex gap-3">
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
                <span className="text-red-500">₦</span> {totalPrice}
              </p>
            </div>
            <button className="bg-red-500 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
              Payment
            </button>
          </div>
        </div>

        : 
        <>
          <div className="flex w-full justify-center items-center flex-col p-4">
            <img src={emptyCartImage} className="w-full max-w-sm rounded-lg drop-shadow-2xl" />
            <p className="text-[rgb(248,173,0)] text-3xl font-bold">Empty Cart</p>
          </div>
        </>
      }
      </div>
    
    </div>
  );
};

export default Cart;
