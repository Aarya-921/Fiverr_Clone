import React from "react";
import { Link, Links } from "react-router-dom";
import Message from "./Message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/update/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center">
      {isPending ? (
        "Loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="w-[1400px] py-[50px] px-0">
          <div className="flex  justify-between">
            <h1 className="text-[30px] font-bold">Messages</h1>
          </div>
          <table className="w-[100%]">
            <thead>
              <tr className="h-[100px] ">
                <th className="text-left pl-[20px]">
                  {currentUser?.user?.isSeller ? "Buyer" : "Seller"}
                </th>
                <th className="text-left pl-[20px]">Last Message</th>
                <th className="text-left pl-[20px]">Date</th>
                <th className="text-left pl-[20px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((conversation) => (
                <tr
                  className={
                    (currentUser?.user?.isSeller &&
                      !conversation.readBySeller) ||
                    (!currentUser?.user?.isSeller && !conversation.readByBuyer)
                      ? "h-[100px] bg-blue-200 border"
                      : "h-[100px] border"
                  }
                  key={conversation.id}
                >
                  <td className="p-[20px] border">
                    {currentUser?.user?.isSeller
                      ? conversation.buyerId.username
                      : conversation.sellerId.username}
                  </td>
                  <td className="p-[20px] border">
                    <Link to={`/message/${conversation.id}`}>
                      {conversation?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td className="p-[20px] border">
                    {" "}
                    {moment(conversation.updatedAt).fromNow()}{" "}
                  </td>
                  <td className="p-[20px] border">
                    {((currentUser?.user?.isSeller &&
                      !conversation.readBySeller) ||
                      (!currentUser?.user?.isSeller &&
                        !conversation.readByBuyer)) && (
                      <button
                        onClick={() => handleRead(conversation.id)}
                        className="p-[10px] bg-[#1dbf73] text-white font-medium border-none cursor-pointer"
                      >
                        Mark as Read
                      </button>
                    )}
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

export default Messages;
