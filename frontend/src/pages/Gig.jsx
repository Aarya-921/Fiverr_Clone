import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { Link, useParams } from "react-router-dom";
import Reviews from "../components/Reviews";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-300 text-red-800 rounded-full shadow p-2"
    onClick={onClick}
  >
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-300 text-red-800 rounded-full shadow p-2"
    onClick={onClick}
  >
    <FaArrowLeft />
  </div>
);
const Gig = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isPending, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isPending: isPendingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  return (
    <div className="flex justify-center ">
      {isPending ? (
        "loading"
      ) : error ? (
        "Something Went Wrong"
      ) : (
        <div className="max-w-[1400px] w-full mx-auto py-[30px] px-0 flex gap-[50px] ">
          <div className="flex-[2] flex flex-col gap-[20px]">
            <span className="font-light text-[13px] text-gray-500">
              Fiverr &gt; Graphics & Design &gt;
            </span>
            <h1 className="text-[40px] font-bold">{data.title}</h1>
            {isPendingUser ? (
              "Loading"
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="flex items-center gap-[10px]">
                <img
                  className="w-[32px] h-[32px] rounded-full object-cover"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span className="font-medium text-[14px]">
                  {dataUser.username}
                </span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="flex items-center gap-[5px]">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img
                          src="/img/star.png"
                          className="w-[14px] h-[14px]"
                          alt=""
                          key={i}
                        />
                      ))}
                    <span className="font-bold text-[14px] text-[#ffc108]">
                      {Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                )}
              </div>
            )}
            <div className="w-full flex items-center justify-center">
              <div className="w-[100%] max-w-[600px] ">
                <Slider
                  slidesToShow={1}
                  slidesToScroll={1}
                  nextArrow={<NextArrow />}
                  prevArrow={<PrevArrow />}
                  className="mt-[20px]"
                >
                  {data.images.map((image) => (
                    <img
                      className="max-h-[500px] object-contain"
                      key={image}
                      src={image}
                      alt=""
                    />
                  ))}
                </Slider>
              </div>
            </div>
            <h2 className="font-normal">About This Gig</h2>
            <p className="font-light text-gray-500 leading-[25px]">
              {data.desc}
            </p>
            {isPendingUser ? (
              "Loading"
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="flex flex-col gap-[20px] mt-[50px] ">
                <h2>About The Seller</h2>
                <div className="flex items-center gap-[20px]">
                  <img
                    className="w-[80px] h-[80px] rounded-full object-cover"
                    src={dataUser.img || "/img/noavatar.jpg"}
                    alt=""
                  />
                  <div className="flex flex-col gap-[10px]">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="flex items-center gap-[5px]">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img
                              className="w-[14px] h-[14px]"
                              key={i}
                              src="/img/star.png"
                              alt=""
                            />
                          ))}

                        <span className="font-bold text-[14px] text-[#ffc108]">
                          {" "}
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className="bg-white rounded-[5px] p-[10px] border-[1px] border-gray-500 cursor-pointer">
                      Contact Me
                    </button>
                  </div>
                </div>
                <div className="border border-gray-300 rounded-[5px] p-[20px] mt-[20px]">
                  <div className="flex flex-wrap justify-between">
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">From</span>
                      <span className="desc">USA</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Member since</span>
                      <span className="desc">Jan 2022</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="w-[300px] flex flex-col gap-[10px] mb-[20px]">
                      <span className="font-light">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr className="h-0 border border-gray-300 mb-[20px]" />
                  <p>
                    My name is {dataUser.username}, I enjoy creating {data.cat}{" "}
                    generated art in my spare time. I have a lot of experience
                    using the {data.cat} program and that means I know what to
                    prompt the {data.cat} in AI with to get a great and
                    incredibly detailed result.
                  </p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          {currentUser && (
            <div className="flex-[1] border border-gray-300 p-[20px] rounded-[5px] flex flex-col gap-[20px] sticky top-[150px] max-h-[500px] h-max">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{data.shortTitle}</h3>
                <h2 className="font-light">$ {data.price}</h2>
              </div>
              <p className="text-gray-400 my-[10px] mx-0">{data.shortDesc}</p>
              <div className="flex items-center justify-between text-[14px]">
                <div className="flex items-center gap-[10px]">
                  <img className="w-[20px]" src="/img/clock.png" alt="" />
                  <span>{data.deliveryTime} day delivery</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <img className="w-[20px]" src="/img/recycle.png" alt="" />
                  <span>{data.revisions} revisions</span>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                {data.features.map((feature) => (
                  <div
                    className="flex items-center gap-[10px] font-light text-gray-400"
                    key={feature}
                  >
                    <img
                      className="w-[14px]"
                      src="/img/greencheck.png"
                      alt=""
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to={`/payment/${id}`} className="block w-full">
                <button className="w-full bg-[#1dbf73] text-white p-[10px] border-none font-medium text-[18px] cursor-pointer">
                  Continue
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gig;
