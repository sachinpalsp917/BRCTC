import { errorHandler } from "../utils/apiError.js";
import bcryptjs from "bcryptjs";
import User from "../model/user.model.js";

const test = (req, res) => {
  res.json({ message: "api chal raha haiiiiiii" });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters "));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 & 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain space"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "username can only conatin letters and numbers")
      );
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          },
        },
        { new: true }
      );

      const { password, ...rest } = updateUser._doc;
      res.status(200).json(rest);
    } catch (error) {}
  }
};

const deleteUser = async (req, res, next) => {
  const urlUserId = req.params.userId.split(":");
  if (req.user.id !== urlUserId[1]) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }
  try {
    await User.findByIdAndDelete(urlUserId[1]);
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};

export { test, updateUser, deleteUser };
