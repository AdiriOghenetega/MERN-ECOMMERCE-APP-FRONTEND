import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsCloudUpload } from "react-icons/bs";
import { GiHamburger } from "react-icons/gi";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { useSelector } from "react-redux";
import Select from "react-select";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
    stores: [],
  });

  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  const options = [
    { value: "Abuloma", label: "Abuloma" },
    { value: "Rumuodara", label: "Rumuodara" },
    { value: "Phrc", label: "Phrc" },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelect = (selected) => {
    setData((prev) => {
      return {
        ...prev,
        stores: selected,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, category, price, stores } = data;

    if (name && image && category && price && stores) {
      setLoading(true);
      const fetchData = await fetch(
        `${process.env.REACT_APP_BASE_URL}/uploadProduct/${user?._id}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();

      console.log(fetchRes);
      toast(fetchRes.message);
      setLoading(false);

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
          stores: [],
        };
      });
    } else {
      toast("Enter required Fields");
    }
  };

  return (
    <div>
      <form
        className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
          value={data.category}
        >
          <option>Select Category</option>
          <option value={"soup"}>soup</option>
          <option value={"rice"}>rice</option>
          <option value={"salad"}>salad</option>
          <option value={"proteins"}>proteins</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"pastry"}>pastry</option>
          <option value={"beverages"}>beverages</option>
          <option value={"others"}>others</option>
        </select>

        <label htmlFor="image">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} alt="upload" className="h-full" />
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

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          onChange={handleOnChange}
          value={data.price}
        />

        <label htmlFor="stores">Available Stores</label>
        <Select
          defaultValue={data.stores}
          value={data.stores}
          onChange={handleSelect}
          options={options}
          isMulti
          id="stores"
          closeMenuOnSelect={false}
          allowSelectAll={true}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          onChange={handleOnChange}
        ></textarea>

        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <GiHamburger
              size="25"
              className="animate-spin text-[rgb(233,142,30)]"
            />
          </div>
        ) : (
          <button className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white font-medium p-2 w-fit rounded my-2 drop-shadow m-auto">
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadProduct;
