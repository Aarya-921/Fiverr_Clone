import Order from "../models/orderSchema.js";
import createError from "../utils/createError.js";
import Gig from "../models/gigSchema.js";
import mongoose from "mongoose";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);

  const gig = await Gig.findById(req.params.gigId);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = await Order.create({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id, // jab paymentIntent create hota hai tab ye .id automatically create hoti hai frontend mein payment success dekhne k liye
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    })
      .populate("buyerId", "username")
      .populate("sellerId", "username");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      { payment_intent: req.body.payment_intent },
      { $set: { isCompleted: true } },
      { new: true }
    );
    res.status(200).send("Order has been confirmed");
  } catch (error) {
    next(error);
  }
};
