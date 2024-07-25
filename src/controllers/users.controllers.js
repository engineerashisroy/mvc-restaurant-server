import { User } from "../models/users.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const usersController = asyncHandler(async (req, res, next) => {
  try {
    const user = req.body;
    // console.log(user);
    //insert email if user doesn't exists
    //you can do this many ways (email unique, upsert, simple)
    const query = { email: user.email };
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.send({ message: "user already exist!" });
    }
    const result = await User.insertMany(user);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});
const userGetController = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.headers.authorization);
    const result = await User.find();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});
//user delete api
const userDeleteController = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const result = await User.deleteOne(query);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});
//admin api
const userAdminController = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const updatedDoc = {
      $set: {
        role: "admin",
      },
    };
    const result = await User.updateOne(filter, updatedDoc);
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal Server Error");
  }
});
//admin or not checking
const userAdminOrNotController = asyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const decodedEmail=req.decoded.email;
    console.log(decodedEmail);
    console.log("user admin or not controller", email);
    if (email !== decodedEmail) {
      return res.status(403).send({ message: "unauthorized access" });
    }
    const query = { email: email };
    const user = await User.findOne(query);
    let admin = false;
    if (user) {
      admin = user?.role === "admin";
      console.log("admin role", admin);
    }
    res.send({ admin });
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});
export {
  usersController,
  userGetController,
  userDeleteController,
  userAdminController,
  userAdminOrNotController,
};
