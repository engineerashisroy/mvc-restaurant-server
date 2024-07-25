import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Reviews = mongoose.model("review", reviewSchema);
