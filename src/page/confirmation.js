import React,{useState} from 'react'
import {GiHamburger} from "react-icons/gi"

const Confirmation = () => {

  const [loading,setLoading] = useState(false)

 let search = window.location.search
 let params = new URLSearchParams(search)
 let getParams = params.get("query")

 console.log(getParams)

  const handleVerifyTransaction = async()=>{
    // const res = await fetch(`${process.env.REACT_APP_BASE_URL}/verifypayment?reference=${reference}`)
    // const data = await res.json()
    // console.log(data)
  }

  return (
    <div className='flex flex-col justify-center items-center w-full min-h-[calc(100vh-4em)]'>
      <div className='m-auto flex flex-col justify-center items-center'>
      <h3>Click the "paid" button to confirm purchase</h3>
      {loading ? <div className='flex flex-col justify-center items-center'><GiHamburger size="25" className='animate-spin text-[rgb(233,142,30)]' /></div>:<button className={`bg-[rgb(233,142,30)] hover:bg-orange-600 text-white text-lg font-medium p-2 rounded my-2 drop-shadow`} onClick={handleVerifyTransaction}>paid</button>}
      </div>
    </div>
  )
}

export default Confirmation
