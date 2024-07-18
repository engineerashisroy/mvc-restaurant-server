import mongoose from "mongoose";
const demoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const Demo = mongoose.model("demo", demoSchema);
