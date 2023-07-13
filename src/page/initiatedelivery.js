import React,{useState,useEffect} from 'react'
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { GiHamburger } from "react-icons/gi";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { useSelector } from "react-redux";
import { useParams,useNavigate } from 'react-router-dom';
import Select from 'react-select';

const InitiateDelivery = () => {
  const [riderList,setRiderList]=useState([])
    const [riderDetails,setRiderDetails]=useState({
        name:"",
        mobile:"",
        image:""
    })
    const [loading, setLoading] = useState(false);

    
    
    const params = useParams()
    const navigate = useNavigate()
    const {id} = params
    const user = useSelector((state) => state.user);

    const options = riderList.map(el=> {
      return {label:el.name,value:{name:el.name,
      mobile:el.mobile,
      image:el.image}}
  })

  const handleSelect = (selected)=>{
    setRiderDetails(selected.value)
  }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        setRiderDetails((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };

      const uploadImage = async (e) => {
        try{const data = await ImagetoBase64(e.target.files[0]);
    
        setRiderDetails((prev) => {
          return {
            ...prev,
            image: data,
          };
        });}catch(error){
          console.log(error)
          toast("Network Error , Reload Page And Try Again")
        }
      };

      const initiateorderdelivery = async () => {
        try {
          if(id && user._id){

            if(riderDetails?.name && riderDetails?.mobile){
                setLoading(true);
          const updateOrders = await fetch(
            `${process.env.REACT_APP_BASE_URL}/initiateorderdelivery?order_id=${id}&user_id=${user._id}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ riderDetails }),
            }
          );
          const res = await updateOrders.json();
    
          if (res) {
            
            setRiderDetails({
                name:"",
                mobile:"",
                image:""
            })
            setLoading(false);
            res.message && toast(res.message);
            res.data && navigate("/admin")}
          }else{
            toast("you need to input rider details to proceed")
          }}else{
            toast("only admins can perform this action")
          }
        } catch (error) {
          console.log(error);
          toast("Network Error , Reload Page And Try Again")
        }
      };

      //fetch rider list
     useEffect(()=>{
      (async()=>{
         try{ const fetchRiders = await fetch(`${process.env.REACT_APP_BASE_URL}/getriders`)
          const res = await fetchRiders.json()
          if(res){
            res?.data && setRiderList(res.data)
          }}catch(error){
            console.log(error)
            toast("Network Error , Reload Page And Try Again")
          }
      })()
     },[])
    
  return (
    <div>
      <form
        className="m-auto w-full max-w-[80%] shadow mt-4 flex flex-col p-3 bg-white/70"
      >
         <label className='text-lg text-bold' htmlFor="selectRider" >Choose from existing riders</label>
        <Select
        value={riderDetails}
        onChange={handleSelect}
        options={options}
        id="selectRider"
        closeMenuOnSelect={false}
        allowSelectAll={true}
      />
      <h2 className='text-lg text-bold my-4'>Or Use New Rider</h2>
    <label htmlFor="name">Rider's Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={riderDetails.name}
        />
<label htmlFor="name">Rider's Mobile</label>
        <input
          type={"text"}
          name="mobile"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={riderDetails.mobile}
        />
        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {riderDetails.image ? (
              <img src={riderDetails.image} alt="upload" className="h-full" />
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) : (
          <button className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white font-medium p-2 w-fit rounded my-2 drop-shadow m-auto"
          onClick={initiateorderdelivery}>
            Initiate Delivery
          </button>
        )}
      </form>
    </div>
  )
}

export default InitiateDelivery
