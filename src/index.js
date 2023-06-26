import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'react-tooltip/dist/react-tooltip.css'
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Intro from "./page/intro"
import Menu from "./page/menu";
import Product from "./page/product";
import Contact from "./page/Contact";
import Login from "./page/login";
import Admin from "./page/admin";
import Signup from "./page/Signup";
import { Provider } from "react-redux";
import Cart from "./page/Cart";
import Success from "./page/Success";
import { store } from './redux/store';
import UpdateProducts from "./page/updateProducts";
import Confirmation from "./page/confirmation"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Intro />} />
      <Route path="menu/:location" element={<Menu />} />
      <Route path="product/:filterby" element={<Product />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="admin" element={<Admin />} />
      <Route path="admin/:location" element={<UpdateProducts />} />
      <Route path="signup" element={<Signup />} />
      <Route path="cart" element={<Cart />} />
      <Route path="success" element={<Success/>}/>
      <Route path="confirmation" element={<Confirmation />}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  
    <RouterProvider router={router} />
  
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
