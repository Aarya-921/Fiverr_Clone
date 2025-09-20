import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";

const GigCard = ({ gigItem }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["gigsUser", gigItem.userId],
    queryFn: () =>
      newRequest.get(`/users/${gigItem.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <Link to={`/gig/${gigItem._id}`} className="link">
      <div className="w-[324px] h-[450px] border border-gray-300 mb-[25px]">
        <img
          className="w-[100%] h-[50%] object-cover"
          src={gigItem.cover}
          alt="Gig image"
        />
        <div className="py-[10px] px-[20px] flex flex-col gap-[15px]">
          {isPending ? (
            "Loading"
          ) : error ? (
            "Something went wrong"
          ) : (
            <div className="flex items-center gap-[10px]">
              <img
                className="w-[26px] h-[26px] rounded-full"
                src={data.img || "/img/noavatar.jpg"}
                alt="profile picture"
              />
              <span>{data.username}</span>
            </div>
          )}
          <p className="text-[#111]">{gigItem.desc}</p>
          <div className="flex items-center gap-[5px]">
            <img className="w-[14px] h-[14px]" src="./img/star.png" alt="" />
            <span className="font-bold text-[14px] text-[#ffc108]">
              {!isNaN(gigItem.totalStars / gigItem.starNumber) &&
                Math.round(gigItem.totalStars / gigItem.starNumber)}
            </span>
          </div>
        </div>
        <hr className="border-gray-300 h-0 border-[0.5px]" />
        <div className="py-[10px] px-[20px] flex items-center justify-between">
          <img
            className="w-[16px] h-[16px] cursor-pointer"
            src="./img/heart.png"
            alt="Like Image"
          />
          <div className="flex flex-col gap-[5px]">
            <span className="text-gray-400 text-[12px]">STARTING AT</span>
            <h2 className="font-normal text-[18px] text-gray-500">
              ${gigItem.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
