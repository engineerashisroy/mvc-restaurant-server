import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    menuId: {
      type: String,
      // require: true,
    },
    name: {
      type: String,
      // require: true,
    },
    email: {
      type: String,
      // require: true,
    },

    image: {
      type: String,
      // require: true,
    },

    price: {
      type: String,
      // require: true,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("cart", cartSchema);
