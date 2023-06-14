import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import {GiHamburger} from "react-icons/gi"

const AllProduct = ({ heading,selectedCategory }) => {
  const productData = useSelector((state) => state.product.productList);
  let categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  let relatedProducts = []
  let relatedCategory = []
  if(selectedCategory){
    relatedProducts = productData.filter(el=>el.category.toLowerCase() === selectedCategory.toLowerCase())
    relatedCategory = categoryList.filter(el=>el.toLowerCase() === selectedCategory.toLowerCase())
    categoryList = relatedCategory
  }

  useEffect(() => {
    if(selectedCategory){
      setDataFilter(relatedProducts)
    }else{
      setDataFilter(productData);
    }
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5 flex flex-col w-full items-center">
      <h2 className="font-bold text-2xl text-[rgb(233,142,30)] mb-4 bg-[rgb(255,255,255,.8)] p-2 rounded w-auto">{heading}</h2>
      <div className="flex md:gap-5 overflow-scroll scroll-smooth scrollbar-none transition-all max-w-full py-2">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p className="animate-spin text-[rgb(233,142,30)]"><GiHamburger size="25px" /></p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center md:gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : 
          loadingArrayFeature.map((el,index) => (
              <CardFeature loading="Loading..." key={index} />
            ))}
      </div>
    </div>
  );
};

export default AllProduct;
