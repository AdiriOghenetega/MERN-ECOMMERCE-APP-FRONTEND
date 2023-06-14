import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setDataProduct,setCartData } from "../redux/productSlice";
import {GiHamburger} from "react-icons/gi"

const IntroComponent = ({closed}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [ltn,setLtn] = useState("")
    const [loading,setLoading] = useState(false)

    function handleChange(event){
        const {value} = event.target
        
        setLtn(value)
        
    }

    function handleSubmit(){
      (async () => {
        setLoading(true)
        localStorage.removeItem("location");
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`, { credentials: "include" })
        const resData = await res.json()
        
        const availProducts = resData.filter(el => el.stores.includes(ltn))
        dispatch(setDataProduct(availProducts))
        dispatch(setCartData([]))
        localStorage.setItem("location",ltn)
        setLoading(false)
        navigate(`/menu/${ltn}`)
      })()
    }
    
  return (
    <div className='flex flex-col justify-center items-center'>
    <h1 className='text-5xl text-extrabold w-[100%] border-2 text-[rgb(233,142,30)] p-16 drop-shadow-lg'>Enjoy tasty meals,<br />wherever you are </h1>
    <div className='flex flex-col justify-center items-center p-4'>
        <label htmlFor='location'>Select restaurant closest to you :</label>
        <select id="location" name="location" onChange={handleChange} className={`bg-slate-200 px-2 py-1 my-1 w-52 rounded ${closed && "pointer-events-none"}`}>
            <option>Select Location</option>
            <option >Abuloma</option>
            <option>Rumuodara</option>
            <option>Phrc</option>
        </select>
    </div>
    {loading ? <div className='flex flex-col justify-center items-center'><GiHamburger size="25" className='animate-spin text-[rgb(233,142,30)]' /></div>:<button className={`bg-[rgb(233,142,30)] hover:bg-orange-600 text-white text-lg font-medium p-1 rounded my-2 drop-shadow ${closed && "pointer-events-none"}`} onClick={handleSubmit}>Go</button>}
    </div>
  )
}

export default IntroComponent