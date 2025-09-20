import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hashSync(req.body.password, 9);
    const newUser = new User({ ...req.body, password: hash });

    const user = await newUser.save();
    res.status(200).json({ message: "User created successfully!", user });
  } catch (error) {
    next(createError(500, "Something went wrong!"));
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    const isCorrect = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isCorrect) {
      return next(createError(400, "Wrong password or username!"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    const { password, phone, ...others } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "User logged in successfully",
        user: others,
      });
  } catch (error) {
    next(err);
  }
};
export const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User logged out successfully");
};
