import User from "../models/userSchema.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can only delete your account"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: `${user.username} deleted successfully`,
  });
};

export const getUser = async (req, res, next) =>{
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(createError(404, "User not found!"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}