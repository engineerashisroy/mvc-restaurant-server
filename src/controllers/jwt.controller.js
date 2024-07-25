import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

const tokenController = async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    throw new ApiError(403, { message: " Unauthorized access" });
  }
};
export default tokenController;
