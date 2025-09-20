import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../utils/newRequest";

const Review = ({ review }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["reviewUser", review.userId],
    queryFn: () =>
      newRequest.get(`users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="flex flex-col gap-[20px] my-[20px] mx-0">
      {" "}
      {/* review */}
      {isPending ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="flex items-center gap-[20px]">
          {" "}
          {/* user */}
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={data.img || "/img/noavatar.jpg"}
            alt=""
          />
          <div className="info">
            <span>{data.username}</span>
            <div className="flex items-center gap-[10px] text-gray-400">
              <img
                className="w-[20px] "
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-[5px]">
        {" "}
        {/* stars */}
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img className="w-[14px] h-[14px]" src="/img/star.png" alt="" key={i}/>
          ))}
        <span className="font-bold text-[14px] text-[#ffc108]">
          {review.star}
        </span>
      </div>
      <p>
        {" "}
        {/* review text */}
        {review.desc}
      </p>
      <div className="flex items-center gap-[10px]">
        {" "}
        {/* helpful */}
        <span>Helpful?</span>
        <img className="w-[14px]" src="/img/like.png" alt="" />
        <span>Yes</span>
        <img className="w-[14px]" src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
