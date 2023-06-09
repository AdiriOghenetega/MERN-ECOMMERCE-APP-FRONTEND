import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct, setCartData } from "./redux/productSlice";
import { loginRedux } from "./redux/userSlice";
import { bannerRedux } from "./redux/bannerSlice";
import { useDispatch, useSelector } from "react-redux";
import { setOrderData } from "./redux/orderSlice";

function App() {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.product.cartItem);
  const user = localStorage.getItem("user");
  const location = localStorage.getItem("location");

  //reload product on refresh
  useEffect(() => {
    if (location) {
      (async () => {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
          credentials: "include",
        });
        const resData = await res.json();
        const availProducts = resData.filter((el) =>
          el.stores.includes(location)
        );
        dispatch(setDataProduct(availProducts));
        //retrieve and reset cartData on reload
        if (availProducts) {
          const cartDataFromStorage = window.localStorage.getItem("cart");
          const data = cartDataFromStorage && JSON.parse(cartDataFromStorage);
          const populatedData = data.map((item) => {
            let productDetails = availProducts.filter(
              (elem) => elem._id === item._id
            );

            return {
              _id: productDetails[0]._id,
              name: productDetails[0].name,
              category: productDetails[0].category,
              description: productDetails[0].description,
              image: productDetails[0].image,
              qty: item.qty,
              price: item.price,
              total: item.total,
            };
          });

          dispatch(setCartData(populatedData));
        }
      })();
    }
  }, []);

  //reload user on refresh
  useEffect(() => {
    (async () => {
      const retrievedUser = localStorage.getItem("user");
      if (retrievedUser) {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/${JSON.parse(retrievedUser)}`
        );
        const resData = await res.json();
        dispatch(loginRedux(resData.data));
        dispatch(setOrderData(resData.orderList));
      }
    })();
  }, []);

  //get banner
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/getbanners`);
      const resdata = await res.json();
      if (resdata) {
        resdata.data && dispatch(bannerRedux(resdata.data));
      }
    })();
  }, []);

  //store cart data
  useEffect(() => {
    //store cart data to local storage whenever cart changes
    //first check if there is already a stored cart
    const cartExists = window.localStorage.getItem("cart");
    //remove current cart data if one exists
    if (cartExists) {
      window.localStorage.removeItem("cart");
    }
    //set new cart data
    let storableCartData = cartData.map((item) => {
      return {
        _id: item._id,
        qty: item.qty,
        price: item.price,
        total: item.total,
      };
    });
    const data = JSON.stringify(storableCartData);
    window.localStorage.setItem("cart", data);
    if (user) {
      //send or update user cart database in server
      (async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/updatecart/${JSON.parse(user)}`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(cartData),
          }
        );
        const dataRes = await res.json();
      })();
    }
  }, [cartData]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
