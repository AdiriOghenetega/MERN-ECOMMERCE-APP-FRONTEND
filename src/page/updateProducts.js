import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import {toast} from "react-hot-toast"
import { useParams } from 'react-router-dom';
import {GiHamburger} from "react-icons/gi"
import { useSelector } from "react-redux";

const UpdateProducts = () => {
    const [updateList,setUpdateList]=useState([])
    const [productData,setProductData]=useState([])
    const [availProd,setAvailProd]=useState([])
    const [loadingOn,setLoadingOn]=useState(false)
    const [loadingOff,setLoadingOff]=useState(false)
    const [loading,setLoading] = useState(false)
    const params = useParams()
    const user = useSelector((state) => state.user);

    const {location} = params

    useEffect(() => {
      (async () => {
        setLoading(true)
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`, { credentials: "include" })
        const resData = await res.json()
        console.log(resData)
        setProductData(resData)
        const availProducts = resData.filter(el => el.stores.includes(location))
        setAvailProd(availProducts)
        setLoading(false)
      })()
    }, [])
  
    
console.log(updateList)

    const options = productData.map(el=> {
        return {label:el.name,value:el._id}
    })
    
    const handleSelect = (selected)=>{
        setUpdateList(selected)
      }

    const handleTurnOn = async()=>{
      setLoadingOn(true)
        const fetchData = await fetch(`${process.env.REACT_APP_BASE_URL}/product/turnonproduct/${user._id}`,{
            method : "POST",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify({
                location,
                products : updateList
            })
          })
    
          const dataRes = await fetchData.json()
          console.log(dataRes)
          if(dataRes){
            setLoadingOn(false)
            setUpdateList([])
            toast(dataRes.message)
            window.location.reload(true)
          }
    }

    const handleTurnOff = async()=>{
      setLoadingOff(true)
        const fetchData = await fetch(`${process.env.REACT_APP_BASE_URL}/product/turnoffproduct/${user._id}`,{
            method : "POST",
            headers : {
              "content-type" : "application/json"
            },
            body : JSON.stringify({
                location,
                products : updateList
            })
          })
    
          const dataRes = await fetchData.json()

          console.log(dataRes)
          if(dataRes){
            setLoadingOff(false)
            setUpdateList([])
            toast(dataRes.message)
            window.location.reload(true)
          }
    }

  return (
    <div className="p-4 bg-slate-100 min-h-[calc(100vh - 4em)]">
         <div className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white/70'>
    <div>
<h2>Available Products at {location}</h2>
    {loading ? <div className='flex flex-col justify-center items-center'><GiHamburger size="25" className='animate-spin text-[rgb(233,142,30)]' /></div> : availProd.map(el=>{
      return <div key={el._id} className='text-white text-bold bg-[rgb(233,142,30)] p-2'>{el.name}</div>
    })}
    </div>
         <label htmlFor="updateProducts" >Change Products Availability Status</label>
        <Select
        defaultValue={updateList}
        value={updateList}
        onChange={handleSelect}
        options={options}
        isMulti
        id="updateProducts"
        closeMenuOnSelect={false}
        allowSelectAll={true}
      />
      {loadingOn ? <div className='flex flex-col justify-center items-center'><GiHamburger size="25" className='animate-spin text-[rgb(233,142,30)]' /></div>: <button className='bg-[rgb(233,142,30)] hover:bg-orange-600 text-white text-lg font-medium p-1 rounded my-2 drop-shadow' onClick={handleTurnOn}>Turn on availability for selected products</button>}
      {loadingOff ?  <div className='flex flex-col justify-center items-center'><GiHamburger size="25" className='animate-spin text-[rgb(233,142,30)]' /></div> :<button className='bg-[rgb(233,142,30)] hover:bg-orange-600 text-white text-lg font-medium p-1 rounded my-2 drop-shadow' onClick={handleTurnOff}>Turn off availability for selected products</button>}
         </div>
    </div>
  )
}

export default UpdateProducts