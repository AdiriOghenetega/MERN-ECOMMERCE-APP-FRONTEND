import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import {GiHamburger} from "react-icons/gi"

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch()

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image
    }))
  };

  return (
    <div className={`w-full mt-2 min-w-[200px] max-w-[200px] bg-[rgb(255,255,255,.8)] hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ${loading && "animate-pulse"}`}>
      {image ? (
        <>
          <Link
            to={`/product/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full w-full" />
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              <span className="text-green-500">₦</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-[rgb(233,142,30)] py-1 mt-2 rounded hover:bg-orange-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p className="animate-spin text-[rgb(233,142,30)]">{loading && <GiHamburger size="25px" />}</p>
        </div>
      )}
    </div>
  );
};

export default CardFeature;
