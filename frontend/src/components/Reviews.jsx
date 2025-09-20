import React from "react";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ desc, star, gigId });
  };

  return (
    <div className="mt-[50px] ">
      <h2>Reviews</h2>
      {isPending
        ? "Loading"
        : error
        ? "Something went wrong"
        : data.map((review) => <Review review={review} key={review._id} />)}
      <div className="mt-[20px] flex flex-col gap-5">
        <h3 className="text-[20px] font-semibold">Add a review</h3>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex gap-5">
            <input
              className="p-5 border border-gray-400 flex-1"
              type="text"
              placeholder=" Your opinion about this gigSeller...."
            />
            <select name="" id="" className="w-[100px] p-5 self-end flex-2 border border-gray-400 rounded-lg">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button className="w-[100px] border-none p-[10px] text-white bg-[#1dbf73] cursor-pointer">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
