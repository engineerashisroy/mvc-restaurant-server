import bcrypt from "bcryptjs";
import { User } from "../models/users.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create user
const usersController = asyncHandler(async (req, res, next) => {
  try {
    const user = req.body;

    console.log("create a new user:", user);

    // check existing user
    const query = {
      email: user.email,
    };

    const existingUser = await User.findOne(query);

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "user already exist!",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
      user.password,
      10
    );

    // create new user object
    const newUser = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role || "user",
    };

    // save database
    const result = await User.create(newUser);

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      result,
    });

  } catch (error) {
    console.error("USER CREATE ERROR:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});
//user login 
// ================= LOGIN USER =================
const loginController = asyncHandler(async (req, res) => {
  try {

    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});


// get all users
const userGetController = asyncHandler(async (req, res, next) => {
  try {

    const result = await User.find();

    res.status(200).send(result);

  } catch (error) {
    console.error(error);

    throw new Error("Internal server error");
  }
});

// delete user
const userDeleteController = asyncHandler(async (req, res, next) => {
  try {

    const id = req.params.id;

    const query = { _id: id };

    const result = await User.deleteOne(query);

    res.status(200).send(result);

  } catch (error) {
    console.error(error);

    throw new Error("Internal server error");
  }
});

// make admin
const userAdminController = asyncHandler(async (req, res) => {
  try {

    const id = req.params.id;

    const filter = { _id: id };

    const updatedDoc = {
      $set: {
        role: "admin",
      },
    };

    const result = await User.updateOne(
      filter,
      updatedDoc
    );

    res.status(200).send(result);

  } catch (error) {
    console.error(error);

    throw new Error("Internal Server Error");
  }
});

// admin check
const userAdminOrNotController = asyncHandler(async (req, res) => {
  try {

    const email = req.params.email;

    const decodedEmail = req.decoded.email;

    if (email !== decodedEmail) {
      return res.status(403).send({
        message: "unauthorized access",
      });
    }

    const query = {
      email: email,
    };

    const user = await User.findOne(query);

    let admin = false;

    if (user) {
      admin = user?.role === "admin";
    }

    res.send({ admin });

  } catch (error) {

    throw new Error("Internal server error");
  }
});

export {
  usersController,
  loginController,
  userGetController,
  userDeleteController,
  userAdminController,
  userAdminOrNotController,
};