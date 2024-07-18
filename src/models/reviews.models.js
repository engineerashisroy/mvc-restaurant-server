import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    details: {
      type: String,
      require: true,
    },
    rating: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const Reviews = mongoose.model("review", reviewSchema);
