import avatar from "../assets/login-animation.gif";
import { FaPhoneAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { numberWithCommas } from "../utility/helper";

export default function OrderItemDetails({ elem }) {
  return (
    <div className="h-full w-full md:flex flex-col items-center bg-[rgb(254,235,228)]">
      <div className="flex flex-row items-center justify-between w-full md:w-[90%] mt-8">
              <h3 className="font-bold text-[20px]">Order Details</h3>
              <div className="m-2 text-[rgb(233,142,30)] cursor-pointer ">
                <MdCancel size="25px" />
              </div>
            </div>
      {elem && (
        <div className="w-full h-full md:flex flex-col p-4 md:p-10 rounded ">
          <div>
            {elem?.cart?.map((item, index) => {
              return (
                <div
                  className="w-full md:h-[100px] flex flex-row p-2 md:p-10 rounded my-[9px] justify-between items-center relative drop-shadow-lg "
                  key={item._id}
                >
                  <div className="drop-shadow-lg">
                    <img
                      src={item.image}
                      className="h-[60px] w-[60px] md:h-[80px] md:w-[80px]"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-sm md:text-lg">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center justify-between h-[90%]">
                    <h3
                      className={`font-bold ${
                        elem.orderStatus === "delivered"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {elem.orderStatus}
                    </h3>
                    <div className="flex flex-row">
                      <h3 className="text-green-500 font-medium text-sm md:text-lg">
                        ₦
                      </h3>
                      <h3 className="font-bold text-black text-sm md:text-lg">
                        {numberWithCommas(item.price)}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-10">
            <div className="w-full my-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-black ">Order Date:</h3>
              <h3 className="font-bold text-black ml-2">
                {new Date(elem.createdAt.split("T")[0]).toDateString()}
              </h3>
            </div>
            <div className="w-full my-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-black ">Vat:</h3>
              <div className="flex flex-row">
                <h3 className="text-green-500 font-black ">₦</h3>
                <h3 className="font-bold text-black ">{numberWithCommas(elem.vat)}</h3>
              </div>
            </div>
            <div className="w-full my-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-black ">delivery Charge:</h3>
              <div className="flex flex-row">
                <h3 className="text-green-500 font-black ">₦</h3>
                <h3 className="font-bold text-black ">{numberWithCommas(elem.deliveryCharge)}</h3>
              </div>
            </div>
            <div className="w-full my-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-black ">subTotal</h3>
              <div className="flex flex-row">
                <h3 className="text-green-500 font-black ">₦</h3>
                <h3 className="font-bold text-black ">{numberWithCommas(elem.subTotal)}</h3>
              </div>
            </div>
            <div className="w-full my-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-black ">Total:</h3>
              <div className="flex flex-row">
                <h3 className="text-green-500 font-black ">₦</h3>
                <h3 className="font-bold text-black ">{numberWithCommas(elem.amount)}</h3>
              </div>
            </div>
          </div>
          {elem.orderStatus === "delivering" && (
            <div>
              <div className="items-center justify-center flex my-2">
                <h3 className="font-bold">Contact Rider</h3>
              </div>
              <div className="flex items-center justify-between bg-[rgb(233,142,30)] p-5 rounded-3xl">
                <div>
                  <img
                    src={elem.rider?.image ? elem.rider?.image : avatar}
                    className="h-[80px] w-[80px] rounded-full border-2 border-white"
                  />
                </div>
                <div>
                  <h3 className="text-white text-sm md:text-xl">
                    {elem.rider?.name}
                  </h3>
                </div>
                <div className="bg-white rounded-full p-2">
                  <a href="tel:+2348142604385">
                    <FaPhoneAlt
                      size="25px"
                      className="text-[rgb(233,142,30)]"
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
