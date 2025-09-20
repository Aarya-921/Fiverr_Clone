import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { toString } from './../../node_modules/moment/src/lib/moment/format';


const Message = () => {
  const { id } = useParams();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["message", id],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="flex justify-center">
      <div className="w-[1200px] m-[50px]">
        <span className="font-light text-[13px] text-gray-500">
          <Link to="/messages"> Messages</Link> &gt; John Doe &gt;
        </span>
        {isPending ? (
          "Loading"
        ) : error ? (
          "Nothing To Show!"
        ) : (
          <div className="my-[30px] mx-0 p-[50px] flex flex-col gap-[20px] h-[500px] overflow-scroll">
            {data.map((message, index) => (
              <div
                className={
                  message.userId?._id === currentUser?.user?._id
                    ? "flex flex-row-reverse self-end gap-[20px] max-w-[600px] text-[18px] "
                    : "flex gap-[20px] max-w-[600px] text-[18px]"
                }
                key={message._id}
              >
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover"
                  src={message.userId?.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <p
                  className={
                    message.userId?._id === currentUser?.user?._id
                      ? "p-[20px] bg-blue-500 rounded-tl-[20px] rounded-tr-[0px] rounded-br-[20px] rounded-bl-[20px]"
                      : "p-[20px] bg-gray-200 rounded-tl-[0px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px]"
                  }
                >
                  {message.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        <hr className="border-gray-200 h-0 border-[0.5px] mb-[20px]" />
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between"
        >
          <textarea
            className="w-[85%] h-[100px] p-[10px] border border-gray-300 rounded-[10px] resize-none"
            name=""
            placeholder="write your message"
            id=""
            cols={30}
            rows={10}
          ></textarea>
          <button
            type="submit"
            className="w-[100px] bg-[#1dbf73] text-white rounded-[10px] cursor-pointer border-none p-[20px]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
