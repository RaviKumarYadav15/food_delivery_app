import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  const authHeader = req.headers["authorization"];
  const token = req.cookies.accessToken || (authHeader && authHeader.replace("Bearer ", ""));

  if (!token) {
    throw new ApiError(401, "Access token is required");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});

export { verifyJWT };
