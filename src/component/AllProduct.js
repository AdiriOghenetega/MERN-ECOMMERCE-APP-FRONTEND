import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { GiHamburger } from "react-icons/gi";

const AllProduct = ({ heading, selectedCategory, selectedProductId }) => {
  const productData = useSelector((state) => state.product.productList);
  let categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  let relatedProducts = [];
  let relatedCategory = [];
  if (selectedCategory) {
    relatedProducts = productData.filter(
      (el) =>
        el.category.toLowerCase() === selectedCategory.toLowerCase() &&
        el._id !== selectedProductId
    );
    relatedCategory = categoryList.filter(
      (el) => el.toLowerCase() === selectedCategory.toLowerCase()
    );
    categoryList = relatedCategory;
  }

  useEffect(() => {
    if (selectedCategory) {
      setDataFilter(relatedProducts);
    } else {
      setDataFilter(productData);
    }
  }, [selectedCategory, selectedProductId, productData]);

  const handleFilterProduct = (category) => {
    setSearchFilter("")
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFilterBy("")
    setSearchFilter(value);
  };

  useEffect(() => {
    const searchProduct = productData.filter((el) =>
      el.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setDataFilter(searchProduct);
  }, [searchFilter]);

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5 flex flex-col w-full items-center">
      <h2 className="font-bold text-2xl text-[rgb(233,142,30)] mb-4 bg-[rgb(255,255,255,.8)] p-2 rounded w-auto">
        {heading}
      </h2>
      <div
        className={`${selectedCategory && "justify-center flex-col"} ${
          !selectedCategory && "w-full"
        } md:w-[90%] md:flex justify-between items-center`}
      >
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
              <p className="animate-spin text-[rgb(233,142,30)]">
                <GiHamburger size="25px" />
              </p>
            </div>
          )}
        </div>
        {!selectedCategory && (
          <div className="flex justify-center md:py-2 items-center px-2 md:px-8 mt-4 rounded">
            <label
              htmlFor="search"
              className="my-1 text-black md:mx-4 text-extrabold text-lg"
            >
              Search
            </label>
            <input
              type={"text"}
              className="bg-slate-200 p-2 my-1 ml-2 rounded outline-none"
              name="search"
              onChange={handleSearchChange}
              value={searchFilter}
              placeholder="Search Menu"
            />
          </div>
        )}
      </div>
      {dataFilter?.length <= 0 ? (
        <div className="my-8">
          <h3 className="text-xl text-bold">
            No product match your search preference
          </h3>
        </div>
      ) : (
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
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index} />
              ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
