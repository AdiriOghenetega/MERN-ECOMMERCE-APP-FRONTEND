import React from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { BiBowlHot, BiBowlRice } from "react-icons/bi"
import { GiChickenOven, GiFruitBowl, GiSlicedBread, GiFullPizza, GiBeerBottle } from "react-icons/gi"
import { Tooltip } from 'react-tooltip'
import { useMediaQuery } from 'react-responsive'

const FilterProduct = ({ category, onClick, isActive }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  const catIcon = {
    soup: <BiBowlHot />,
    rice: <BiBowlRice />,
    proteins: <GiChickenOven />,
    salad: <GiFruitBowl />,
    pastry: <GiSlicedBread />,
    pizza: <GiFullPizza />,
    beverages: <GiBeerBottle />,
    others: <CiForkAndKnife />
  }

  return (
    <div onClick={onClick} className="w-full ml-2 relative">
    <Tooltip id="my-tooltip" />
      <div className={`text-3xl p-5  rounded-full cursor-pointer ${isActive ? "bg-red-600 text-white" : "bg-[rgb(233,142,30)]"}`} data-tooltip-id="my-tooltip" data-tooltip-content={category} data-tooltip-hidden={isMobile && true}>
        {catIcon[category]}
      </div>
    </div>
  );
};

export default FilterProduct;
