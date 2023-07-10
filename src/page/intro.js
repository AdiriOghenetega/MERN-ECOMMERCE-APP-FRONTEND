import React, { useState, useEffect } from "react";
import IntroComponent from "../component/introcomponent";
import gstore from "../assets/playstore.png";
import istore from "../assets/appstore.png";
import appImage1 from "../assets/appimage1.PNG";
import appImage2 from "../assets/appimage2.PNG";
import storeclosed from "../assets/storeclosed.png";
import { MdFoodBank, MdShareLocation, MdCancel } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Intro = () => {
  const [showModal, setShowModal] = useState(false);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const closed = currentHour < 9 || currentHour >= 22;

  useEffect(() => {
    if (closed) {
      setShowModal(true);
    }
  }, [closed]);

  return (
    <div className="flex flex-col justify-center items-center bg-white relative">
      {showModal && (
        <div className="absolute h-[100%] w-full min-h-full min-w-full bg-transparent backdrop-blur-[2px] z-40 flex flex-col justify-start items-center">
          <div className="bg-slate-200/70 rounded h-[350px] md:w-[500px] w-full drop-shadow-2xl mt-44 flex flex-col justify-center items-center md:p-4">
            <div
              className="absolute top-0 right-0 m-2 text-[rgb(233,142,30)] cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <MdCancel size="20px" />
            </div>
            <a href="https://pngtree.com/so/closed">
              <img
                src={storeclosed}
                alt="store closed"
                className="h-44 w-44 rounded-full drop-shadow bg-white"
              />
            </a>
            <h2 className="md:text-2xl text-lg text-bold text-[rgb(233,142,30)]">
              Sorry we are not open at this time{" "}
            </h2>
            <p className="text-slate-600 ">Opening hours between 9am - 10pm</p>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center bg-hero-pattern bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center items-center max-h-auto mb-8 w-full">
        <h1 className="text-2xl md:text-4xl text-[rgb(233,142,30)] p-2 drop-shadow-lg text-center my-8">
          Welcome to Hcue Restaurant
        </h1>
        <h1 className="md:text-3xl text-2xl text-[rgb(233,142,30)] p-2 drop-shadow-lg text-center my-8 bg-[rgb(255,255,255,.8)] p-4 rounded">
        How to order
        </h1>
        <div className="flex flex-col md:flex-row justify-center md:gap-3 md:gap-0 md:justify-evenly items-center w-full">
          <div className="flex flex-col justify-start items-center border-2 p-2 drop-shadow h-[300px] bg-[rgb(255,255,255,.8)] min-w-[80%] md:min-w-0">
            <div className="flex flex-col justify-center my-10 items-center text-[rgb(233,142,30)] animate-bounce">
              <MdShareLocation size="100px" />
            </div>
            <h2 className="text-2xl text-bold text-center text-[rgb(233,142,30)]">
              Select nearest location
            </h2>
            <h3 className=" w-[250px] text-center">
              Select the restaurant closest to your pick-up/delivery
              location.
            </h3>
          </div>
          <div className="flex flex-col justify-start items-center border-2 p-2 drop-shadow h-[300px] bg-[rgb(255,255,255,.8)] min-w-[80%] md:min-w-0 mt-4">
            <div className="flex flex-col justify-center my-10 items-center text-[rgb(233,142,30)] animate-bounce">
              <MdFoodBank size="100px" />
            </div>
            <h2 className="text-2xl text-bold text-center text-[rgb(233,142,30)]">
              Choose your meal
            </h2>
            <h3 className=" w-[250px] text-center">
              Place your order by choosing from the numerous delicacies on our
              menu.
            </h3>
          </div>
          <div className="flex flex-col justify-start items-center border-2 p-2 drop-shadow h-[300px] bg-[rgb(255,255,255,.8)] min-w-[80%] md:min-w-0 mt-4">
            <div className="flex flex-col justify-center my-10 items-center text-[rgb(233,142,30)] animate-bounce">
              <IoFastFoodOutline size="100px" />
            </div>
            <h2 className="text-2xl text-bold text-center text-[rgb(233,142,30)]">
              Enjoy your meal
            </h2>
            <h3 className=" w-[250px] text-center">
              delivered to your doorstep.
            </h3>
          </div>
        </div>
      </div>
      <hr className="w-[80%] m-8" />
      <div className="flex flex-col justify-center items-center h-[530px] md:bg-[right 30rem] w-full backdrop-blur-[1.5px] mb-8">
        <IntroComponent closed={closed} />
      </div>
      </div>
      <hr className="w-[80%] m-8" />
      <div className="h-[500px] w-full flex flex-col justify-center items-center relative">
        <div className="bg-[rgb(233,142,30)] h-[300px] w-full p-10 flex flex-col justify-between">
          <h3 className="text-white text-sm md:text-lg md:w-[450px]">
            With the HcueEats App, anyone can simply use a mobile device to look
            over our numerous delicacies. All you need to do is to place an
            order, and pick up in-store or have it delivered to your doorstep.
          </h3>
          <div className="flex md:w-[330px] w-full justify-between items-center">
            <img
              src={gstore}
              alt="googlestore"
              className="h-[45px] md:w-[150px] w-[40%] w-auto drop-shadow-lg"
            />
            <img
              src={istore}
              alt="applestore"
              className="h-[45px] md:w-[150px] w-[40%] drop-shadow-lg"
            />
          </div>
        </div>

        <motion.div
          className="absolute flex-col justify-center items-center z-10 hidden md:flex"
          initial={{ x: 0 }}
          whileInView={{
            x: [0, 200],
          }}
          transition={{
            duration: 5,
          }}
        >
          <img
            src={appImage1}
            alt="appimage1"
            className="w-[200px] h-[380px] border-2 border-slate-400 drop-shadow rounded-2xl"
          />
          <div className="w-[20%] h-[3px] absolute top-[8px] bg-black rounded-lg"></div>
        </motion.div>
        <div className="absolute md:flex hidden flex-col justify-center items-center ml-[250px] mt-[10px]">
          <img
            src={appImage2}
            alt="appimage2"
            className="w-[200px] h-[380px] border-2 border-slate-400 drop-shadow rounded-2xl"
          />
          <div className="w-[20%] h-[3px] absolute top-[8px] bg-black rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
