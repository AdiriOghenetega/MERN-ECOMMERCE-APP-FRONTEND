import React,{useState} from 'react'
import {GiHamburger} from "react-icons/gi"
import { useParams } from "react-router-dom";

const Confirmation = () => {

  const [loading,setLoading] = useState(false)

  const params = useParams();
  console.log(params)

  const handleVerifyTransaction = async()=>{
    // const res = await fetch(`${process.env.REACT_APP_BASE_URL}/verifypayment?reference=${reference}`)
    // const data = await res.json()
    // console.log(data)
  }

  return (
    <div>
      <h3>Click the "paid" button to confirm purchase</h3>
      {loading ? <div className='flex flex-col justify-center items-center'><GiHamburger size="25" className='animate-spin text-[rgb(233,142,30)]' /></div>:<button className={`bg-[rgb(233,142,30)] hover:bg-orange-600 text-white text-lg font-medium p-1 rounded my-2 drop-shadow ${closed && "pointer-events-none"}`} onClick={handleVerifyTransaction}>Go</button>}
    </div>
  )
}

export default Confirmation
