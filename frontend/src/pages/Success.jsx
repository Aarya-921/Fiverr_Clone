import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.put(`/orders`, { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center flex flex-col items-center gap-4">
        <img src="/img/greencheck.png" alt="success" className="w-12 h-12" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Payment Successful
        </h2>
        <p className="text-gray-500">
          You are being redirected to the orders page. <br />
          Please wait...
        </p>
        <div className="w-6 h-6 border-4 border-[#1dbf73] border-t-transparent rounded-full animate-spin mt-2"></div>
      </div>
    </div>
  );
};

export default Success;
