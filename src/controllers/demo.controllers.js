import { Demo } from "../models/demo.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const demoRegister = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "ok",
  });
});

export { demoRegister };
