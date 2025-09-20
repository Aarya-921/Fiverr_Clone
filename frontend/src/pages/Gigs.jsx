import React, { useState } from "react";
import GigCard from "../components/GigCard";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import newRequest from "../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["gigs", search, sort],

    queryFn: () => {
      const queryPrefix = search ? `${search}&` : `?`;
      return newRequest
        .get(
          `/gigs/get${queryPrefix}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        });
    },
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="flex justify-center">
      <div className="w-[1400px] py-[30px] px-0 flex flex-col gap-[15px]">
        <span className="font-light text-[13px] text-gray-500">
          <Link to="/">Fiverr </Link> &gt; Graphics & Design &gt;{" "}
        </span>
        <h1 className="text-[40px] font-bold">AI Artists</h1>
        <p className="font-light text-gray-400">
          Explore the boundaries of art and technology with Fiverr's AI Artists
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[10px] text-gray-500 font-light">
            <span>Budget</span>
            <input
              className="p-[5px] border border-gray-300 outline-none text-gray-500 font-medium"
              ref={minRef}
              type="text"
              placeholder="min"
            />
            <input
              className="p-[5px] border border-gray-300 outline-none text-gray-500 font-medium"
              ref={maxRef}
              type="text"
              placeholder="max"
            />
            <button
              onClick={apply}
              className="bg-[#1dbf73] text-white px-[10px] py-[5px] font-medium cursor-pointer border-none rounded-[5px]"
            >
              Apply
            </button>
          </div>
          <div className="flex items-center gap-[10px] relative">
            <span className="text-gray-500 font-light">SortBy:</span>
            <span className="font-medium">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              className="w-[15px] cursor-pointer"
              src="./img/down.png"
              alt="Down menu Image"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="absolute p-[20px] bg-white border-[0.5px] rounded-[5px] border-gray-300 top-[30px] right-0 flex flex-col gap-[20px] text-gray-500 ">
                {sort === "sales" ? (
                  <span
                    onClick={() => reSort("createdAt")}
                    className="cursor-pointer"
                  >
                    Newest
                  </span>
                ) : (
                  <span
                    onClick={() => reSort("sales")}
                    className="cursor-pointer"
                  >
                    Best Selling
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          {isPending
            ? "loading..."
            : error
            ? "Something went wrong"
            : data.map((gig) => <GigCard key={gig._id} gigItem={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
