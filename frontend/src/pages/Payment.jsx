import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import newRequest from "./../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51S8MsNCDGU7RfMUcelmsUpvcM9VVn9QQ8vxqFyxmHnfH7EM2UERnAm3DTFRJ88pmxys39b1JUV601z4RELRwJI3o00slRM73jd"
);
const Payment = () => {
  const { id } = useParams();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className=" flex items-center justify-center">
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
  );
};

export default Payment;
