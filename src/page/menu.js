import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";

const Menu = () => {
  const productData = useSelector((state) => state.product.productList);

  const snacksAndPastries = productData.filter(
    (el) =>
      el.category.toLowerCase() === "pastry" ||
      el.category.toLowerCase() === "pizza"
  );
  const localDishes = productData.filter(
    (el) => el.category.toLowerCase() === "soup"
  );
  const continentalDishes = productData.filter(
    (el) =>
      (el.category.toLowerCase() === "rice" && el._id === "6485e67ac0be913b526600cb") ||
      el.category.toLowerCase() === "salad" 
  );

  const loading = new Array(10).fill(null);

  const slideSnacksRef = useRef();
  const nextSnack = () => {
    slideSnacksRef.current.scrollLeft += 200;
  };
  const prevSnack = () => {
    slideSnacksRef.current.scrollLeft -= 200;
  };

  const slidelocalRef = useRef();
  const nextLocal = () => {
    slidelocalRef.current.scrollLeft += 200;
  };
  const prevLocal = () => {
    slidelocalRef.current.scrollLeft -= 200;
  };

  const slideContinentalRef = useRef();
  const nextContinental = () => {
    slideContinentalRef.current.scrollLeft += 200;
  };
  const prevContinental = () => {
    slideContinentalRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4 bg-slate-100">
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-[rgb(233,142,30)] mb-4 bg-[rgb(255,255,255,.8)] p-2 rounded">
            Snacks and Pastries
          </h2>
          <div className="ml-auto flex">
            <button
              onClick={prevSnack}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextSnack}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ml-2"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideSnacksRef}
        >
          {snacksAndPastries[0]
            ? snacksAndPastries.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "snacks"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loading.map((el, index) => (
                <CardFeature loading="Loading..." key={index} />
              ))}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-[rgb(233,142,30)] mb-4 bg-[rgb(255,255,255,.8)] p-2 rounded">
            Local Dishes
          </h2>
          <div className="ml-auto flex">
            <button
              onClick={prevLocal}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextLocal}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ml-2"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slidelocalRef}
        >
          {localDishes[0]
            ? localDishes.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "local"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loading.map((el, index) => (
                <CardFeature loading="Loading..." key={index} />
              ))}
        </div>
      </div>
      <div className="mt-8">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-[rgb(233,142,30)] mb-4 bg-[rgb(255,255,255,.8)] p-2 rounded">
            Continental Dishes
          </h2>
          <div className="ml-auto flex">
            <button
              onClick={prevContinental}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextContinental}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded ml-2"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideContinentalRef}
        >
          {continentalDishes[0]
            ? continentalDishes.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "continental"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loading.map((el, index) => (
                <CardFeature loading="Loading..." key={index} />
              ))}
        </div>
      </div>
      
      
      <AllProduct heading={"Menu List"} />
      
    </div>
  );
};

export default Menu;
