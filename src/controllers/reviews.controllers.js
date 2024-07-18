import { Reviews } from "../models/reviews.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const reviewsController = asyncHandler(async (req, res, next) => {
  try {
    const review = await Reviews.find();
    if (!review) {
      throw new ApiError(501, "Review not found");
    }
    res.status(200).send(review);
  } catch (error) {
    throw new ApiError(401);
  }
});

export { reviewsController };
