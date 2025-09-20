import Message from "../models/messageSchema.js";
import createError from "../utils/createError.js";
import Conversation from "../models/conversationSchema.js";

export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      {
        id: req.body.conversationId,
      },
      {
        $set: {
          ...(req.isSeller ? { readByBuyer: false } : { readBySeller: false }),
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );
    res.status(201).json(savedMessage);
  } catch (error) {
    next(error);
  }
};
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).populate(
      "userId",
      "username img");
    if (!messages) {
      return next(createError(404, "Messages not found!"));
    }
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
