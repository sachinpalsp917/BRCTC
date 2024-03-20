import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/apiError.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies;
  const cookie = token["access-token"];
  if (!cookie) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(cookie, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      next(errorHandler(401, "Token not verified"));
    }
    req.user = user;
    next();
  });
};
