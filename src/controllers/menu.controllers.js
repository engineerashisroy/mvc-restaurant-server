import { asyncHandler } from "../utils/asyncHandler.js";

import { Menu } from "../models/menu.models.js";
import { ApiError } from "../utils/apiError.js";
const menuItem = asyncHandler(async (req, res, next) => {
  try {
    const menu = await Menu.find();
    // console.log(menu);
    res.status(200).send(menu);
  } catch (error) {
    throw new ApiError(500, "Data fetching failed");
  }
});

export { menuItem };
