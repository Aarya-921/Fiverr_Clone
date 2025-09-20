import React from "react";
import { Link } from "react-router-dom";

const CateCard = ({ item }) => {
  return (
    <Link to="/gigs">
      <div className="w-[252px] h-[344px] text-white rounded-[5px] cursor-pointer relative">
        <img className="object-cover w-[100%] h-[100%]" src={item.img} alt="" />
        <span className="font-light absolute top-[15px] left-[15px]">{item.desc}</span>
        <span className="font-medium text-2xl absolute top-10 left-[15px]">{item.title}</span>
      </div>
    </Link>
  );
};

export default CateCard;
