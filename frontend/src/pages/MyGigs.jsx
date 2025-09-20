import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../utils/newRequest";

const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs/get?userId=${currentUser.user._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/delete/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleClick = (id) =>{
    mutation.mutate(id);
  }

  return (
    <div className="flex justify-center">
      {isPending ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-[1400px] py-[50px] px-0">
          <div className="flex items-center justify-between">
            <h1 className="text-[30px] font-bold">Gigs</h1>
            <Link to="/add">
              <button className="p-[10px] bg-[#1dbf73] text-white font-medium border-none cursor-pointer">
                Add New Gig
              </button>
            </Link>
          </div>
          <table className="w-[100%] ">
            <thead>
              <tr className="h-[50px]">
                <th className="text-left">Image</th>
                <th className="text-left">Title</th>
                <th className="text-left">Price</th>
                <th className="text-left">Sales</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((gig) => (
                <tr id="1" className="h-[50px]" key={gig._id}>
                  <td className=" p-2">
                    <img
                      className="w-[50px] h-[25px] object-cover"
                      src={gig.cover}
                      alt="Gig Image"
                    />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="w-[20px] cursor-pointer"
                      src="./img/delete.png"
                      alt="Delete Image"
                      onClick ={() =>handleClick(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
