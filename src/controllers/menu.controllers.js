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
//post api
const menuItemPost = asyncHandler(async (req, res) => {
  try {
    const item = req.body;
    const result = await Menu.insertMany(item);
    res.status(200).send(result);
  } catch (error) {
    throw new ApiError(500, "Data Insert Failed!");
  }
});

//menu item delete
const menuItemDelete = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await Menu.deleteOne(query);
    res.status(200).send(result);
  } catch (error) {
    throw new ApiError(500, "Data not delete!");
  }
});
//menu item get by id
const menuItemGetById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await Menu.findOne(query);
    res.status(200).send(result);
  } catch (error) {
    throw new ApiError(500, "Data not delete!");
  }
});

//update menu details with patch
const menuItemPatch = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new ApiError(500, "Data not delete!");
  }
});

export { menuItem, menuItemPost, menuItemDelete, menuItemGetById };
