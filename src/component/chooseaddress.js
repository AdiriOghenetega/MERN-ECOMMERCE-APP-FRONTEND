import React,{useState} from 'react'
import {locationData} from "../utility/locationdata"

const ChooseAddress = ({userLocation,handleAddressDropdown}) => {
    const [ltn,setLtn]=useState("")
    const handleLocationSelect = ()=>{
     let customerBearing = locationData[ltn]
     userLocation(customerBearing)
     handleAddressDropdown()
    }
  return (
    <div>
      <h2 className="p-2 text-lg">Choose restarant location closest to you</h2>
     <select name='customerLocation' onChange={(e)=>setLtn(e.target.value)} className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300">
     <option>choose option</option>
        <option value="Phrc">Phrc</option>
        <option value="Abuloma">Abuloma</option>
        <option value="Rumuodara">Rumuodara</option>
     </select>
<button onClick={handleLocationSelect} className="bg-[rgb(233,142,30)] hover:bg-orange-600 w-full text-lg font-bold py-2 text-white">Select</button>
    </div>
  )
}

export default ChooseAddress
