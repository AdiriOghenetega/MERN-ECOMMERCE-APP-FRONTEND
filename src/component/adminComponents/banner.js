import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { GiHamburger } from "react-icons/gi";
import { ImagetoBase64 } from "../../utility/ImagetoBase64";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { bannerRedux } from "../../redux/bannerSlice";

const Banner = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setImage(data);
  };

  const handleUpload = async () => {
    try {
      if (user?._id) {
        setLoading(true);
        const uploadBanner = await fetch(
          `${process.env.REACT_APP_BASE_URL}/createbanner/${user._id}`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ image }),
          }
        );
        const res = await uploadBanner.json();

        if (res) {
          res.data && dispatch(bannerRedux(res.data));
          setImage("");
          setLoading(false);
          res.message && toast(res.message);
        }
      } else {
        toast("only admins can perform this action");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto w-full max-w-[80%] shadow flex flex-col p-3 bg-white/70">
      <h3 className="my-4">Upload Banner Ads</h3>
      <label htmlFor="image">
        <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
          {image ? (
            <img src={image} alt="banner" className="h-full" />
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
        <div className="flex flex-col justify-center items-center mt-4">
          <GiHamburger
            size="25"
            className="animate-spin text-[rgb(233,142,30)]"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-4">
          <button
            className="bg-[rgb(233,142,30)] hover:bg-orange-600 text-white font-medium p-2 w-fit rounded drop-shadow m-auto"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Banner;
