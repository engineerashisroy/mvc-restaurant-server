// controllers/authController.js
import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

export const authController = async (req, res) => {
  const { email } = req.body;
  // Replace this with your actual user authentication logic
  const user = await User.findOne({ email });

  if (user) {
    const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
};
