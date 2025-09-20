import Conversation from "../models/conversationSchema.js";
import createError from "../utils/createError.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    next(error);
  }
};
export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
        req.isSeller ? {sellerId: req.userId} : {buyerId: req.userId}
    ).populate("sellerId","username").populate("buyerId","username");
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id});
    if(!conversation){
        return next(createError(404, "Conversation not found!"));
    }
    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};
export const updateConversation = async (req, res, next) => {
  try {
    const updateConversation = await Conversation.findOneAndUpdate({id: req.params.id},{
        $set:{
           ...(req.isSeller ? {readBySeller: true} : {readByBuyer: true}),
           
        }
    },{
        new: true
    })
    res.status(201).json(updateConversation);
  } catch (error) {
    next(error);
  }
};
