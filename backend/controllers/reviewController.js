import Review from "../models/reviewSchema.js";
import createError from "../utils/createError.js";
import Gig from "../models/gigSchema.js";
import Order from "../models/orderSchema.js";
export const createReview = async (req, res, next) => {
  if (req.isSeller) {
    return next(createError(403, "Sellers can't create a review!"));
  }

  try {
    const gig = await Gig.findById(req.body.gigId);

    if (!gig) {
      return next(createError(404, "Gig not found!"));
    }

    const order = await Order.findOne({
      gigId: req.body.gigId,
      buyerId: req.userId,
      isCompleted: true,
      payment_intent: { $ne: null },
    });

    if (!order) {
      return next(
        createError(403, "You can only create a review for an order!")
      );
    }

    const existingReview = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (existingReview) {
      return next(createError(403, "You have already created a review!"));
    }

    const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      star: req.body.star,
      desc: req.body.desc,
    });
    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    if (!reviews) {
      return next(createError(404, "Reviews not found!"));
    }

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
export const deleteReview = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
