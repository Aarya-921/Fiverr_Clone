import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:5173/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-50">
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6 flex flex-col gap-6"
      >
        {/* Email Authentication */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="link-authentication-element"
            className="text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <LinkAuthenticationElement
            id="link-authentication-element"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1dbf73]"
          />
        </div>

        {/* Payment Element */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="payment-element"
            className="text-sm font-medium text-gray-700"
          >
            Payment Method
          </label>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1dbf73]"
          />
        </div>

        {/* Pay Now Button */}
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          type="submit"
          className="w-full bg-[#1dbf73] text-white font-semibold text-lg py-3 rounded-md shadow hover:bg-[#17a866] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner border-2 border-white border-t-transparent w-5 h-5 rounded-full animate-spin mx-auto"></div>
            ) : (
              "Pay Now"
            )}
          </span>
        </button>

        {/* Error / Success Message */}
        {message && (
          <div
            id="payment-message"
            className="text-center text-sm text-red-500 mt-2"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
