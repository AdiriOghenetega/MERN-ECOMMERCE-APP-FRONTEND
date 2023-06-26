import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GiHamburger } from "react-icons/gi";
import Select from "react-select";
import { useSelector } from "react-redux";

const DeleteProduct = () => {
  const [loadingProductDelete, setLoadingProductDelete] = useState(false);

  const [deleteProductList, setDeleteProductList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product`, {
        credentials: "include",
      });
      const resData = await res.json();
      setProductData(resData);
      setLoading(false);
    })();
  }, []);

  const deleteOptions = productData.map((el) => {
    return { label: el.name, value: el._id };
  });

  const handleDeleteSelect = (selected) => {
    setDeleteProductList(selected);
  };

  const handleProductDelete = async () => {
    setLoadingProductDelete(true);
    const deleteProduct = await fetch(
      `${process.env.REACT_APP_BASE_URL}/deleteproduct/${user?._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(deleteProductList),
      }
    );
    const res = await deleteProduct.json();

    if (res) {
      setLoadingProductDelete(false);
      res.message && toast(res.message);
      setProductData(res.data);
      setDeleteProductList([]);
    }
  };

  return (
    <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70 ">
      <label htmlFor="updateProducts">Delete Product/Products</label>
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <GiHamburger size="25" className="animate-spin text-red-900" />
        </div>
      ) : (
        <Select
          defaultValue={deleteProductList}
          value={deleteProductList}
          onChange={handleDeleteSelect}
          options={deleteOptions}
          isMulti
          id="updateProducts"
          closeMenuOnSelect={false}
          allowSelectAll={true}
        />
      )}
      {loadingProductDelete ? (
        <div className="flex flex-col justify-center items-center">
          <GiHamburger
            size="25"
            className="animate-spin text-[rgb(233,142,30)]"
          />
        </div>
      ) : (
        <button
          className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white text-lg font-medium p-1 rounded my-2 drop-shadow max-w-fit m-auto"
          onClick={handleProductDelete}
        >
          Delete Selected products
        </button>
      )}
    </div>
  );
};

export default DeleteProduct;
