import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import { useQuery } from "@tanstack/react-query";
import newRequest from "./../utils/newRequest";

const Orders = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log(currentUser);
  const { isPending, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId?._id;
    const buyerId = order.buyerId?._id;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser?.user?.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="flex justify-center">
      {isPending ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-[1400px] py-[50px] px-0">
          <div className="flex items-center justify-between">
            <h1 className="text-[30px] font-bold">Orders</h1>
          </div>
          <table className="w-[100%]">
            <thead>
              <tr className="h-[50px]">
                <th className="text-left">Image</th>
                <th className="text-left">Title</th>
                <th className="text-left">Price</th>
                <th className="text-left">
                  {currentUser?.user?.isSeller ? "Buyer" : "Seller"}
                </th>
                <th className="text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr id="1" className="h-[50px]" key={order._id}>
                  <td>
                    <img
                      className="w-[50px] h-[25px] object-cover"
                      src={order.img}
                      alt=""
                    />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    {" "}
                    {currentUser?.user?.isSeller
                      ? order.buyerId?.username
                      : order.sellerId?.username}{" "}
                  </td>
                  <td>
                    <img
                      className="w-[20px] cursor-pointer"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
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

export default Orders;
