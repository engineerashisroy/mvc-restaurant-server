import { Cart } from "../models/cart.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const cartController = asyncHandler(async (req, res, next) => {
  try {
    // res.send("hellow cart controller");
    const cartItem = req.body;
    const cart = await Cart.insertMany(cartItem);
    res.status(200).send(cart);
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});
const cartGetController = asyncHandler(async (req, res, next) => {
  try {
    // res.send("hellow cart controller");
    const email = req.query.email;
    const query = { email: email };
    const cart = await Cart.find(query);
    res.status(200).send(cart);
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});
//delete one item
const cartItemDeleteController = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await Cart.deleteOne(query);
    if (result.deletedCount === 0) {
      return next(new ApiError(404, "Cart item not found"));
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(new ApiError(500, "Internal server error"));
  }
});

export { cartController, cartGetController, cartItemDeleteController };
