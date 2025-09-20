import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Featured = () => {

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate(`/gigs?search=${input}`);
  } 


  return (
    // Featured
    <div className="h-[600px] flex justify-center bg-[#013914] text-white">
      {/* Conatiner */}
      <div className="w-[1400px] flex items-center justify-between">
        {/* Left */}
        <div className="flex flex-col gap-[30px]">
          <h1 className="text-[50px] font-bold">
            Find the perfect <i className="font-light">freelance</i> services for your business
          </h1>
          {/* Search */}
          <div className="flex items-center justify-between bg-white rounded-[5px]">
            {/* Search Input */}
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[20px] h-[20px] m-[10px]"
                src="./img/search.png"
                alt=""
              />
              <input
                className="border-none text-black outline-none"
                type="text"
                placeholder="Try 'building mobile app'"
                onChange ={(e)=> setInput(e.target.value)}
              />
            </div>
            {/* Search Button */}
            <button onClick={handleClick} className="w-[120px] h-[50px] bg-[#1dbf73] border-none text-white cursor-pointer">
              Search
            </button>
          </div>
          {/* Popular */}
          <div className="flex items-center gap-[10px]">
            <span>Popular:</span>
            <div className="flex items-center gap-[10px]">
              <button className="text-white bg-transparent border border-white rounded-[14px] py-[5px] px-[10px] text-[14px]">
                Web Design
              </button>
              <button className="text-white bg-transparent border border-white rounded-[14px] py-[5px] px-[10px] text-[14px]">
                WordPress
              </button>
              <button className="text-white bg-transparent border border-white rounded-[14px] py-[5px] px-[10px] text-[14px]">
                Logo Design
              </button>
              <button className="text-white bg-transparent border border-white rounded-[14px] py-[5px] px-[10px] text-[14px]">
                AI Services
              </button>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="h-[100%] ">
          <img className="h-[100%] object-contain max-w-none" src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
