import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct, setCartData } from "./redux/productSlice";
import { loginRedux } from "./redux/userSlice"
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const cartData = useSelector(state => state.product.cartItem)
  const productData = useSelector(state => state.product.productList)
  const user = localStorage.getItem("user")
  const location = localStorage.getItem("location")
  console.log(cartData)

  //reload product on refresh
  useEffect(() => {
    if (location) {
      (async () => {
        const res = await fetch(`http://localhost:3001/product`, { credentials: "include" })
        const resData = await res.json()
        const availProducts = resData.filter(el => el.stores.includes(location))
        dispatch(setDataProduct(availProducts))
         //retrieve and reset cartData on reload
        if (availProducts) {
          const cartDataFromStorage = window.localStorage.getItem('cart');
          const data = cartDataFromStorage && JSON.parse(cartDataFromStorage);
          const populatedData = data.map(item => {
            let productDetails = availProducts.filter(elem => elem._id === item._id)
            console.log(productDetails)
           
              return {
                _id: productDetails[0]._id,
                name: productDetails[0].name,
                category: productDetails[0].category,
                description: productDetails[0].description,
                image: productDetails[0].image,
                qty: item.qty,
                price: item.price,
                total: item.total
              }
          })
          console.log(populatedData)
          dispatch(setCartData(populatedData));
        }
      })()
    }
  }, [])


  //reload user on refresh
  useEffect(() => {
    (async () => {
      const retrievedUser = localStorage.getItem('user')
      if (retrievedUser) {
        const res = await fetch(`http://localhost:3001/user/${JSON.parse(retrievedUser)}`)
        const resData = await res.json()
        dispatch(loginRedux(resData))
      }
    })()
  }, [])

  //store cart data
  useEffect(() => {
    //store cart data to local storage whenever cart changes
    //first check if there is already a stored cart
    const cartExists = window.localStorage.getItem('cart')
    //remove current cart data if one exists
    if (cartExists) {
      window.localStorage.removeItem("cart")
    }
    //set new cart data
    let storableCartData = cartData.map(item => {
      return {
        _id: item._id,
        qty: item.qty,
        price: item.price,
        total: item.total
      }
    })
    const data = JSON.stringify(storableCartData);
    window.localStorage.setItem('cart', data);
    if (user) {
      //send or update user cart database in server
      (async () => {
        const res = await fetch(`http://localhost:3001/updatecart/${JSON.parse(user)}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(cartData)
        })
        const dataRes = await res.json()
        console.log(dataRes)
      })()
    }
  }, [cartData])

 



  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
