import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import {setCartData} from "../redux/productSlice"
import {GiHamburger} from "react-icons/gi"


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()  
  const userData = useSelector(state => state)


  const dispatch = useDispatch()




  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e)=>{
    const {name,value} = e.target
    setData((prev)=>{
        return{
            ...prev,
            [name] : value
        }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const {email,password} = data
    if(email && password ){
      setLoading(true)
      const fetchData = await fetch(`${process.env.REACT_APP_BASE_URL}/login`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      toast(dataRes.message)
      setLoading(false)
      
      if(dataRes.alert){
        localStorage.setItem('user', JSON.stringify(dataRes.data._id))
        dispatch(loginRedux(dataRes.data))
        dispatch(setCartData(dataRes.cart))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

    }
    else{
        alert("Please Enter required fields")
    }
  }

  return (
    <div className="p-3 md:p-4 h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-slate-300">
    <div className="w-full max-w-sm bg-white/70 m-auto flex flex-col p-4">
      <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
        <img src={loginSignupImage} className="w-full" />
      </div>

      <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type={"email"}
          id="email"
          name="email"
          className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          value={data.email}
          onChange={handleOnChange}

        />

        <label htmlFor="password">Password</label>
        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className=" w-full bg-slate-200 border-none outline-none "
            value={data.password}
            onChange={handleOnChange}
          />
          <span
            className="flex text-xl cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>

        {loading ? <div className='flex flex-col justify-center items-center'><GiHamburger size="25" className='animate-spin text-[rgb(233,142,30)]' /></div>:<button className="w-full max-w-[150px] m-auto  bg-[rgb(233,142,30)] hover:bg-orange-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
          Login
        </button>}
      </form>
      <p className="text-left text-sm mt-2">
        Don't  have account ?{" "}
        <Link to={"/signup"} className="text-[rgb(233,142,30)] underline">
          Sign Up
        </Link>
      </p>
    </div>
  </div>
  )
}

export default Login